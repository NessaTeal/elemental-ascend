import React, { ReactElement } from 'react';
import { EnemyProps } from './enemy';
import { SpellProps } from './spell';

interface State {
  enemies: EnemyProps[];
  spells: SpellProps[];
  currentSpell: number;
}
const StateContext = React.createContext<State | undefined>(undefined);

type Dispatch = (action: Action) => void;
type Action = {
  type: 'castSpell';
  target: number;
};
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'castSpell': {
      const { spells, currentSpell } = state;

      return {
        ...state,
        currentSpell: currentSpell === spells.length - 1 ? 0 : currentSpell + 1,
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
    enemies: [{ name: 'Wolfie' }, { name: 'Jom' }],
    spells: [
      { name: 'Fireball' },
      { name: 'Lightning  strike' },
      { name: 'Shadow bolt' },
    ],
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
