import { EnemyClass } from '../../enemy';
import { EnemyActionWrapper } from '../../../actions';
import { createAttackEnemyAction } from '../../../actions/enemies';

export default class Wolfie extends EnemyClass {
  constructor() {
    super({
      name: 'Wolfie',
      health: 50,
    });
  }

  getActionWrappers(): EnemyActionWrapper[] {
    return [createAttackEnemyAction(10), createAttackEnemyAction(15)];
  }
}
