import { GameDispatch, State } from '../../../App/context';
import Fireball from '../../spells/data/fireball';
import { RewardClass } from '../reward';

export default class FireballPower extends RewardClass {
  startingState = {
    name: 'Fireball power',
  };

  getDescription(): string {
    return 'Increase base fireball damage by 4';
  }

  async take(dispatch: GameDispatch): Promise<void> {
    dispatch({
      type: 'takeReward',
      mutation: (state: State) => {
        const fireball = state.spells.find((s) => s.handle === Fireball);
        if (fireball) {
          fireball.power += 4;
        }
      },
    });
  }
}
