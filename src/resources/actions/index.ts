import { GameDispatch, State } from '../../App/context';
import { getEnemy, getRandomRewards, getSpellDefinition } from '..';
import { EnemyDiesAnimation } from '../animations/enemies';

export async function makeATurn(
  originalTarget: number,
  dispatch: GameDispatch,
): Promise<void> {
  dispatch({ type: 'endTurn' });

  dispatch(async (dispatch, getState) => {
    const { currentSpellCard, spellCards } = getState();

    await Promise.all(
      spellCards[currentSpellCard].spells.map((s) =>
        getSpellDefinition(s).cast(originalTarget, s, getState(), dispatch),
      ),
    );

    const { enemies } = getState();

    const diedEnemies = enemies.reduce((acc: string[], cur) => {
      if (cur.health <= 0) {
        acc.push(cur.id);
      }

      return acc;
    }, []);

    await Promise.all(
      diedEnemies.map((id) => new EnemyDiesAnimation(id).animate()),
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
