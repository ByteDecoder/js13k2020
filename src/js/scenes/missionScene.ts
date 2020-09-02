import { keyPressed } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator, { MapGeneratorOptions } from '../generators/levelMapGenerator';
import createSubmarine from '../prefabs/submarine';
import { createScene, IGameScene } from './gameScene';
import { gameScale, blockSize } from '../gameGlobals';
import Game from '../gameEngine/game';
import { createText } from '../utils/textUtil';

/**
 * Create the playing level scene.
 */
const createMissionScene = (): IGameScene => {
  /**
   * Starting player time.
   */
  let playerTime = 15;

  /**
   * Number of secords being passed to reduce player time.
   */
  const playerTimeRateConsumption = 1;

  /**
   * Random generated world map.
   */
  const worldMap = worldGenerator.create();

  /**
   * Maop generation options.
   */
  const mapOptions: MapGeneratorOptions = {
    maxTimersPerRoom: 3,
    timerProbability: 150,
    maxCardsPerLevel: 6,
    cardProbability: 300,
    maxMinesPerRoom: 10,
    mineProbability: 70
  };

  /**
   * LevelMapSprites and worldFullMap
   */
  const {
    levelMapSprites,
    worldFullMap,
    timerCollectibles,
    cardsCollectibles,
    minesEnemies
  } = levelMapGenerator.create(worldMap, mapOptions);

  /**
   * Submarine player
   */
  const submarine = createSubmarine();

  // eslint-disable-next-line no-console
  // console.log(worldMap);
  // eslint-disable-next-line no-console
  // console.log(worldFullMap);

  let deltaTime = 0;
  const collectedCards = 0;

  const missionText = createText('MISSION 1', { x: 700, y: 50 }, 24, 'right');
  const timerText = createText(playerTime.toString(), { x: 400, y: 50 }, 64);
  const cardsProgressText = createText(
    `Cards collected: ${collectedCards} / ${cardsCollectibles.length}`,
    { x: 600, y: 570 },
    24,
    'right'
  );

  function update(dt: number) {
    deltaTime += dt;

    if (deltaTime >= playerTimeRateConsumption) {
      deltaTime = 0;
      if (playerTime >= 1) {
        playerTime -= 1;
        timerText.text = playerTime.toString();
      } else {
        Game.getInstance().gameOver();
      }
    }

    if (keyPressed('esc')) {
      Game.getInstance().gameMenu();
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
    props: [
      submarine,
      ...levelMapSprites,
      ...timerCollectibles,
      ...cardsCollectibles,
      ...minesEnemies
    ],
    cameraLookTarget: submarine,
    messages: [timerText, missionText, cardsProgressText]
  });
};

export default createMissionScene;
