import { SpellClass } from './spell';

export default function importSpells(): SpellClass[] {
  const modules = require.context('./data', true, /.*.ts$/);
  return modules.keys().map((key) => new (modules(key).default)());
}
