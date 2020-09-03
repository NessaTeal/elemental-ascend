import { GameAnimation } from '../animations';
import { Action, State, CastSpellAction } from '../../App/context';
import { SpellState } from '../spells/spell';

export async function executeAnimatedAction(
  animation: GameAnimation,
  action: Action,
  dispatch: (action: Action) => void,
): Promise<void> {
  await animation.perform();
  dispatch(action);
}

export type CastSpellActionWrapper = {
  getAnimation: (action: CastSpellAction, state: State) => GameAnimation;
  getDescription: (state: State, spellState: SpellState) => string;
  getAction: (action: CastSpellAction, state: State) => State;
};
