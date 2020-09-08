import { GameAnimation } from '../animations';
import { Action, State, EnemyAction, GameDispatch } from '../../App/context';
import { EnemyState } from '../enemies/enemy';
import { Thunk } from 'react-hook-thunk-reducer';
import { Dispatch } from 'react';
import { getEnemy, getSpell } from '..';

export type EnemyActionWrapper = {
  getAnimation: (action: EnemyAction, state: State) => GameAnimation;
  getDescription: (state: State, enemyState: EnemyState) => string;
  getAction: (action: EnemyAction, state: State) => void;
};

export async function makeATurn(
  originalTarget: number,
  state: State,
  dispatch: GameDispatch,
): Promise<void> {
  dispatch({ type: 'endTurn' });

  dispatch(async (dispatch, getState) => {
    const { currentSpell, spells } = getState();
    await getSpell(spells[currentSpell].name).cast(
      originalTarget,
      state,
      dispatch,
    );

    dispatch(async (dispatch, getState) => {
      const nextEnemyCallback = (index: number) => {
        return async (
          dispatch: Dispatch<Action | Thunk<State, Action>>,
          getState: () => State,
        ) => {
          const { enemies } = getState();
          const { name, currentAction } = enemies[index];
          const enemyAction: EnemyAction = {
            type: 'enemyAction',
            enemy: index,
          };
          await getEnemy(name)
            .getActionWrappers()
            [currentAction].getAnimation(enemyAction, getState())
            .perform();

          dispatch(enemyAction);

          if (++index < enemies.length) {
            dispatch(nextEnemyCallback(index));
          } else {
            dispatch({ type: 'startTurn' });
          }
        };
      };

      const { enemies } = getState();
      if (enemies.length > 0) {
        dispatch(nextEnemyCallback(0));
      } else {
        // you killed everyone
      }
    });
  });
}
