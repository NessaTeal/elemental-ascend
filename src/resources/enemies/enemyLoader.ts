import { EnemyClass } from './enemy';

export type EnemyStorage = {
  level: number;
  enemy: EnemyClass;
};

export default function importEnemies(): EnemyStorage[] {
  const modules = require.context('./data', true, /.*.ts$/);

  return modules.keys().map((m) => {
    const level = Number(m.split('/')[1]);
    const enemy = new (modules(m).default)();
    return { level, enemy };
  });
}
