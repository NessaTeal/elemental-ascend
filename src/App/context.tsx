import React, { ReactElement } from 'react';
import { EnemyProps } from './enemy';

interface State {
  enemies: EnemyProps[];
}
const StateContext = React.createContext<State | undefined>(undefined);

type Dispatch = (action: Action) => void;
type Action = {
  type: 'useless';
};
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'useless': {
      console.log('Told ya');
      return state;
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
