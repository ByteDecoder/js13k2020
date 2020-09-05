import { keyPressed, Sprite } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator, { MapGeneratorOptions } from '../generators/levelMapGenerator';
import createPlayer from '../prefabs/player';
import { createScene, IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import { createText } from '../utils/textUtil';
import { prefabTilePosition, tileIsWalkable } from '../gameEngine/locationMap';
import soundFx from '../sounds/soundBank';

/**
 * Create the playing level scene.
 */
const createMissionScene = (): IGameScene => {
  /**
   * Submarine player
   */
  const player = createPlayer();
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
  const playerTimeRateConsumption = 2;

  /**
   * Time to play the submarine sonar sound.
   */
  const sonarTimeRate = 2;

  /**
   * Random generated world map.
   */
  const worldMap = worldGenerator.create();

  /**
   * Maop generation options.
   */
  const mapOptions: MapGeneratorOptions = {
    maxTimersPerRoom: 3,
    timerProbability: 100,
    maxCardsPerLevel: 10,
    cardProbability: 200,
    maxMinesPerRoom: 20,
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
    minesEnemies,
    backgroundProps
  } = levelMapGenerator.create(worldMap, mapOptions);

  // eslint-disable-next-line no-console
  // console.log(worldMap);
  // eslint-disable-next-line no-console
  // console.log(worldFullMap);

  let deltaTime = 0;
  let sonarDeltaTime = 0;
  let collectedCards = 0;
  let stopLogic = false;

  const missionText = createText(
    `MISSION ${Game.getInstance().missionCount}`,
    { x: 700, y: 50 },
    24,
    'right'
  );
  const timerText = createText(playerTime.toString(), { x: 400, y: 50 }, 64);
  const cardsProgressText = createText(
    `404 Cards: ${collectedCards} / ${cardsCollectibles.length}`,
    { x: 650, y: 570 },
    24,
    'right'
  );

  /**
   * Check if the player collide with other game entity collection.
   * @param entityCollection
   * @param actionCallback
   */
  const gameEntityCollitions = (
    entityCollection: Sprite[],
    actionCallback: (entity: Sprite) => void
  ) => {
    for (let index = 0; index < entityCollection.length; index += 1) {
      const entity = entityCollection[index];

      if (entity.ttl > 0) {
        // Circle vs circle collision detection
        const dx = entity.x - player.x;
        const dy = entity.y - player.y;

        if (Math.hypot(dx, dy) < entity.radius + player.radius) {
          entity.ttl = 0;
          actionCallback(entity);
          break;
        }
      }
    }

    return entityCollection.filter((entity) => entity.isAlive());
  };

  const finalizePlaySession = () => {
    stopLogic = true;
  };

  const gameOver = () => {
    finalizePlaySession();
    Game.getInstance().gameOver();
  };

  const submarineSonar = (dt: number) => {
    sonarDeltaTime += dt;
    if (sonarDeltaTime >= sonarTimeRate) {
      sonarDeltaTime = 0;
      window.zzfx(...soundFx.submarineSonar);
    }
  };

  const submarineMovement = () => {
    // Mapping player postion for the collision layer.
    const { x, y } = prefabTilePosition(player);

    if (keyPressed('up') || keyPressed('w')) {
      if (tileIsWalkable({ x, y: y - 1 }, worldFullMap)) {
        player.y -= playerMovementSpeed;
      }
    }

    if (keyPressed('down') || keyPressed('s')) {
      if (tileIsWalkable({ x, y: y + 1 }, worldFullMap)) {
        player.y += playerMovementSpeed;
      }
    }

    if (keyPressed('right') || keyPressed('d')) {
      if (tileIsWalkable({ x: x + 1, y }, worldFullMap)) {
        player.x += playerMovementSpeed;
      }
    }

    if (keyPressed('left') || keyPressed('a')) {
      if (tileIsWalkable({ x: x - 1, y }, worldFullMap)) {
        player.x -= playerMovementSpeed;
      }
    }
  };

  /**
   * Main game logic
   * @param dt deltaTime param
   * @param gameLoop
   */
  function sceneUpdate(dt: number) {
    if (stopLogic) return;

    deltaTime += dt;

    submarineSonar(dt);
    submarineMovement();

    if (keyPressed('esc')) {
      finalizePlaySession();
      Game.getInstance().gameMenu();
    }

    // Check player collitions with other game entities
    gameEntityCollitions(timerCollectibles, (timer) => {
      window.zzfx(...soundFx.pickup);
      playerTime += timer.rechargeValue;
      timerText.text = playerTime.toString();
    });

    gameEntityCollitions(cardsCollectibles, () => {
      window.zzfx(...soundFx.card);
      collectedCards += 1;
      cardsProgressText.text = `404 Cards: ${collectedCards} / ${cardsCollectibles.length}`;
    });

    gameEntityCollitions(minesEnemies, () => {
      window.zzfx(...soundFx.explosion);
      gameOver();
    });

    if (collectedCards >= cardsCollectibles.length) {
      finalizePlaySession();
      Game.getInstance().missionCompleted();
    }

    if (deltaTime >= playerTimeRateConsumption) {
      deltaTime = 0;
      if (playerTime >= 1) {
        playerTime -= 1;
        timerText.text = playerTime.toString();
      } else {
        gameOver();
      }
    }
  }

  return createScene({
    cameraLookTarget: player,
    sceneProps: [
      ...backgroundProps,
      ...levelMapSprites,
      ...minesEnemies,
      ...timerCollectibles,
      ...cardsCollectibles,
      player
    ],
    messages: [timerText, missionText, cardsProgressText],
    update(dt) {
      sceneUpdate(dt);
    }
  });
};

export default createMissionScene;
