import anime from 'animejs';

import {
  GameAnimation,
  getEnemyPosition,
  getPlayerPosition,
  getScene,
} from '.';

export class FireballAnimation implements GameAnimation {
  target: string;

  constructor(target: string) {
    this.target = target;
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
  targets: [string, string | null];

  constructor(targets: [string, string | null]) {
    this.targets = targets;
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
  target: string;

  constructor(target: string) {
    this.target = target;
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
      duration: 350,
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}
