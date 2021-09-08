export type GameAnimation = {
  animate(): Promise<void>;
};

export function getPlayerPosition(): { x: number; y: number } {
  const player = document.getElementById('player');

  if (!player) {
    throw Error("Trying to make animation with player which doesn't exist.");
  }

  return getObjectPosition(player);
}

export function getEnemy(id: string): HTMLElement {
  const enemy = document.getElementById(id);

  if (!enemy) {
    throw Error("Trying to make animation with player which doesn't exist.");
  }

  return enemy;
}

export function getEnemyPosition(id: string): { x: number; y: number } {
  return getObjectPosition(getEnemy(id));
}

function getObjectPosition(element: HTMLElement): { x: number; y: number } {
  return {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
  };
}

export function getScene(): HTMLElement {
  const scene = document.getElementById('scene');

  if (!scene) {
    throw Error("Trying to make animation with player which doesn't exist.");
  }

  return scene;
}
