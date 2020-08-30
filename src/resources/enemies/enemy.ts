export class EnemyClass {
  constructor(state: MinimalEnemyState) {
    this.startingState = {
      ...state,
      maxHealth: state.maxHealth ?? state.health,
      afflictions: state.afflictions ?? [],
    };
  }

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
