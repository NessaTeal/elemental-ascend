import importSpells, { SpellClass, SpellStorage } from './spells/spell';
import importEnemies, { EnemyClass, EnemyStorage } from './enemies/enemy';
import importEncounters, {
  Encounter,
  EncounterStorage,
} from './encounters/encounter';
import importspellSlots, {
  SpellSlotStorage,
  SpellSlotState,
} from './spell-slots/spell-slot';

let spells: SpellStorage[] = [];

export function getSpell(name: string): SpellClass {
  const spell = spells.find(
    (s) => s.name === name || s.spell.startingState.name === name,
  )?.spell;

  if (!spell) {
    throw Error(`No entry found for spell ${name}`);
  }

  return spell;
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
