import { State, EnemyAction } from '../../App/context';
import produce from 'immer';
import { EnemyActionWrapper } from '../actions';

export abstract class EnemyClass {
  constructor(state: MinimalEnemyState) {
    this.startingState = {
      currentAction: 0,
      maxHealth: state.health,
      afflictions: [],
      ...state,
    };
  }
  act(action: EnemyAction, state: State): State {
    const { currentAction } = state.enemies[action.enemy];
    return produce(state, (draftState) => {
      const possibleActions = this.getActionWrappers().map((w) =>
        w.getAction(action),
      );
      const draftEnemyState = draftState.enemies[action.enemy];
      possibleActions[currentAction](draftState);
      draftEnemyState.currentAction++;
      draftEnemyState.currentAction %= possibleActions.length;
    });
  }

  startingState!: EnemyState;

  abstract getActionWrappers(): EnemyActionWrapper[];
}

export type EnemyAffliction = {
  type: 'curse';
  stacks: number;
};

type MinimalEnemyState = {
  name: string;
  health: number;
  currentAction?: number;
  maxHealth?: number;
  afflictions?: EnemyAffliction[];
};

export type EnemyState = Required<MinimalEnemyState>;

export type EnemyStorage = {
  name: string;
  level: number;
  enemy: EnemyClass;
};

export default function importEnemies(): EnemyStorage[] {
  const modules = require.context('./data', true, /.*(?!ts)$/);
  const enemies: EnemyStorage[] = [];

  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const level = Number(levelStr);
    const enemy = modules(m).default();
    enemies.push({ name, level, enemy });
  });

  return enemies;
}
