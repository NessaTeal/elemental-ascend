import { Encounter } from './encounter';

export type EncounterStorage = {
  level: number;
  encounter: Encounter;
};

export default function importEncounters(): EncounterStorage[] {
  const modules = require.context('./data', true, /.*.ts$/);

  return modules.keys().map((m) => {
    const encounter = modules(m).default;
    const level = Number(m.split('/')[1]);
    return { level, encounter };
  });
}
