export type Encounter = {
  startingState: EncounterState;
};

export type EncounterStorage = {
  name: string;
  level: number;
  encounter: Encounter;
};

export type EncounterState = {
  enemies: string[];
};

const encounters: EncounterStorage[] = [];

function importAll(): void {
  const modules = require.context('./data', true, /.*json$/);
  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const encounter = modules(m);
    const level = Number(levelStr);
    encounters.push({ name, level, encounter });
  });
}

importAll();

export default function getEncounter(level: number): Encounter {
  const possibleEncounters = encounters
    .filter((e) => e.level === level)
    .map((e) => e.encounter);

  const amount = possibleEncounters.length;

  if (amount === 0) {
    throw Error(`No possible encounters for level ${level}`);
  }

  return possibleEncounters[Math.floor(Math.random() * amount)];
}
