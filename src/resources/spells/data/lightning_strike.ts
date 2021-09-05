import { SpellClass, SpellState } from '../spell';
import { GameDispatch, State } from '../../../App/context';
import { LightningStrikeAnimation } from '../../animations/spells';
import damageEffect from '../../spell-effects/damage';

export default class LightningStrike extends SpellClass {
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

  async cast(
    target: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    const { enemies } = state;
    let secondTarget: number | null;
    if (enemies.length === 1) {
      secondTarget = null;
    } else {
      do {
        secondTarget = Math.floor(Math.random() * enemies.length);
      } while (secondTarget === target);
    }

    await new LightningStrikeAnimation([target, secondTarget], state).animate();

    const { power } = state.spells[state.currentSpell];
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    dispatch({
      type: 'castSpell',
      mutation: (draftState) => {
        damageEffect(Math.ceil(totalPower * 0.85), target)(draftState);
        secondTarget !== null &&
          damageEffect(Math.ceil(totalPower * 0.25), secondTarget)(draftState);
      },
    });
  }
}
