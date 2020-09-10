import { SpellClass, SpellState } from '../spell';
import { GameDispatch, State } from '../../../App/context';
import { LightningStrikeAnimation } from '../../animations/spells';

class LightningStrike extends SpellClass {
  constructor() {
    super({
      name: 'Lightning strike',
      power: 8,
    });
  }

  getDescription(state: State, spellState: SpellState) {
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
    return new Promise(async (resolve) => {
      const { enemies } = state;
      let secondTarget = Math.floor(Math.random() * enemies.length);
      while (secondTarget === target) {
        secondTarget = Math.floor(Math.random() * enemies.length);
      }

      await new LightningStrikeAnimation(
        [target, secondTarget],
        state,
      ).animate();

      const { power } = state.spells[state.currentSpell];
      const slotPower = state.spellSlots[state.currentSlot].power;
      const totalPower = Math.ceil(power * slotPower);

      dispatch({
        type: 'castSpell',
        mutation: (draftState) => {
          draftState.enemies[target].health -= Math.ceil(totalPower * 0.85);
          draftState.enemies[secondTarget].health -= Math.ceil(
            totalPower * 0.25,
          );
        },
      });

      resolve();
    });
  }
}

export default (): LightningStrike => new LightningStrike();
