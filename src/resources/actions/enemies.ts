import { EnemyAction, State } from '../../App/context';
import { GameAnimation } from '../animations';
import {
  GenericEnemyHealAnimation,
  GenericEnemyAttackAnimation,
} from '../animations/enemies';
import { EnemyState } from '../enemies/enemy';

export type EnemyActionWrapper = {
  getAnimation: (action: EnemyAction, state: State) => GameAnimation;
  getDescription: (state: State, enemyState: EnemyState) => string;
  getAction: (action: EnemyAction, state: State) => void;
};

export function createAttackEnemyAction(damage: number): EnemyActionWrapper {
  return {
    getAnimation: (action: EnemyAction, state: State) =>
      new GenericEnemyAttackAnimation(action, state),
    getDescription: () => `Deal ${damage} damage`,
    getAction: (_, state) => {
      state.playerHealth -= damage;
    },
  };
}

export function createEnemySelfHealAction(heal: number): EnemyActionWrapper {
  return {
    getAnimation: (action: EnemyAction, state: State) =>
      new GenericEnemyHealAnimation(action, state),
    getDescription: () => `Heal ${heal} hp`,
    getAction: (action, state) => {
      state.enemies[action.enemy].health = Math.min(
        state.enemies[action.enemy].health + heal,
        state.enemies[action.enemy].maxHealth,
      );
    },
  };
}
