import { SpellClass, SpellState } from '../spell';
import { CastSpellAction, State } from '../../../App/context';
import produce from 'immer';
import { EnemyAffliction } from '../../enemies/enemy';
import { GameAnimation, ShadowBoltAnimation } from '../../animations';

class ShadowBolt extends SpellClass {
  constructor() {
    super({
      name: 'Shadow bolt',
      power: 6,
    });
  }

  getAnimation(action: CastSpellAction, state: State): GameAnimation {
    return new ShadowBoltAnimation(action, state);
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
      const curse = draftState.enemies[target].afflictions.find(
        (a: EnemyAffliction) => a.type === 'curse',
      );

      let stacks = 1;

      if (curse) {
        stacks = ++curse.stacks;
      } else {
        draftState.enemies[target].afflictions.push({
          type: 'curse',
          stacks: 1,
        });
      }

      draftState.enemies[target].health -= totalPower * stacks;
    });
  }

  description(spellState: SpellState, slotPower: number): string {
    const { power } = spellState;

    return `Inflict one curse stack to the enemy and deal ${power} (${Math.ceil(
      power * slotPower,
    )}) damage per each`;
  }
}

export default (): ShadowBolt => new ShadowBolt();
