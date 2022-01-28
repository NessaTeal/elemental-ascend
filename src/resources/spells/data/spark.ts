import produce from 'immer';

import { State } from '../../../App/context';
import { FireballAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';
import { CastProps, SpellClass, SpellState } from '../spell';

export default class Spark extends SpellClass {
  animationDuration = 200;

  startingState = {
    name: 'Spark',
    power: 4,
  };

  getDescription(state: State, spellState: SpellState): string {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${Math.ceil(power)} (${Math.ceil(
      power * slotPower,
    )}) to the random enemy`;
  }

  _cast({
    target,
    spellState,
    state,
    dispatch,
  }: CastProps): null | [State, () => Promise<void>] {
    const { enemies } = state;
    const aliveEnemies = enemies.filter((e) => e.health > 0);

    if (aliveEnemies.length === 0) {
      return null;
    }

    target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)].id;

    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);
    const mutation = damageEffect(Math.ceil(totalPower), target);
    const immediateState = produce(state, mutation);

    return [
      immediateState,
      () =>
        new Promise(async (resolve) => {
          await new FireballAnimation(target, this).animate();

          dispatch({
            type: 'castSpell',
            mutation,
          });

          resolve();
        }),
    ];
  }
}
