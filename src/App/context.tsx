import React, { ReactElement } from 'react';
import { EnemyProps, EnemyAffliction } from './enemy';
import { SpellProps, SpellType } from './spell';
import produce from 'immer';
import { SpellSlotProps } from './spell-slot';

interface State {
  enemies: EnemyProps[];
  spells: SpellProps[];
  spellSlots: SpellSlotProps[];
  currentSlot: number;
  currentSpell: SpellType;
}
const StateContext = React.createContext<State | undefined>(undefined);

type Dispatch = (action: Action) => void;
type Action =
  | {
      type: 'castSpell';
      target: number;
    }
  | {
      type: 'changeSpell';
      spellType: SpellType;
    };
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'castSpell': {
      const { target } = action;
      const { enemies, spells, spellSlots, currentSlot, currentSpell } = state;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const spellPower = spells.find((s) => s.type === currentSpell)!.power;
      const slotPower = spellSlots[currentSlot].power;
      const totalPower = Math.ceil(spellPower * slotPower);

      const newEnemies = produce(enemies, (draftEnemies) => {
        switch (currentSpell) {
          case 'fireball': {
            draftEnemies[target].health -= totalPower;
            break;
          }
          case 'lightning_strike': {
            let secondTarget = Math.floor(Math.random() * draftEnemies.length);
            while (secondTarget === target) {
              secondTarget = Math.floor(Math.random() * draftEnemies.length);
            }

            draftEnemies[target].health -= Math.ceil(totalPower * 0.85);
            draftEnemies[secondTarget].health -= Math.ceil(totalPower * 0.25);
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

            draftEnemies[target].health -= totalPower * stacks;
            break;
          }
        }
      });

      return {
        ...state,
        enemies: newEnemies,
        currentSlot: currentSlot === spells.length - 1 ? 0 : currentSlot + 1,
      };
    }
    case 'changeSpell': {
      return {
        ...state,
        currentSpell: action.spellType,
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
      { name: 'Fireball', type: 'fireball', power: 10 },
      { name: 'Lightning  strike', type: 'lightning_strike', power: 8 },
      { name: 'Shadow bolt', type: 'shadow_bolt', power: 6 },
    ],
    spellSlots: [{ power: 1 }, { power: 1.2 }, { power: 1.45 }],
    currentSlot: 0,
    currentSpell: 'fireball',
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
