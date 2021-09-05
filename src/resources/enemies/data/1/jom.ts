import { EnemyClass } from '../../enemy';
import { EnemyActionWrapper } from '../../../actions';
import {
  createAttackEnemyAction,
  createEnemySelfHealAction,
} from '../../../actions/enemies';

export default class Jom extends EnemyClass {
  constructor() {
    super({
      name: 'Jom',
      health: 100,
    });
  }

  getActionWrappers(): EnemyActionWrapper[] {
    return [createAttackEnemyAction(10), createEnemySelfHealAction(20)];
  }
}
