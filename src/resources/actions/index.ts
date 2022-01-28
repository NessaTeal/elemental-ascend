import { GameDispatch, State } from '../../App/context';
import { getEnemy, getRandomRewards, getSpellDefinition } from '..';
import { EnemyDiesAnimation } from '../animations/enemies';

export async function makeATurn(
  originalTarget: string,
  dispatch: GameDispatch,
): Promise<void> {
  dispatch({ type: 'endTurn' });

  dispatch(async (dispatch, getState) => {
    const { currentSpellCard, spellCards } = getState();

    const { spells } = spellCards[currentSpellCard].spells.reduce(
      (acc, cur) => {
        const { spells, state } = acc;
        const spell = getSpellDefinition(cur).cast({
          target: originalTarget,
          spellState: cur,
          state,
          dispatch,
        });

        return spell ? { spells: [...spells, spell], state: spell[1] } : acc;
      },
      {
        spells: new Array<[number, State, () => Promise<void>]>(),
        state: getState(),
      },
    );

    let lastCast = Promise.resolve();

    for (let i = 0; i < spells.length; i++) {
      const [animationDuration, , executeCast] = spells[i];
      if (i > 0) {
        const [previousAnimationDuration] = spells[i - 1];

        const delay = Math.max(
          0,
          previousAnimationDuration - animationDuration + 100,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      lastCast = executeCast().then(async () => {
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
      });
    }

    await lastCast;

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
