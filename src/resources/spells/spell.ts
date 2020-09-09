import { CastSpellAction, State, GameDispatch } from '../../App/context';

export abstract class SpellClass {
  constructor(state: MinimalSpellState) {
    this.startingState = {
      ...state,
    };
  }

  protected abstract getAnimation(
    action: CastSpellAction,
    state: State,
  ): Promise<void>;

  abstract getDescription(state: State, spellState: SpellState): string;

  abstract getAction(action: CastSpellAction, state: State): State;

  startingState: SpellState;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getTargets(target: number, _state: State): number[] {
    return [target];
  }

  async cast(
    originalTarget: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      const targets = this.getTargets(originalTarget, state);
      const action: CastSpellAction = { type: 'castSpell', target: targets };
      await this.getAnimation(action, state);
      dispatch(action);
      resolve();
    });
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
