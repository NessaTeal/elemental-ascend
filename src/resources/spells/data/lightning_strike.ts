import produce from 'immer';

import { State } from '../../../App/context';
import { LightningStrikeAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';
import { CastProps, SpellClass, SpellState } from '../spell';

export default class LightningStrike extends SpellClass {
  animationDuration = 500;

  startingState = {
    name: 'Lightning strike',
    power: 8,
  };

  getDescription(state: State, spellState: SpellState): string {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${Math.ceil(power * 0.85)} (${Math.ceil(
      power * slotPower * 0.85,
    )}) to the enemy and ${Math.ceil(power * 0.25)} (${Math.ceil(
      power * slotPower * 0.25,
    )}) to another random one`;
  }

  _cast({
    target,
    spellState,
    state,
    dispatch,
  }: CastProps): null | [State, () => Promise<void>] {
    const { enemies } = state;
    const enemy = enemies.find((e) => e.id === target);
    if (!enemy || enemy.health < 0) {
      return null;
    }
    let secondTarget: string | null;
    if (enemies.length === 1) {
      secondTarget = null;
    } else {
      const otherEnemies = enemies.filter((e) => e.id !== target);
      secondTarget =
        otherEnemies[Math.floor(Math.random() * otherEnemies.length)].id;
    }

    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);
    const mutation = (draftState: State) => {
      damageEffect(Math.ceil(totalPower * 0.85), target)(draftState);
      secondTarget !== null &&
        damageEffect(Math.ceil(totalPower * 0.25), secondTarget)(draftState);
    };
    const immediateState = produce(state, mutation);

    return [
      immediateState,
      () =>
        new Promise(async (resolve) => {
          await new LightningStrikeAnimation(
            [target, secondTarget],
            this,
          ).animate();

          dispatch({
            type: 'castSpell',
            mutation,
          });
          resolve();
        }),
    ];
  }
}
