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
        state.spellCards.forEach((spellCard) => {
          spellCard.spells
            .filter((s) => s.handle === Fireball)
            .forEach((f) => (f.power += 4));
        });
      },
    });
  }
}
