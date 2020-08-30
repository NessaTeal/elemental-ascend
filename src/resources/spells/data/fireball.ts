import { SpellClass, SpellState } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';

class Fireball extends SpellClass {
  constructor() {
    super({
      name: 'Fireball',
      power: 10,
    });
  }

  cast(
    action: CastSpellAction,
    state: State,
    spellState: SpellState,
    slotPower: number,
  ): State {
    const { target } = action;
    const { power } = spellState;
    const totalPower = Math.ceil(power * slotPower);

    return produce(state, (draftState) => {
      draftState.enemies[target].health -= totalPower;
    });
  }

  description(spellState: SpellState, slotPower: number): string {
    const { power } = spellState;
    return `Deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage to the enemy`;
  }
}

export default (): Fireball => new Fireball();
