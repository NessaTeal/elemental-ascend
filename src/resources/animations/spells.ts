import { CastSpellAction, State } from '../../App/context';
import anime from 'animejs';
import {
  GameAnimation,
  getPlayerPosition,
  getEnemyPosition,
  getScene,
} from '.';

export class FireballAnimation implements GameAnimation {
  action: CastSpellAction;
  state: State;

  constructor(action: CastSpellAction, state: State) {
    this.action = action;
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
    const { x: enemyX } = getEnemyPosition(this.action.target[0]);
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
  action: CastSpellAction;
  state: State;

  constructor(action: CastSpellAction, state: State) {
    this.action = action;
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
    const { x: enemyX1 } = getEnemyPosition(this.action.target[0]);
    const { x: enemyX2 } = getEnemyPosition(this.action.target[1]);
    const xDiff1 = enemyX1 - x;
    const xDiff2 = enemyX2 - enemyX1;
    getScene().appendChild(div);

    const animation = anime({
      targets: div,
      keyframes: [
        {
          translateX: xDiff1,
          translateY: anime.random(-50, 50),
          easing: 'easeInCubic',
          duration: 350,
        },
        {
          translateX: `+=${xDiff2}`,
          translateY: `+=${anime.random(-30, 30)}`,
          easing: 'linear',
          duration: 150,
        },
      ],
      changeComplete: () => getScene().removeChild(div),
    });

    return animation.finished;
  }
}

export class ShadowBoltAnimation implements GameAnimation {
  action: CastSpellAction;
  state: State;

  constructor(action: CastSpellAction, state: State) {
    this.action = action;
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
    const { x: enemyX } = getEnemyPosition(this.action.target[0]);
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
