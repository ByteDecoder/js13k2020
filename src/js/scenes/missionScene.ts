import { keyPressed, init, initKeys } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator from '../generators/levelMapGenerator';
import Submarine from '../submarine';
import { createScene, IGameScene } from './gameScene';
import { gameScale, blockSize } from '../gameGlobals';

init();
initKeys();

/**
 * Random generated world map.
 */
const worldMap = worldGenerator.create();

/**
 * LevelMapSprites and worldFullMap
 */
const { levelMapSprites, worldFullMap } = levelMapGenerator.create(worldMap);

/**
 * Submarine player
 */
const submarine = Submarine.create();

const props = [submarine, ...levelMapSprites];

const update = () => {
  // levelScene.lookAt(submarine);

  let positionX = Math.ceil(submarine.x / gameScale / blockSize);
  let positionY = Math.ceil(submarine.y / gameScale / blockSize);

  if (keyPressed('up')) {
    positionY = Math.ceil((submarine.y - gameScale * blockSize - 2) / gameScale / blockSize);
    if (worldFullMap[positionY][positionX] === 0) {
      submarine.y -= 2;
    }
  }

  if (keyPressed('down')) {
    positionY = Math.ceil((submarine.y + 2) / gameScale / blockSize);
    if (worldFullMap[positionY][positionX] === 0) {
      submarine.y += 2;
    }
  }

  if (keyPressed('right')) {
    positionX = Math.ceil((submarine.x + 2) / gameScale / blockSize);
    if (worldFullMap[positionY][positionX] === 0) {
      submarine.x += 2;
    }
  }

  if (keyPressed('left')) {
    positionX = Math.ceil((submarine.x - gameScale * blockSize - 2) / gameScale / blockSize);
    if (worldFullMap[positionY][positionX] === 0) {
      submarine.x -= 2;
    }
  }
};

const create = (): IGameScene => createScene({ update, props });

export default { create };
