import { GameAnimation } from '.';
import { EnemyAction, State } from '../../App/context';

export class GenericEnemyAttackAnimation extends GameAnimation {
  constructor(action: EnemyAction, state: State) {
    super(500);
  }
  animate(): void {
    console.log('Enemy attacks');
  }
}

export class GenericEnemyHealAnimation extends GameAnimation {
  constructor(action: EnemyAction, state: State) {
    super(500);
  }
  animate(): void {
    console.log('Enemy heals');
  }
}
