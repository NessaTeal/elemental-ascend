import { GameAnimation } from '../animations';
import { Action, State, EnemyAction, GameDispatch } from '../../App/context';
import { EnemyState } from '../enemies/enemy';
import { Thunk } from 'react-hook-thunk-reducer';
import { Dispatch } from 'react';
import { getEnemy, getSpell } from '..';
import { EnemyDiesAnimation } from '../animations/enemies';

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

    const { enemies } = getState();

    const diedEnemies = enemies.reduce((acc: number[], cur, index) => {
      if (cur.health <= 0) {
        acc.push(index);
      }

      return acc;
    }, []);

    await Promise.all(
      diedEnemies.map((index) => new EnemyDiesAnimation(index).animate()),
    );

    dispatch({ type: 'enemiesDied', enemies: diedEnemies });

    const { enemies: aliveEnemies } = getState();

    if (aliveEnemies.length > 0) {
      dispatch(nextEnemyCallback(0));
    } else {
      // you killed everyone
    }
  });
}

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
      .animate();

    dispatch(enemyAction);

    if (++index < enemies.length) {
      dispatch(nextEnemyCallback(index));
    } else {
      dispatch({ type: 'startTurn' });
    }
  };
};
