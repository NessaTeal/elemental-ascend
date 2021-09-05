import { SpellClass, SpellState } from '../spell';
import { GameDispatch, State } from '../../../App/context';
import { ShadowBoltAnimation } from '../../animations/spells';
import afflictionEffect from '../../spell-effects/affliction';
import damageEffect from '../../spell-effects/damage';

export default class ShadowBolt extends SpellClass {
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

  async cast(
    target: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    await new ShadowBoltAnimation(target, state).animate();

    const { power } = state.spells[state.currentSpell];
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    dispatch({
      type: 'castSpell',
      mutation: (draftState) => {
        const curse = afflictionEffect(1, 'curse', target)(draftState);
        damageEffect(totalPower * curse, target)(draftState);
      },
    });
  }
}
