import { CastSpellAction, State } from '../../App/context';

export abstract class SpellClass {
  constructor(state: MinimalSpellState) {
    this.startingState = {
      ...state,
    };
  }
  abstract cast(
    action: CastSpellAction,
    gameState: State,
    spellState: SpellState,
    slotPower: number,
  ): State;
  abstract description(spellState: SpellState, slotPower: number): string;
  startingState: SpellState;
}

export type SpellStorage = {
  name: string;
  spell: SpellClass;
};

type MinimalSpellState = {
  name: string;
  power: number;
};

export type SpellState = Required<MinimalSpellState>;

const spells: SpellStorage[] = [];

function importAll(): void {
  const modules = require.context('./data', true, /.*(?!ts)$/);
  modules.keys().forEach((m) => {
    const [, name] = m.split('/');
    const spell = modules(m).default();
    spells.push({ name, spell });
  });
}

importAll();

export default function getSpell(name: string): SpellClass {
  const spell = spells.find(
    (s) => s.name === name || s.spell.startingState.name === name,
  )?.spell;

  if (!spell) {
    throw Error(`No entry found for spell ${name}`);
  }

  return spell;
}
