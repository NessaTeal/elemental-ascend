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

export function getEnemyPosition(index: number): { x: number; y: number } {
  const enemy = document.getElementById(`enemy-${index}`);

  if (!enemy) {
    throw Error("Trying to make animation with player which doesn't exist.");
  }

  return getObjectPosition(enemy);
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
