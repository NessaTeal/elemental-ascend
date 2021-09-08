import { GameDispatch, State } from '../../App/context';
import { getEnemy, getRandomRewards, getSpellDefinition } from '..';
import { EnemyDiesAnimation } from '../animations/enemies';

export async function makeATurn(
  originalTarget: number,
  dispatch: GameDispatch,
): Promise<void> {
  dispatch({ type: 'endTurn' });

  dispatch(async (dispatch, getState) => {
    const { currentSpell, spells } = getState();

    await getSpellDefinition(spells[currentSpell]).cast(
      originalTarget,
      getState(),
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
      for (let i = 0; i < aliveEnemies.length; i++) {
        await getEnemy(aliveEnemies[i]).act(i, getState(), dispatch);
      }
    } else {
      dispatch({
        type: 'newEncounter',
        mutation: (state: State) => {
          state.rewards = getRandomRewards();
        },
      });
    }

    dispatch({ type: 'startTurn' });
  });
}
