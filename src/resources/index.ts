import { SpellClass } from './spells/spell';
import { EnemyClass } from './enemies/enemy';
import { Encounter } from './encounters/encounter';

type SpellStorage = {
  name: string;
  spell: SpellClass;
};

const spells: SpellStorage[] = [];

function importSpells(): void {
  const modules = require.context('./spells/data', true, /.*(?!ts)$/);
  modules.keys().forEach((m) => {
    const [, name] = m.split('/');
    const spell = modules(m).default();
    spells.push({ name, spell });
  });
}

export function getSpell(name: string): SpellClass {
  const spell = spells.find(
    (s) => s.name === name || s.spell.startingState.name === name,
  )?.spell;

  if (!spell) {
    throw Error(`No entry found for spell ${name}`);
  }

  return spell;
}

type EnemyStorage = {
  name: string;
  level: number;
  enemy: EnemyClass;
};

const enemies: EnemyStorage[] = [];

function importEnemies(): void {
  const modules = require.context('./enemies/data', true, /.*(?!ts)$/);
  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const level = Number(levelStr);
    const enemy = modules(m).default();
    enemies.push({ name, level, enemy });
  });
}

export function getEnemy(name: string): EnemyClass {
  const enemyState = enemies.find(
    (e) => e.name === name || e.enemy.startingState.name === name,
  )?.enemy;

  if (!enemyState) {
    throw Error(`No entry found for enemy ${name}`);
  }

  return enemyState;
}

type EncounterStorage = {
  name: string;
  level: number;
  encounter: Encounter;
};

const encounters: EncounterStorage[] = [];

function importEncounters(): void {
  const modules = require.context('./encounters/data', true, /.*json$/);
  modules.keys().forEach((m) => {
    const [, levelStr, name] = m.split('/');
    const encounter = modules(m);
    const level = Number(levelStr);
    encounters.push({ name, level, encounter });
  });
}

export function getEncounter(level: number): Encounter {
  const possibleEncounters = encounters
    .filter((e) => e.level === level)
    .map((e) => e.encounter);

  const amount = possibleEncounters.length;

  if (amount === 0) {
    throw Error(`No possible encounters for level ${level}`);
  }

  return possibleEncounters[Math.floor(Math.random() * amount)];
}

export default function importAll(): void {
  importEnemies();
  importSpells();
  importEncounters();
}
