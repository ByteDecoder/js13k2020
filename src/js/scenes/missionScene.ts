import { keyPressed, Sprite } from 'kontra';
import worldGenerator from '../generators/worldGenerator';
import levelMapGenerator from '../generators/levelMapGenerator';
import createPlayer from '../prefabs/player';
import { createScene, IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import { createText } from '../utils/textUtil';
import { prefabTilePosition, tileIsWalkable } from '../gameEngine/locationMap';
import soundFx from '../sounds/soundBank';
import {
  defaultPlayerOptions,
  defaultHyperEngineOptions,
  defaultMapGeneratorOptions
} from '../gameEngine/gameBalanceOptions';
import { isTimeEnabled, endgameTotalMissionCompleted } from '../gameEngine/gameGlobals';

/**
 * Create the playing level scene.
 */
const createMissionScene = (): IGameScene => {
  /**
   * Submarine player
   */
  const player = createPlayer();
  const playerOptions = defaultPlayerOptions();
  const hyperEngineOptions = defaultHyperEngineOptions();

  /**
   * Random generated world map.
   */
  const worldMap = worldGenerator.create();

  /**
   * Maop generation options.
   */
  const mapOptions = defaultMapGeneratorOptions();

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

  /**
   * Return the HyperEngine status.
   */
  const hyperEngineStatus = (): string => {
    if (hyperEngineOptions.hyperEngineEnabled) {
      return 'IN USE';
    }
    return hyperEngineOptions.isHyperEngineReady ? 'READY' : 'NOT READY';
  };

  let deltaTime = 0;
  let sonarDeltaTime = 0;
  let hyperEngineDeltaTime = 0;
  let collectedCards = 0;
  let stopLogic = false;

  const missionText = createText(
    `MISSION ${Game.getInstance().missionCount}`,
    { x: 700, y: 50 },
    24,
    'right'
  );
  const timerText = createText(playerOptions.playerTime.toString(), { x: 400, y: 50 }, 64);
  const cardsProgressText = createText(
    `404 Cards: ${collectedCards} / ${cardsCollectibles.length}`,
    { x: 650, y: 570 },
    24,
    'right'
  );

  const hyperEngineText = createText(
    `HyperEngine(${hyperEngineOptions.hyperEngineCharges}) ${hyperEngineStatus()}`,
    { x: 200, y: 570 },
    24,
    'left'
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

  /**
   * Submarine sonar sound.
   * @param dt delta time
   */
  const submarineSonar = (dt: number) => {
    sonarDeltaTime += dt;
    if (sonarDeltaTime >= playerOptions.sonarTimeRate) {
      sonarDeltaTime = 0;
      window.zzfx(...soundFx.submarineSonar);
    }
  };

  /**
   * Hyper Engine mechanic logic.
   * @param dt delta time
   */
  const hyperEngineState = (dt: number) => {
    if (!hyperEngineOptions.isHyperEngineReady || hyperEngineOptions.hyperEngineEnabled) {
      hyperEngineDeltaTime += dt;
    }

    if (
      hyperEngineDeltaTime >= hyperEngineOptions.hyperEngineRechargeTime &&
      !hyperEngineOptions.isHyperEngineReady
    ) {
      hyperEngineDeltaTime = 0;
      hyperEngineOptions.isHyperEngineReady = true;
    } else if (
      hyperEngineDeltaTime >= hyperEngineOptions.hyperEngineDurationTime &&
      hyperEngineOptions.hyperEngineEnabled
    ) {
      hyperEngineDeltaTime = 0;
      hyperEngineOptions.hyperEngineEnabled = false;
      hyperEngineOptions.isHyperEngineReady = false;
    }

    if (
      keyPressed('space') &&
      hyperEngineOptions.isHyperEngineReady &&
      !hyperEngineOptions.hyperEngineEnabled &&
      hyperEngineOptions.hyperEngineCharges > 0
    ) {
      hyperEngineOptions.hyperEngineCharges -= 1;
      hyperEngineOptions.hyperEngineEnabled = true;
    }

    hyperEngineText.text = `HyperEngine(${
      hyperEngineOptions.hyperEngineCharges
    }) ${hyperEngineStatus()}`;
  };

  /**
   * Player movement logic in the level map.
   */
  const submarineMovement = () => {
    // Mapping player postion for the collision layer.
    const { x, y } = prefabTilePosition(player);

    const movementFactor = hyperEngineOptions.hyperEngineEnabled
      ? hyperEngineOptions.hyperEngineVelocity
      : playerOptions.playerMovementSpeed;

    if (keyPressed('up') || keyPressed('w')) {
      if (tileIsWalkable({ x, y: y - 1 }, worldFullMap)) {
        player.y -= movementFactor;
      }
    }

    if (keyPressed('down') || keyPressed('s')) {
      if (tileIsWalkable({ x, y: y + 1 }, worldFullMap)) {
        player.y += movementFactor;
      }
    }

    if (keyPressed('right') || keyPressed('d')) {
      if (tileIsWalkable({ x: x + 1, y }, worldFullMap)) {
        player.x += movementFactor;
      }
    }

    if (keyPressed('left') || keyPressed('a')) {
      if (tileIsWalkable({ x: x - 1, y }, worldFullMap)) {
        player.x -= movementFactor;
      }
    }
  };

  /**
   * Determine if the game ends when the time is over.
   * @param dt delta time
   */
  const gameTimeUpdate = (dt: number) => {
    if (!isTimeEnabled) return;

    deltaTime += dt;
    if (deltaTime >= playerOptions.playerTimeRateConsumption) {
      deltaTime = 0;
      if (playerOptions.playerTime >= 1) {
        playerOptions.playerTime -= 1;
        timerText.text = playerOptions.playerTime.toString();
      } else {
        gameOver();
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

    submarineSonar(dt);
    hyperEngineState(dt);
    submarineMovement();

    if (keyPressed('esc')) {
      finalizePlaySession();
      Game.getInstance().gameMenu();
    }

    // Check player collitions with other game entities
    gameEntityCollitions(timerCollectibles, (timer) => {
      window.zzfx(...soundFx.pickup);
      playerOptions.playerTime += timer.rechargeValue;
      timerText.text = playerOptions.playerTime.toString();
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
      Game.getInstance().missionCount += 1;
      if (endgameTotalMissionCompleted < Game.getInstance().missionCount) {
        Game.getInstance().missionCompleted();
      } else {
        Game.getInstance().gameEnding();
      }
    }

    gameTimeUpdate(dt);
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
    messages: [timerText, missionText, cardsProgressText, hyperEngineText],
    update(dt) {
      sceneUpdate(dt);
    }
  });
};

export default createMissionScene;
