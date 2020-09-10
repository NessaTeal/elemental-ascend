import { State, GameDispatch } from '../../App/context';

export abstract class SpellClass {
  constructor(state: MinimalSpellState) {
    this.startingState = {
      ...state,
    };
  }

  abstract getDescription(state: State, spellState: SpellState): string;

  startingState: SpellState;

  abstract async cast(
    target: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void>;
}

type MinimalSpellState = {
  name: string;
  power: number;
};

export type SpellState = Required<MinimalSpellState>;

export type SpellStorage = {
  name: string;
  spell: SpellClass;
};

export default function importSpells(): SpellStorage[] {
  const modules = require.context('./data', true, /.*(?!ts)$/);
  const spells: SpellStorage[] = [];

  modules.keys().forEach((m) => {
    const [, name] = m.split('/');
    const spell = modules(m).default();
    spells.push({ name, spell });
  });

  return spells;
}
