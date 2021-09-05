import importEnemies, { EnemyClass, EnemyStorage } from './enemies/enemy';
import { Encounter } from './encounters/encounter';
import importspellSlots, {
  SpellSlotStorage,
  SpellSlotState,
} from './spell-slots/spell-slot';
import importSpells from './spells/spellLoader';
import { SpellClass, SpellConstructor, SpellState } from './spells/spell';
import importEncounters, {
  EncounterStorage,
} from './encounters/encounterLoader';

let spells: SpellClass[] = [];

export function getSpellDefinition(
  spell: SpellConstructor | SpellState,
): SpellClass {
  if (typeof spell === 'object') {
    spell = spell.handle;
  }
  const spellObject = spells.find((s) => s.constructor === spell);
  if (!spellObject) {
    throw Error(`No entry found for spell ${spell.name}`);
  }

  return spellObject;
}

let enemies: EnemyStorage[] = [];

export function getEnemy(name: string): EnemyClass {
  const enemyState = enemies.find(
    (e) => e.name === name || e.enemy.startingState.name === name,
  )?.enemy;

  if (!enemyState) {
    throw Error(`No entry found for enemy ${name}`);
  }

  return enemyState;
}

let encounters: EncounterStorage[] = [];

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

let spellSlots: SpellSlotStorage[] = [];

export function getStartingSpellSlots(): SpellSlotState[] {
  return spellSlots.filter((s) => s.starting).map((s) => s.spellSlot);
}

export default function importAll(): void {
  enemies = importEnemies();
  spells = importSpells();
  encounters = importEncounters();
  spellSlots = importspellSlots();
}
