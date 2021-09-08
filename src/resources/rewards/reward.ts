import { GameDispatch } from '../../App/context';

export type StartingRewardState = {
  name: string;
};

export type RewardState = StartingRewardState & {
  handle: RewardConstructor;
};

export interface RewardConstructor extends Function {
  new (): RewardClass;
}
export abstract class RewardClass {
  protected abstract readonly startingState: StartingRewardState;

  public getStartingState(): RewardState {
    return {
      ...this.startingState,
      handle: this.constructor as RewardConstructor,
    };
  }
  abstract getDescription(): string;

  abstract take(dispatch: GameDispatch): Promise<void>;
}
