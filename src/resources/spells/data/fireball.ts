import { SpellClass } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';
import { GameAnimation, FireballAnimation } from '../../animations';

class Fireball extends SpellClass {
  constructor() {
    super({
      name: 'Fireball',
      power: 10,
    });
  }

  getAnimation(action: CastSpellAction, state: State): GameAnimation {
    return new FireballAnimation(action, state);
  }

  getDescription(state: State) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { power } = state.spells.find((s) => s.name === state.currentSpell)!;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage to the enemy`;
  }

  getAction(action: CastSpellAction, state: State): State {
    const { target } = action;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { power } = state.spells.find((s) => s.name === state.currentSpell)!;
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    return produce(state, (draftState) => {
      draftState.enemies[target].health -= totalPower;
    });
  }
}

export default (): Fireball => new Fireball();
