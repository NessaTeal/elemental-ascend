import { State } from '../../App/context';
import anime from 'animejs';
import {
  GameAnimation,
  getPlayerPosition,
  getEnemyPosition,
  getScene,
} from '.';

export class FireballAnimation implements GameAnimation {
  target: number;
  state: State;

  constructor(target: number, state: State) {
    this.target = target;
    this.state = state;
  }
  animate(): Promise<void> {
    const div = document.createElement('DIV');
    const { x, y } = getPlayerPosition();
    div.style.backgroundColor = 'red';
    div.style.height = '30px';
    div.style.width = '30px';
    div.style.position = 'absolute';
    div.style.top = y - 15 + 'px';
    div.style.left = x - 15 + 'px';
    const { x: enemyX } = getEnemyPosition(this.target);
    const xDiff = enemyX - x;
    getScene().appendChild(div);

    const animation = anime({
      targets: div,
      translateX: xDiff,
      easing: 'easeInCubic',
      duration: 400,
      translateY: () => anime.random(-20, 100),
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}

export class LightningStrikeAnimation implements GameAnimation {
  targets: [number, number | null];
  state: State;

  constructor(targets: [number, number | null], state: State) {
    this.targets = targets;
    this.state = state;
  }
  async animate(): Promise<void> {
    const div = document.createElement('DIV');
    const { x, y } = getPlayerPosition();
    div.style.backgroundColor = 'yellow';
    div.style.height = '30px';
    div.style.width = '30px';
    div.style.position = 'absolute';
    div.style.top = y - 15 + 'px';
    div.style.left = x - 15 + 'px';
    const { x: enemyX1 } = getEnemyPosition(this.targets[0]);
    const xDiff1 = enemyX1 - x;
    getScene().appendChild(div);

    const animation1 = anime({
      targets: div,
      translateX: xDiff1,
      translateY: anime.random(-50, 50),
      easing: 'easeInCubic',
      duration: 350,
    });

    if (this.targets[1] !== null) {
      await animation1.finished;

      const { x: enemyX2 } = getEnemyPosition(this.targets[1]);
      const xDiff2 = enemyX2 - enemyX1;

      const animation2 = anime({
        targets: div,
        translateX: `+=${xDiff2}`,
        translateY: `+=${anime.random(-30, 30)}`,
        easing: 'linear',
        duration: 150,

        changeComplete: () => getScene().removeChild(div),
      });

      return animation2.finished;
    } else {
      return animation1.finished.then(() => {
        getScene().removeChild(div);
      });
    }
  }
}

export class ShadowBoltAnimation implements GameAnimation {
  target: number;
  state: State;

  constructor(target: number, state: State) {
    this.target = target;
    this.state = state;
  }
  async animate(): Promise<void> {
    const div = document.createElement('DIV');
    const { x, y } = getPlayerPosition();
    div.style.backgroundColor = 'purple';
    div.style.height = '30px';
    div.style.width = '30px';
    div.style.position = 'absolute';
    div.style.top = y - 15 + 'px';
    div.style.left = x - 15 + 'px';
    const { x: enemyX } = getEnemyPosition(this.target);
    const xDiff = enemyX - x;
    getScene().appendChild(div);

    const animation = anime({
      targets: div,
      translateX: xDiff,
      easing: 'easeOutCubic',
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}
