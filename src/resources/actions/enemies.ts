import { State } from '../../App/context';
import { GameAnimation } from '../animations';
import {
  GenericEnemyAttackAnimation,
  GenericEnemyHealAnimation,
} from '../animations/enemies';
import { EnemyState } from '../enemies/enemy';

export type EnemyActionWrapper = {
  getAnimation: (enemyId: string) => GameAnimation;
  getDescription: (state: State, enemyState: EnemyState) => string;
  getAction: (enemy: number, state: State) => void;
};

export function createAttackEnemyAction(damage: number): EnemyActionWrapper {
  return {
    getAnimation: (enemyId: string) => new GenericEnemyAttackAnimation(enemyId),
    getDescription: () => `Deal ${damage} damage`,
    getAction: (_, state) => {
      state.playerHealth -= damage;
    },
  };
}

export function createEnemySelfHealAction(heal: number): EnemyActionWrapper {
  return {
    getAnimation: (enemyId: string) => new GenericEnemyHealAnimation(enemyId),
    getDescription: () => `Heal ${heal} hp`,
    getAction: (enemy, state) => {
      state.enemies[enemy].health = Math.min(
        state.enemies[enemy].health + heal,
        state.enemies[enemy].maxHealth,
      );
    },
  };
}
