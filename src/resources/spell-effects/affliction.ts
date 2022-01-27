import { State } from '../../App/context';
import { EnemyAffliction, EnemyAfflictionType } from '../enemies/enemy';

export default function afflictionEffect(
  amount: number,
  afflictionType: EnemyAfflictionType,
  target: string,
) {
  return (draftState: State): number => {
    const enemy = draftState.enemies.find((e) => e.id === target);
    if (!enemy) {
      throw Error(`Enemy with id ${target} is not found`);
    }
    const affliction = enemy.afflictions.find(
      (a: EnemyAffliction) => a.type === afflictionType,
    );

    if (affliction) {
      affliction.stacks += amount;
      return affliction.stacks;
    } else {
      enemy.afflictions.push({
        type: afflictionType,
        stacks: amount,
      });

      return amount;
    }
  };
}
