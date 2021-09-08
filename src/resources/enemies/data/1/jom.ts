import {
  createAttackEnemyAction,
  createEnemySelfHealAction,
  EnemyActionWrapper,
} from '../../../actions/enemies';
import { EnemyClass } from '../../enemy';

export default class Jom extends EnemyClass {
  startingState = {
    name: 'Jom',
    health: 100,
  };

  getActionWrappers(): EnemyActionWrapper[] {
    return [createAttackEnemyAction(10), createEnemySelfHealAction(20)];
  }
}
