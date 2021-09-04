import { State, GameDispatch } from '../../App/context';
import { SpellConstructor } from './spellLoader';

export type StartingSpellState = {
  name: string;
  power: number;
};

export type SpellState = StartingSpellState & {
  handle: SpellConstructor;
};

export abstract class SpellClass {
  protected abstract readonly startingState: StartingSpellState;

  public getStartingState(): SpellState {
    return {
      ...this.startingState,
      handle: this.constructor as SpellConstructor,
    };
  }
  abstract getDescription(state: State, spellState: SpellState): string;

  abstract cast(
    target: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void>;
}
