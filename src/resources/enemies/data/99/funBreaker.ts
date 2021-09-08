import {
  createAttackEnemyAction,
  EnemyActionWrapper,
} from '../../../actions/enemies';
import { EnemyClass } from '../../enemy';

export default class FunBreaker extends EnemyClass {
  startingState = {
    name: 'FunBreaker',
    health: 100,
  };

  getActionWrappers(): EnemyActionWrapper[] {
    return [createAttackEnemyAction(1000000000)];
  }
}
