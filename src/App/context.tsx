import React, { ReactElement } from 'react';
import { SpellSlotProps } from './components/spell-slot';
import getEnemy, { EnemyState } from '../resources/enemies/enemy';
import getSpell, { SpellState } from '../resources/spells/spell';
import getEncounter from '../resources/encounters/encounter';

export interface State {
  enemies: EnemyState[];
  spells: SpellState[];
  spellSlots: SpellSlotProps[];
  currentSlot: number;
  currentSpell: string;
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
  spell: string;
};
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'castSpell': {
      const { spells, spellSlots, currentSlot, currentSpell } = state;
      const spellState = spells.find((s) => s.name === currentSpell);

      if (!spellState) {
        throw Error(`Trying to cast non-existing spell ${currentSpell}`);
      }

      const slotPower = spellSlots[currentSlot].power;

      const newState = getSpell(currentSpell).cast(
        action,
        state,
        spellState,
        slotPower,
      );

      return {
        ...newState,
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
  const [state, dispatch] = React.useReducer(reducer, {
    enemies: getEncounter(0).startingState.enemies.map(
      (e) => getEnemy(e).startingState,
    ),
    spells: [
      getSpell('Fireball').startingState,
      getSpell('Lightning strike').startingState,
      getSpell('Shadow bolt').startingState,
    ],
    spellSlots: [{ power: 1 }, { power: 1.2 }, { power: 1.45 }],
    currentSlot: 0,
    currentSpell: 'Fireball',
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
