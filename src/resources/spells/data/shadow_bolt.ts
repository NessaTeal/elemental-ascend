import { SpellClass, SpellState } from '../spell';
import { GameDispatch, State } from '../../../App/context';
import { EnemyAffliction } from '../../enemies/enemy';
import { ShadowBoltAnimation } from '../../animations/spells';

export default class ShadowBolt extends SpellClass {
  startingState = {
    name: 'Shadow bolt',
    power: 6,
  };

  getDescription(state: State, spellState: SpellState) {
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
    return new Promise(async (resolve) => {
      await new ShadowBoltAnimation(target, state).animate();

      const { power } = state.spells[state.currentSpell];
      const slotPower = state.spellSlots[state.currentSlot].power;
      const totalPower = Math.ceil(power * slotPower);

      dispatch({
        type: 'castSpell',
        mutation: (draftState) => {
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
        },
      });

      resolve();
    });
  }
}
