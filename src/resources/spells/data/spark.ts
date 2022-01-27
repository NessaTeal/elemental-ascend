import { GameDispatch, State } from '../../../App/context';
import { FireballAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';
import { SpellClass, SpellState } from '../spell';

export default class Spark extends SpellClass {
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

  async cast(
    target: string,
    spellState: SpellState,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    const { enemies } = state;
    const aliveEnemies = enemies.filter((e) => e.health > 0);

    if (aliveEnemies.length === 0) {
      return;
    }

    target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)].id;

    await new FireballAnimation(target).animate();

    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    dispatch({
      type: 'castSpell',
      mutation: (draftState) =>
        damageEffect(Math.ceil(totalPower), target)(draftState),
    });
  }
}
