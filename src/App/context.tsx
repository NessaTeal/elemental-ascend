import React, { ReactElement } from 'react';
import { EnemyState } from '../resources/enemies/enemy';
import { SpellState } from '../resources/spells/spell';
import importAll, {
  getSpell,
  getEnemy,
  getEncounter,
  getStartingSpellSlots,
} from '../resources';
import { SpellSlotState } from '../resources/spell-slots/spell-slot';

export interface State {
  playerHealth: number;
  enemies: EnemyState[];
  spells: SpellState[];
  spellSlots: SpellSlotState[];
  currentSlot: number;
  currentSpell: number;
}
const StateContext = React.createContext<State | undefined>(undefined);

type Dispatch = (action: Action) => void;
export type Action = CastSpellAction | ChangeSpellAction;
export type CastSpellAction = {
  type: 'castSpell';
  target: number;
};
export type ChangeSpellAction = {
  type: 'changeSpell';
  spell: number;
};
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'castSpell': {
      const { spells, currentSlot, currentSpell, enemies } = state;
      const { name } = spells[currentSpell];

      const afterCastState = getSpell(name).getAction(action, state);

      const afterEnemiesState = enemies.reduce((acc, cur) => {
        return getEnemy(cur.name).act(acc, cur);
      }, afterCastState);

      return {
        ...afterEnemiesState,
        currentSlot: currentSlot === spells.length - 1 ? 0 : currentSlot + 1,
      };
    }
    case 'changeSpell': {
      return {
        ...state,
        currentSpell: action.spell,
      };
    }
  }
}

export function Provider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  importAll();
  const [state, dispatch] = React.useReducer(reducer, {
    playerHealth: 100,
    enemies: getEncounter(0).enemies.map((e) => getEnemy(e).startingState),
    spells: [
      getSpell('Fireball').startingState,
      getSpell('Lightning strike').startingState,
      getSpell('Shadow bolt').startingState,
    ],
    spellSlots: getStartingSpellSlots(),
    currentSlot: 0,
    currentSpell: 0,
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
export function useDispatch(): Dispatch {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a CountProvider');
  }
  return context;
}
