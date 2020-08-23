import React, { ReactElement } from 'react';
import { EnemyProps, EnemyAffliction } from './enemy';
import { SpellProps } from './spell';
import produce from 'immer';

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
      const { target } = action;
      const { enemies, spells, currentSpell } = state;

      const newEnemies = produce(enemies, (draftEnemies) => {
        switch (spells[currentSpell].type) {
          case 'fireball': {
            draftEnemies[target].health -= 10;
            break;
          }
          case 'lightning_strike': {
            let secondTarget = Math.floor(Math.random() * draftEnemies.length);
            while (secondTarget === target) {
              secondTarget = Math.floor(Math.random() * draftEnemies.length);
            }

            draftEnemies[target].health -= 8;
            draftEnemies[secondTarget].health -= 3;
            break;
          }
          case 'shadow_bolt': {
            const curse = draftEnemies[target].afflictions.find(
              (a: EnemyAffliction) => a.type === 'curse',
            );

            let stacks = 1;

            if (curse) {
              stacks = curse.stacks++;
            } else {
              draftEnemies[target].afflictions.push({
                type: 'curse',
                stacks: 1,
              });
            }

            draftEnemies[target].health -= 6 * stacks;
            break;
          }
        }
      });

      return {
        ...state,
        enemies: newEnemies,
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
    enemies: [
      { name: 'Wolfie', health: 100, maxHealth: 100, afflictions: [] },
      { name: 'Jom', health: 50, maxHealth: 50, afflictions: [] },
    ],
    spells: [
      { name: 'Fireball', type: 'fireball' },
      { name: 'Lightning  strike', type: 'lightning_strike' },
      { name: 'Shadow bolt', type: 'shadow_bolt' },
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
