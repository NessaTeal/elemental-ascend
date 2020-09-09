import { SpellClass, SpellState } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';
import { FireballAnimation } from '../../animations/spells';

class Fireball extends SpellClass {
  constructor() {
    super({
      name: 'Fireball',
      power: 10,
    });
  }

  getAnimation(action: CastSpellAction, state: State): Promise<void> {
    return new FireballAnimation(action, state).animate();
  }

  getDescription(state: State, spellState: SpellState) {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage to the enemy`;
  }

  getAction(action: CastSpellAction, state: State): State {
    const { target } = action;
    const { power } = state.spells[state.currentSpell];
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    return produce(state, (draftState) => {
      draftState.enemies[target[0]].health -= totalPower;
    });
  }
}

export default (): Fireball => new Fireball();
