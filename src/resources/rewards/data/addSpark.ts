import { GameDispatch, State } from '../../../App/context';
import { getSpellDefinition } from '../..';
import Spark from '../../spells/data/spark';
import { RewardClass } from '../reward';

export default class FireballPower extends RewardClass {
  startingState = {
    name: 'Add Spark',
  };

  getDescription(): string {
    return 'Add Spark to random spell card';
  }

  async take(dispatch: GameDispatch): Promise<void> {
    dispatch({
      type: 'takeReward',
      mutation: (state: State) => {
        state.spellCards[
          Math.floor(Math.random() * state.spellCards.length)
        ].spells.push(getSpellDefinition(Spark).getStartingState());
      },
    });
  }
}
