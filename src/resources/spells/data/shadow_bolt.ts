import produce from 'immer';

import { State } from '../../../App/context';
import { ShadowBoltAnimation } from '../../animations/spells';
import afflictionEffect from '../../spell-effects/affliction';
import damageEffect from '../../spell-effects/damage';
import { CastProps, SpellClass, SpellState } from '../spell';

export default class ShadowBolt extends SpellClass {
  animationDuration = 350;

  startingState = {
    name: 'Shadow bolt',
    power: 6,
  };

  getDescription(state: State, spellState: SpellState): string {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Inflict one curse stack to the enemy and deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage per each`;
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
    const mutation = (draftState: State) => {
      const curse = afflictionEffect(1, 'curse', target)(draftState);
      damageEffect(totalPower * curse, target)(draftState);
    };
    const immediateState = produce(state, mutation);

    return [
      immediateState,
      () =>
        new Promise(async (resolve) => {
          await new ShadowBoltAnimation(target, this).animate();

          dispatch({
            type: 'castSpell',
            mutation,
          });
          resolve();
        }),
    ];
  }
}
