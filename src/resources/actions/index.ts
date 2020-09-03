import { GameAnimation } from '../animations';
import { Action } from '../../App/context';

export async function executeAnimatedAction(
  animation: GameAnimation,
  action: Action,
  dispatch: (action: Action) => void,
): Promise<void> {
  await animation.perform();
  dispatch(action);
}
