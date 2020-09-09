import { SpellClass, SpellState } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';
import { EnemyAffliction } from '../../enemies/enemy';
import { ShadowBoltAnimation } from '../../animations/spells';

class ShadowBolt extends SpellClass {
  constructor() {
    super({
      name: 'Shadow bolt',
      power: 6,
    });
  }

  getAnimation(action: CastSpellAction, state: State): Promise<void> {
    return new ShadowBoltAnimation(action, state).animate();
  }

  getDescription(state: State, spellState: SpellState) {
    const { power } = spellState;
    const slotPower = state.spellSlots[state.currentSlot].power;

    return `Inflict one curse stack to the enemy and deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage per each`;
  }

  getAction(action: CastSpellAction, state: State): State {
    const { target } = action;
    const { power } = state.spells[state.currentSpell];
    const slotPower = state.spellSlots[state.currentSlot].power;
    const totalPower = Math.ceil(power * slotPower);

    return produce(state, (draftState) => {
      const curse = draftState.enemies[target[0]].afflictions.find(
        (a: EnemyAffliction) => a.type === 'curse',
      );

      let stacks = 1;

      if (curse) {
        stacks = ++curse.stacks;
      } else {
        draftState.enemies[target[0]].afflictions.push({
          type: 'curse',
          stacks: 1,
        });
      }

      draftState.enemies[target[0]].health -= totalPower * stacks;
    });
  }
}

export default (): ShadowBolt => new ShadowBolt();
