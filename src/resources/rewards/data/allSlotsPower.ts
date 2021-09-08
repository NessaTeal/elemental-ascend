import { GameDispatch, State } from '../../../App/context';
import { RewardClass } from '../reward';

export default class AllSlotsPower extends RewardClass {
  startingState = {
    name: 'Power of all slots',
  };

  getDescription(): string {
    return 'Increase power of each slot by 0.2';
  }

  async take(dispatch: GameDispatch): Promise<void> {
    dispatch({
      type: 'takeReward',
      mutation: (state: State) => {
        state.spellSlots.forEach((s) => (s.power += 0.2));
      },
    });
  }
}
