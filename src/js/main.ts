import { init, Sprite, GameLoop, initKeys, keyPressed, Scene } from 'kontra';
import { blockSize, gameScale } from './gameGlobals';
import worldGenerator, { entryPoint } from './worldGenerator';
import { entryRoom } from './rooms/roomTypes';
import levelMapGenerator from './levelMapGenerator';

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

const submarine = Sprite({
  x: entryPoint.x * entryRoom.width * blockSize * gameScale + 128,
  y: entryPoint.y * entryRoom.height * blockSize * gameScale + 128,
  color: 'red',
  width: blockSize * gameScale,
  height: blockSize * gameScale
});

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
