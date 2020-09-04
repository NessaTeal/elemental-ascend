import { CastSpellAction, State, EnemyAction } from '../../App/context';

export abstract class GameAnimation {
  constructor(animationDuration: number) {
    this.animationDuration = animationDuration;
  }
  async perform(): Promise<void> {
    return new Promise((accept) => {
      this.animate();
      setTimeout(() => {
        console.log('Done');
        accept();
      }, this.animationDuration);
    });
  }
  animationDuration: number;
  protected abstract animate(): void;
}

export class FireballAnimation extends GameAnimation {
  constructor(action: CastSpellAction, state: State) {
    super(300);
  }
  animate(): void {
    console.log('Doing stuff');
  }
}

export class LightningStrikeAnimation extends GameAnimation {
  constructor(action: CastSpellAction, state: State) {
    super(300);
  }
  animate(): void {
    console.log('Doing second stuff');
  }
}

export class ShadowBoltAnimation extends GameAnimation {
  constructor(action: CastSpellAction, state: State) {
    super(300);
  }
  animate(): void {
    console.log('Doing third stuff');
  }
}

export class StubEnemyAnimation extends GameAnimation {
  constructor(action: EnemyAction, state: State) {
    super(500);
  }
  animate(): void {
    console.log('Enemy attacks');
  }
}

export class StubEnemyAnimation2 extends GameAnimation {
  constructor(action: EnemyAction, state: State) {
    super(500);
  }
  animate(): void {
    console.log('Enemy attacks 2');
  }
}
