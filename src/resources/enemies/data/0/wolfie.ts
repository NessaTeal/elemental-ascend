import { EnemyClass } from '../../enemy';
import { State, EnemyAction } from '../../../../App/context';
import { StubEnemyAnimation } from '../../../animations';
import { EnemyActionWrapper } from '../../../actions';

export class Wolfie extends EnemyClass {
  constructor() {
    super({
      name: 'Wolfie',
      health: 50,
    });
  }

  getActionWrappers(): EnemyActionWrapper[] {
    return [
      {
        getAnimation: (action: EnemyAction, state: State) =>
          new StubEnemyAnimation(action, state),
        getDescription: () => 'Deal 10 damage',
        getAction: () => (state: State): void => {
          state.playerHealth -= 10;
        },
      },
      {
        getAnimation: (action: EnemyAction, state: State) =>
          new StubEnemyAnimation(action, state),
        getDescription: () => 'Deal 15 damage',
        getAction: () => (state: State): void => {
          state.playerHealth -= 15;
        },
      },
    ];
  }
}

export default (): Wolfie => new Wolfie();
