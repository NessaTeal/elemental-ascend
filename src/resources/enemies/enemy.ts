import { State, GameDispatch } from '../../App/context';
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
  async act(
    enemy: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    const { currentAction } = state.enemies[enemy];
    const actionWrappers = this.getActionWrappers();
    const actionWrapper = actionWrappers[currentAction];

    await actionWrapper.getAnimation(enemy, state).animate();
    dispatch({
      type: 'enemyAction',
      mutation: (draftState) => {
        const draftEnemyState = draftState.enemies[enemy];
        actionWrapper.getAction(enemy, draftState);
        draftEnemyState.currentAction++;
        draftEnemyState.currentAction %= actionWrappers.length;
      },
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
