import { GameDispatch, State } from '../../../App/context';
import { RewardClass } from '../reward';

export default class BigHeal extends RewardClass {
  startingState = {
    name: 'Big heal',
  };

  getDescription(): string {
    return 'Heal 200 hp';
  }

  async take(dispatch: GameDispatch): Promise<void> {
    dispatch({
      type: 'takeReward',
      mutation: (state: State) => {
        state.playerHealth += 200;
      },
    });
  }
}
