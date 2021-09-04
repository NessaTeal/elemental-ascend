import { SpellClass, SpellState } from '../spell';
import { GameDispatch, State } from '../../../App/context';
import { FireballAnimation } from '../../animations/spells';

export default class Fireball extends SpellClass {
  startingState = {
    name: 'Fireball',
    power: 10,
  };

  getDescription(state: State, spellState: SpellState) {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage to the enemy`;
  }

  async cast(
    target: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      await new FireballAnimation(target, state).animate();

      const { power } = state.spells[state.currentSpell];
      const slotPower = state.spellSlots[state.currentSlot].power;
      const totalPower = Math.ceil(power * slotPower);

      dispatch({
        type: 'castSpell',
        mutation: (draftState) => {
          draftState.enemies[target].health -= totalPower;
        },
      });

      resolve();
    });
  }
}
