import { GameDispatch, State } from '../../App/context';
import { EnemyActionWrapper } from '../actions/enemies';

export abstract class EnemyClass {
  protected abstract readonly startingState: MinimalEnemyState;

  getStartingState(): EnemyState {
    return {
      ...this.startingState,
      currentAction: 0,
      maxHealth: this.startingState.health,
      afflictions: [],
      handle: this.constructor as EnemyConstructor,
    };
  }
  async act(
    enemy: number,
    state: State,
    dispatch: GameDispatch,
  ): Promise<void> {
    const { currentAction } = state.enemies[enemy];
    const actionWrappers = this.getActionWrappers();
    const actionWrapper = actionWrappers[currentAction];

    await actionWrapper.getAnimation(enemy, state).animate();
    dispatch({
      type: 'enemyAction',
      mutation: (draftState) => {
        const draftEnemyState = draftState.enemies[enemy];
        actionWrapper.getAction(enemy, draftState);
        draftEnemyState.currentAction++;
        draftEnemyState.currentAction %= actionWrappers.length;
      },
    });
  }

  abstract getActionWrappers(): EnemyActionWrapper[];
}

export interface EnemyConstructor extends Function {
  new (): EnemyClass;
}

export type EnemyAfflictionType = 'curse';

export type EnemyAffliction = {
  type: EnemyAfflictionType;
  stacks: number;
};

type MinimalEnemyState = {
  name: string;
  health: number;
  currentAction?: number;
  maxHealth?: number;
  afflictions?: EnemyAffliction[];
};

export type EnemyState = Required<MinimalEnemyState> & {
  handle: EnemyConstructor;
};
