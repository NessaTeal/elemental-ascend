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

type MinimalSpellState = {
  name: string;
  power: number;
};

export type SpellState = Required<MinimalSpellState>;
