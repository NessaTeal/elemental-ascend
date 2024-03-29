import produce from 'immer';
import React, { Dispatch, ReactElement } from 'react';
import useThunkReducer, { Thunk } from 'react-hook-thunk-reducer';

import importAll, {
  getEncounter,
  getEnemy,
  getSpellDefinition,
  getStartingSpellSlots,
} from '../resources';
import { EnemyState } from '../resources/enemies/enemy';
import { RewardState } from '../resources/rewards/reward';
import { SpellCard } from '../resources/spell-card';
import { SpellSlotState } from '../resources/spell-slots/spell-slot';
import Fireball from '../resources/spells/data/fireball';
import LightningStrike from '../resources/spells/data/lightning_strike';
import ShadowBolt from '../resources/spells/data/shadow_bolt';
import Spark from '../resources/spells/data/spark';

export interface State {
  playerHealth: number;
  enemies: EnemyState[];
  rewards: RewardState[];
  spellCards: SpellCard[];
  spellSlots: SpellSlotState[];
  currentSlot: number;
  currentSpellCard: number;
  playerTurn: boolean;
  level: number;
}
const StateContext = React.createContext<State | undefined>(undefined);

export type GameDispatch = Dispatch<Action | Thunk<State, Action>>;
export type Action =
  | ChangeSpellCardAction
  | EnemyAction
  | EndTurnAction
  | StartTurnAction
  | EnemyDiedAction
  | CastSpellAction
  | NewEncounterAction
  | TakeRewardAction;
export type ChangeSpellCardAction = {
  type: 'changeSpellCard';
  spellCard: number;
};
export type EnemyAction = {
  type: 'enemyAction';
  mutation: (state: State) => void;
};
export type EndTurnAction = {
  type: 'endTurn';
};
export type StartTurnAction = {
  type: 'startTurn';
};
export type EnemyDiedAction = {
  type: 'enemiesDied';
  enemies: string[];
};
export type CastSpellAction = {
  type: 'castSpell';
  mutation: (state: State) => void;
};
export type NewEncounterAction = {
  type: 'newEncounter';
  mutation: (state: State) => void;
};
export type TakeRewardAction = {
  type: 'takeReward';
  mutation: (state: State) => void;
};
const DispatchContext = React.createContext<GameDispatch | undefined>(
  undefined,
);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changeSpellCard': {
      return {
        ...state,
        currentSpellCard: action.spellCard,
      };
    }
    case 'endTurn': {
      return {
        ...state,
        playerTurn: false,
      };
    }
    case 'startTurn': {
      const { spellSlots, currentSlot } = state;
      return {
        ...state,
        playerTurn: true,
        currentSlot:
          currentSlot === spellSlots.length - 1 ? 0 : currentSlot + 1,
      };
    }
    case 'enemiesDied': {
      return {
        ...state,
        enemies: state.enemies.filter((e) => !action.enemies.includes(e.id)),
      };
    }
    case 'enemyAction':
    case 'castSpell':
    case 'newEncounter': {
      return produce(state, action.mutation);
    }
    case 'takeReward': {
      return produce(state, (state: State) => {
        action.mutation(state);
        state.rewards = [];
        state.enemies = getEncounter(Math.floor(state.level / 2)).enemies.map(
          (e) => new e().getStartingState(),
        );
        state.level++;
      });
    }
  }
}

export function Provider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  importAll();
  const [state, dispatch] = useThunkReducer(reducer, {
    playerHealth: 100,
    enemies: getEncounter(0).enemies.map((e) => getEnemy(e).getStartingState()),
    rewards: [],
    spellCards: [
      {
        spells: [
          getSpellDefinition(Fireball).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
          getSpellDefinition(Spark).getStartingState(),
        ],
      },
      {
        spells: [
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
          getSpellDefinition(LightningStrike).getStartingState(),
        ],
      },
      {
        spells: [
          getSpellDefinition(ShadowBolt).getStartingState(),
          getSpellDefinition(ShadowBolt).getStartingState(),
          getSpellDefinition(ShadowBolt).getStartingState(),
          getSpellDefinition(ShadowBolt).getStartingState(),
          getSpellDefinition(ShadowBolt).getStartingState(),
          getSpellDefinition(ShadowBolt).getStartingState(),
        ],
      },
    ],
    spellSlots: getStartingSpellSlots(),
    currentSlot: 0,
    currentSpellCard: 0,
    playerTurn: true,
    level: 1,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useState(): State {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useState must be used within a CountProvider');
  }
  return context;
}
export function useDispatch(): GameDispatch {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a CountProvider');
  }
  return context;
}
