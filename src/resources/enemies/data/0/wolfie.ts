import { EnemyClass, EnemyState } from '../../enemy';
import { State } from '../../../../App/context';

export class Wolfie extends EnemyClass {
  constructor() {
    super({
      name: 'Wolfie',
      health: 50,
    });
  }

  getPossibleActions(): ((state: State) => void)[] {
    return [
      (state: State): void => {
        state.playerHealth -= 10;
      },
      (state: State): void => {
        state.playerHealth -= 15;
      },
    ];
  }

  getActionDescription(enemyState: EnemyState): string {
    const { currentAction } = enemyState;
    return ['Deal 10 damage', 'Deal 15 damage'][currentAction];
  }
}

export default (): Wolfie => new Wolfie();
