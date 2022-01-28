import { GameDispatch, State } from '../../App/context';

export type StartingSpellState = {
  name: string;
  power: number;
};

export type SpellState = StartingSpellState & {
  additionalSpells?: SpellState[];
  handle: SpellConstructor;
};

export interface SpellConstructor extends Function {
  new (): SpellClass;
}

export type CastProps = {
  target: string;
  spellState: SpellState;
  state: State;
  dispatch: GameDispatch;
};
export abstract class SpellClass {
  protected abstract readonly startingState: StartingSpellState;
  public abstract readonly animationDuration: number;

  public getStartingState(): SpellState {
    return {
      ...this.startingState,
      handle: this.constructor as SpellConstructor,
    };
  }
  abstract getDescription(state: State, spellState: SpellState): string;

  public cast(
    castProps: CastProps,
  ): null | [number, State, () => Promise<void>] {
    const realCast = this._cast(castProps);
    return realCast ? [this.animationDuration, ...realCast] : null;
  }

  abstract _cast(castProps: CastProps): null | [State, () => Promise<void>];
}
