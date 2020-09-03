import { keyPressed } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator, { MapGeneratorOptions } from '../generators/levelMapGenerator';
import createSubmarine from '../prefabs/submarine';
import { createScene, IGameScene, SceneProps } from './gameScene';
import Game from '../gameEngine/game';
import { createText } from '../utils/textUtil';
import { prefabTilePosition, tileIsWalkable } from '../gameEngine/locationMap';

/**
 * Create the playing level scene.
 */
const createMissionScene = (): IGameScene => {
  /**
   * Starting player time.
   */
  let playerTime = 15;

  /**
   * Player movement speed.
   */
  const playerMovementSpeed = 2;

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
    maxMinesPerRoom: 20,
    mineProbability: 70
  };

  /**
   * LevelMapSprites and worldFullMap
   */
  let {
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
    `404 Cards collected: ${collectedCards} / ${cardsCollectibles.length}`,
    { x: 580, y: 570 },
    24,
    'right'
  );

  function sceneUpdate(dt: number) {
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
      levelMapSprites = [];
      worldFullMap = [];
      timerCollectibles = [];
      cardsCollectibles = [];
      minesEnemies = [];
      Game.getInstance().gameMenu();
    }

    // Mapping player postion for the collision layer.
    const { x, y } = prefabTilePosition(submarine);

    if (keyPressed('up')) {
      if (tileIsWalkable({ x, y: y - 1 }, worldFullMap)) {
        submarine.y -= playerMovementSpeed;
      }
    }

    if (keyPressed('down')) {
      if (tileIsWalkable({ x, y: y + 1 }, worldFullMap)) {
        submarine.y += playerMovementSpeed;
      }
    }

    if (keyPressed('right')) {
      if (tileIsWalkable({ x: x + 1, y }, worldFullMap)) {
        submarine.x += playerMovementSpeed;
      }
    }

    if (keyPressed('left')) {
      if (tileIsWalkable({ x: x - 1, y }, worldFullMap)) {
        submarine.x -= playerMovementSpeed;
      }
    }
  }

  return createScene({
    cameraLookTarget: submarine,
    sceneProps: {
      player: submarine,
      walls: levelMapSprites,
      timers: timerCollectibles,
      cards: cardsCollectibles,
      mines: minesEnemies
    },
    messages: [timerText, missionText, cardsProgressText],
    update(dt) {
      sceneUpdate(dt);
    },
    render(sceneProps: SceneProps) {
      console.log('render here');
      sceneProps.walls.forEach((wall) => wall.render());
      sceneProps.mines.forEach((mine) => mine.render());
      sceneProps.cards.forEach((card) => card.render());
      sceneProps.timers.forEach((timer) => timer.render());
      sceneProps.player.render();
    }
  });
};

export default createMissionScene;
