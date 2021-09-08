import { Encounter } from './encounters/encounter';
import importEncounters, {
  EncounterStorage,
} from './encounters/encounterLoader';
import { EnemyClass, EnemyConstructor, EnemyState } from './enemies/enemy';
import importEnemies, { EnemyStorage } from './enemies/enemyLoader';
import { RewardClass, RewardConstructor, RewardState } from './rewards/reward';
import importRewards from './rewards/rewardLoader';
import importspellSlots, {
  SpellSlotState,
  SpellSlotStorage,
} from './spell-slots/spell-slot';
import { SpellClass, SpellConstructor, SpellState } from './spells/spell';
import importSpells from './spells/spellLoader';

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

export function getEnemy(enemy: EnemyConstructor | EnemyState): EnemyClass {
  if (typeof enemy === 'object') {
    enemy = enemy.handle;
  }
  const enemyState = enemies.find((e) => e.enemy.constructor === enemy)?.enemy;

  if (!enemyState) {
    throw Error(`No entry found for enemy ${enemy}`);
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

let rewards: RewardClass[] = [];

export function getReward(
  reward: RewardConstructor | RewardState,
): RewardClass {
  if (typeof reward === 'object') {
    reward = reward.handle;
  }
  const rewardClass = rewards.find((r) => r.constructor === reward);

  if (!rewardClass) {
    throw Error(`No entry found for reward ${reward}`);
  }

  return rewardClass;
}

export function getRandomRewards(): RewardState[] {
  return rewards.map((r) => r.getStartingState());
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
  rewards = importRewards();
}
