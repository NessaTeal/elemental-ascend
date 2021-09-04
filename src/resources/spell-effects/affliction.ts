import { State } from '../../App/context';
import { EnemyAffliction, EnemyAfflictionType } from '../enemies/enemy';

export default function afflictionEffect(
  amount: number,
  afflictionType: EnemyAfflictionType,
  target: number,
) {
  return (draftState: State): number => {
    const affliction = draftState.enemies[target].afflictions.find(
      (a: EnemyAffliction) => a.type === afflictionType,
    );

    if (affliction) {
      affliction.stacks += amount;
      return affliction.stacks;
    } else {
      draftState.enemies[target].afflictions.push({
        type: afflictionType,
        stacks: amount,
      });

      return amount;
    }
  };
}
