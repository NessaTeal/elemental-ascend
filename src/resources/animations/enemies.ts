import anime from 'animejs';

import {
  GameAnimation,
  getEnemy,
  getEnemyPosition,
  getPlayerPosition,
  getScene,
} from '.';

export class GenericEnemyAttackAnimation implements GameAnimation {
  enemy: string;

  constructor(enemy: string) {
    this.enemy = enemy;
  }

  animate(): Promise<void> {
    const div = document.createElement('DIV');
    const { x, y } = getEnemyPosition(this.enemy);
    div.style.backgroundColor = 'blue';
    div.style.height = '30px';
    div.style.width = '30px';
    div.style.position = 'absolute';
    div.style.top = y - 15 + 'px';
    div.style.left = x - 15 + 'px';
    const { x: playerX } = getPlayerPosition();
    const xDiff = playerX - x;
    getScene().appendChild(div);

    const animation = anime({
      targets: div,
      translateX: xDiff,
      easing: 'easeInCubic',
      duration: 300,
      translateY: () => anime.random(-20, 100),
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}

export class GenericEnemyHealAnimation implements GameAnimation {
  enemy: string;

  constructor(enemy: string) {
    this.enemy = enemy;
  }

  animate(): Promise<void> {
    const div = document.createElement('DIV');
    const { x, y } = getEnemyPosition(this.enemy);
    div.style.backgroundColor = 'cyan';
    div.style.height = '30px';
    div.style.width = '30px';
    div.style.position = 'absolute';
    div.style.top = y - 15 + 'px';
    div.style.left = x - 15 + 'px';
    getScene().appendChild(div);

    const animation = anime({
      targets: div,
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      easing: 'linear',
      duration: 300,
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}

export class EnemyDiesAnimation implements GameAnimation {
  enemy: string;

  constructor(enemy: string) {
    this.enemy = enemy;
  }

  animate(): Promise<void> {
    const enemy = getEnemy(this.enemy);

    const animation = anime({
      targets: enemy,
      opacity: 0,
      easing: 'easeOutCubic',
      duration: 200,
    });

    return animation.finished;
  }
}
