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

  cast(
    action: CastSpellAction,
    state: State,
    spellState: SpellState,
    slotPower: number,
  ): State {
    const { target } = action;
    const { power } = spellState;
    const { enemies } = state;
    const totalPower = Math.ceil(power * slotPower);

    let secondTarget = Math.floor(Math.random() * enemies.length);
    while (secondTarget === target) {
      secondTarget = Math.floor(Math.random() * enemies.length);
    }

    return produce(state, (draftState) => {
      draftState.enemies[target].health -= Math.ceil(totalPower * 0.85);
      draftState.enemies[secondTarget].health -= Math.ceil(totalPower * 0.25);
    });
  }

  description(spellState: SpellState, slotPower: number): string {
    const { power } = spellState;

    return `Deal ${Math.ceil(power * 0.85)} (${Math.ceil(
      power * slotPower * 0.85,
    )}) to the enemy and ${Math.ceil(power * 0.25)} (${Math.ceil(
      power * slotPower * 0.25,
    )}) to another random one`;
  }
}

export default (): LightningStrike => new LightningStrike();
