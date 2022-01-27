import { GameDispatch, State } from '../../../App/context';
import { FireballAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';
import { SpellClass, SpellState } from '../spell';

export default class Fireball extends SpellClass {
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

  async cast(
    target: string,
    spellState: SpellState,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    const enemy = state.enemies.find((e) => e.id === target);
    if (!enemy || enemy.health < 0) {
      return;
    }
    await new FireballAnimation(target).animate();

    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    dispatch({
      type: 'castSpell',
      mutation: damageEffect(totalPower, target),
    });
  }
}
