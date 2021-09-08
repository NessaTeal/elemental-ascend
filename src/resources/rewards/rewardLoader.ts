import { RewardClass } from './reward';

export default function importRewards(): RewardClass[] {
  const modules = require.context('./data', true, /.*.ts$/);
  return modules.keys().map((key) => new (modules(key).default)());
}
