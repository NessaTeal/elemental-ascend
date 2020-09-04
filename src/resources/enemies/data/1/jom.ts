import { EnemyClass, EnemyState } from '../../enemy';
import { State, EnemyAction } from '../../../../App/context';
import { EnemyActionWrapper } from '../../../actions';
import { StubEnemyAnimation2 } from '../../../animations';

export class Jom extends EnemyClass {
  constructor() {
    super({
      name: 'Jom',
      health: 100,
    });
  }

  getActionDescription(enemyState: EnemyState): string {
    const { currentAction } = enemyState;
    return ['Deal 20 damage', 'Will heal for 10 hp'][currentAction];
  }

  getActionWrappers(): EnemyActionWrapper[] {
    return [
      {
        getAnimation: (action: EnemyAction, state: State) =>
          new StubEnemyAnimation2(action, state),
        getDescription: () => 'Deal 20 damage',
        getAction: () => (state: State): void => {
          state.playerHealth -= 10;
        },
      },
      {
        getAnimation: (action: EnemyAction, state: State) =>
          new StubEnemyAnimation2(action, state),
        getDescription: () => 'Heals for 10 hp',
        getAction: (action: EnemyAction, state: State): void => {
          state.enemies[action.enemy].health = Math.min(
            state.enemies[action.enemy].health + 10,
            state.enemies[action.enemy].maxHealth,
          );
        },
      },
    ];
  }
}

export default (): Jom => new Jom();
