import produce from 'immer';

import { State } from '../../../App/context';
import { FireballAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';
import { CastProps, SpellClass, SpellState } from '../spell';

export default class Fireball extends SpellClass {
  animationDuration = 400;

  startingState = {
    name: 'Fireball',
    power: 10,
  };

  getDescription(state: State, spellState: SpellState): string {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage to the enemy`;
  }

  _cast({
    target,
    spellState,
    state,
    dispatch,
  }: CastProps): null | [State, () => Promise<void>] {
    const enemy = state.enemies.find((e) => e.id === target);
    if (!enemy || enemy.health < 0) {
      return null;
    }

    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);
    const mutation = damageEffect(totalPower, target);
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
