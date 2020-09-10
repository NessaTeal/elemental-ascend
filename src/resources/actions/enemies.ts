import { State } from '../../App/context';
import { GameAnimation } from '../animations';
import {
  GenericEnemyHealAnimation,
  GenericEnemyAttackAnimation,
} from '../animations/enemies';
import { EnemyState } from '../enemies/enemy';

export type EnemyActionWrapper = {
  getAnimation: (enemy: number, state: State) => GameAnimation;
  getDescription: (state: State, enemyState: EnemyState) => string;
  getAction: (enemy: number, state: State) => void;
};

export function createAttackEnemyAction(damage: number): EnemyActionWrapper {
  return {
    getAnimation: (enemy: number, state: State) =>
      new GenericEnemyAttackAnimation(enemy, state),
    getDescription: () => `Deal ${damage} damage`,
    getAction: (_, state) => {
      state.playerHealth -= damage;
    },
  };
}

export function createEnemySelfHealAction(heal: number): EnemyActionWrapper {
  return {
    getAnimation: (enemy: number, state: State) =>
      new GenericEnemyHealAnimation(enemy, state),
    getDescription: () => `Heal ${heal} hp`,
    getAction: (enemy, state) => {
      state.enemies[enemy].health = Math.min(
        state.enemies[enemy].health + heal,
        state.enemies[enemy].maxHealth,
      );
    },
  };
}
