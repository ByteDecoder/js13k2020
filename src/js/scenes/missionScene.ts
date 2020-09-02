import { keyPressed } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator from '../generators/levelMapGenerator';
import Submarine from '../submarine';
import { createScene, IGameScene } from './gameScene';
import { gameScale, blockSize } from '../gameGlobals';
import Game from '../gameEngine/game';
import { createText } from '../utils/textUtil';

/**
 * Create the playing level scene.
 */
const createMissionScene = (): IGameScene => {
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

  // eslint-disable-next-line no-console
  // console.log(worldMap);
  // eslint-disable-next-line no-console
  // console.log(worldFullMap);

  const time = 15;

  const missionText = createText('MISSION 1', { x: 700, y: 50 }, 24, 'right');
  const timerText = createText(time.toString(), { x: 400, y: 50 }, 64);

  function update() {
    if (keyPressed('esc')) {
      Game.getInstance().stopPlaying();
    }

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
  }

  return createScene({
    update,
    props: [submarine, ...levelMapSprites],
    cameraLookTarget: submarine,
    messages: [timerText, missionText]
  });
};

export default createMissionScene;
