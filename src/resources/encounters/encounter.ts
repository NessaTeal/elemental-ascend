export type Encounter = {
  enemies: string[];
};

export type EncounterStorage = {
  name: string;
  level: number;
  encounter: Encounter;
};

export default function importEncounters(): EncounterStorage[] {
  const modules = require.context('./data', true, /.*json$/);
  const encounters: EncounterStorage[] = [];

  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const encounter = modules(m);
    const level = Number(levelStr);
    encounters.push({ name, level, encounter });
  });

  return encounters;
}
