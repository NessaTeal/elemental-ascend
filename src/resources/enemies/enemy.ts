import { State } from '../../App/context';
import produce from 'immer';

export abstract class EnemyClass {
  constructor(state: MinimalEnemyState) {
    this.startingState = {
      currentAction: 0,
      maxHealth: state.health,
      afflictions: [],
      ...state,
    };
  }

  act(state: State, enemyState: EnemyState): State {
    const { currentAction } = enemyState;
    return produce(state, (draftState) => {
      const possibleActions = this.getPossibleActions();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const draftEnemyState = draftState.enemies.find(
        (e) => e.name === enemyState.name,
      )!;
      possibleActions[currentAction](draftState, draftEnemyState);
      draftEnemyState.currentAction++;
      draftEnemyState.currentAction %= possibleActions.length;
    });
  }
  // define mutations that are free to modify either state
  abstract getPossibleActions(): ((
    state: State,
    enemyState: EnemyState,
  ) => void)[];
  abstract getActionDescription(enemyState: EnemyState): string;

  level!: number;
  startingState!: EnemyState;
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
