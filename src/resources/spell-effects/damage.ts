import { State } from '../../App/context';

export default function damageEffect(power: number, target: number) {
  return (draftState: State): void => {
    draftState.enemies[target].health -= power;
  };
}
