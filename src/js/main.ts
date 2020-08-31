import { init, GameLoop, initKeys, keyPressed, Scene } from 'kontra';
import { blockSize, gameScale } from './gameGlobals';
import worldGenerator from './generators/worldGenerator';
import levelMapGenerator from './generators/levelMapGenerator';
import Submarine from './submarine';

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

const levelScene = Scene({
  id: 'levelScene',
  children: [submarine, ...levelMapSprites]
});

console.log(worldFullMap);

const loop = GameLoop({
  update(dt) {
    levelScene.lookAt(submarine);

    let positionX = Math.ceil(submarine.x / gameScale / blockSize);
    let positionY = Math.ceil(submarine.y / gameScale / blockSize);

    if (keyPressed('up')) {
      if (worldFullMap[positionY - 1][positionX] === 0) {
        submarine.y -= 2 + dt;
      }
    }

    if (keyPressed('down')) {
      positionY = Math.ceil((submarine.y + 2) / gameScale / blockSize);
      if (worldFullMap[positionY][positionX] === 0) {
        submarine.y += 2 + dt;
      }
    }

    if (keyPressed('right')) {
      positionX = Math.ceil((submarine.x + 2) / gameScale / blockSize);
      if (worldFullMap[positionY][positionX] === 0) {
        submarine.x += 2 + dt;
      }
    }

    if (keyPressed('left')) {
      if (worldFullMap[positionY][positionX - 1] === 0) {
        submarine.x -= 2 + dt;
      }
    }
  },
  render() {
    levelScene.render();
  }
});

loop.start();
