import { State } from '../../App/context';
import produce from 'immer';

export abstract class EnemyClass {
  constructor(state: MinimalEnemyState) {
    this.startingState = {
      ...state,
      currentAction: state.currentAction ?? 0,
      maxHealth: state.maxHealth ?? state.health,
      afflictions: state.afflictions ?? [],
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

export type EnemyStorage = {
  name: string;
  level: number;
  enemy: EnemyClass;
};

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

const enemies: EnemyStorage[] = [];

function importAll(): void {
  const modules = require.context('./data', true, /.*(?!ts)$/);
  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const level = Number(levelStr);
    const enemy = modules(m).default();
    enemies.push({ name, level, enemy });
  });
}

importAll();

export default function getEnemy(name: string): EnemyClass {
  const enemyState = enemies.find(
    (e) => e.name === name || e.enemy.startingState.name === name,
  )?.enemy;

  if (!enemyState) {
    throw Error(`No entry found for enemy ${name}`);
  }

  return enemyState;
}
