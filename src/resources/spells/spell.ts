import { CastSpellAction, State } from '../../App/context';
import { GameAnimation } from '../animations';
import { CastSpellActionWrapper } from '../actions';

export abstract class SpellClass {
  constructor(state: MinimalSpellState) {
    this.startingState = {
      ...state,
    };
  }

  protected abstract getAnimation(
    action: CastSpellAction,
    state: State,
  ): GameAnimation;

  protected abstract getDescription(state: State): string;

  protected abstract getAction(action: CastSpellAction, state: State): State;

  startingState: SpellState;
  getActionWrapper(): CastSpellActionWrapper {
    return {
      getAnimation: this.getAnimation,
      getDescription: this.getDescription,
      getAction: this.getAction,
    };
  }
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
