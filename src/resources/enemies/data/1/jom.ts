import { EnemyClass, EnemyState } from '../../enemy';
import { State } from '../../../../App/context';

export class Jom extends EnemyClass {
  constructor() {
    super({
      name: 'Jom',
      health: 100,
    });
  }

  getPossibleActions(): ((state: State, enemyState: EnemyState) => void)[] {
    return [
      (state: State): void => {
        state.playerHealth -= 20;
      },
      (_, enemyState: EnemyState): void => {
        enemyState.health = Math.min(
          enemyState.health + 10,
          enemyState.maxHealth,
        );
      },
    ];
  }

  getActionDescription(enemyState: EnemyState): string {
    const { currentAction } = enemyState;
    return ['Deal 20 damage', 'Will heal for 10 hp'][currentAction];
  }
}

export default (): Jom => new Jom();
