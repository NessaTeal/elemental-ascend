export abstract class Encounter {
  constructor(state: MinimalEncounterState) {
    this.startingState = {
      ...state,
    };
  }
  startingState: EncounterState;
}

export type EncounterStorage = {
  name: string;
  level: number;
  encounter: Encounter;
};

type MinimalEncounterState = {
  enemies: string[];
};

export type EncounterState = Required<MinimalEncounterState>;

const encounters: EncounterStorage[] = [];

function importAll(): void {
  const modules = require.context('./data', true, /.*(?!ts)$/);
  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const encounter = modules(m).default();
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
