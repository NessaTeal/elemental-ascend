import { State } from '../../App/context';

export default function damageEffect(power: number, target: string) {
  return (draftState: State): void => {
    const enemy = draftState.enemies.find((e) => e.id === target);
    if (!enemy) {
      throw Error(`Enemy with id ${target} is not found`);
    }
    enemy.health -= power;
  };
}
