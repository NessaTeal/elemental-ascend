import { SpellClass, SpellState } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';
import { GameAnimation, LightningStrikeAnimation } from '../../animations';

class LightningStrike extends SpellClass {
  constructor() {
    super({
      name: 'Lightning strike',
      power: 8,
    });
  }

  getAnimation(action: CastSpellAction, state: State): GameAnimation {
    return new LightningStrikeAnimation(action, state);
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

  getTargets(target: number, state: State): number[] {
    const { enemies } = state;
    let secondTarget = Math.floor(Math.random() * enemies.length);
    while (secondTarget === target) {
      secondTarget = Math.floor(Math.random() * enemies.length);
    }

    return [target, secondTarget];
  }

  getAction(action: CastSpellAction, state: State): State {
    const { target } = action;
    const { power } = state.spells[state.currentSpell];
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    return produce(state, (draftState) => {
      draftState.enemies[target[0]].health -= Math.ceil(totalPower * 0.85);
      draftState.enemies[target[1]].health -= Math.ceil(totalPower * 0.25);
    });
  }
}

export default (): LightningStrike => new LightningStrike();
