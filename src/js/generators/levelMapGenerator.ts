import { Sprite } from 'kontra';
import createWall from '../prefabs/wall';
import { blockSize, worldHeightSize, worldWidthSize } from '../gameEngine/gameGlobals';
import { roomContainer, entryRoom } from '../rooms/roomTypes';
import getRandomInt from '../lib/mathUtils';
import createTimer from '../prefabs/timer';
import createCard from '../prefabs/card';
import createMine from '../prefabs/mine';
import createBacgroundProp from '../prefabs/backgroundProp';
import createHyperEngine from '../prefabs/hyperEngine';

export interface MapGeneratorOptions {
  /**
   * Max timer collectibles per room.
   */
  maxTimersPerRoom: number;
  /**
   * Chance to get a timer collectible in a room.
   * 200: scarce
   */
  timerProbability: number;
  /**
   * Max cards per level.
   */
  maxCardsPerLevel: number;
  /**
   * Chance to get a card collectible in a room.
   */
  cardProbability: number;
  /**
   * Max number of mines per room.
   */
  maxMinesPerRoom: number;
  /**
   * Chance to get a mine enemy in a room.
   */
  mineProbability: number;
  /**
   * Max hyper engines items per level.
   */
  hyperEnginePerLevel: number;
  /**
   * Chance to get a hyper engine per level.
   */
  hyperEngineProbability: number;
}

export interface MapGeneratorOutput {
  levelMapSprites: Sprite[];
  worldFullMap: number[][];
  timerCollectibles: Sprite[];
  cardsCollectibles: Sprite[];
  minesEnemies: Sprite[];
  backgroundProps: Sprite[];
  hyperEngineCollectibles: Sprite[];
}

/**
 * Creates full detaisled map with props sprites
 *
 * @param worldMap
 * @param maxTimersPerRoom
 * @param timerProbability
 */
const create = (
  worldMap: number[][],
  mapGeneratorOptions: MapGeneratorOptions
): MapGeneratorOutput => {
  const levelMapSprites = [];
  const timerCollectibles = [];
  const cardsCollectibles = [];
  const minesEnemies = [];
  const backgroundProps = [];
  const hyperEngineCollectibles = [];

  const worldFullMap = Array(entryRoom.height * worldHeightSize)
    .fill(0)
    .map(() => Array(entryRoom.width * worldWidthSize).fill(0));

  let totalCards = 0;
  let totalHyperEngines = 0;

  for (let y = 0; y < worldHeightSize; y += 1) {
    for (let x = 0; x < worldWidthSize; x += 1) {
      if (worldMap[y][x] !== 0) {
        const roomData = roomContainer.get(worldMap[y][x]);

        const startingRow = y * roomData.height;
        const endingRow = startingRow + roomData.height;
        const startingCol = x * roomData.width;
        const endingCol = startingCol + roomData.width;

        // Copy the room map data into the worldFullMap
        for (let yRoomData = 0; yRoomData < roomData.height; yRoomData += 1) {
          worldFullMap[startingRow + yRoomData].splice(
            startingCol,
            roomData.map[yRoomData].length,
            ...roomData.map[yRoomData]
          );
        }

        // Creating wall sprites according worldFullMap tileset.
        let totalTimers = 0;
        let totalMines = 0;

        for (let yLevelMap = startingRow; yLevelMap < endingRow; yLevelMap += 1) {
          for (let xLevelMap = startingCol; xLevelMap < endingCol; xLevelMap += 1) {
            const baseX = xLevelMap * blockSize;
            const baseY = yLevelMap * blockSize;

            if (worldFullMap[yLevelMap][xLevelMap] === 1) {
              // Rendering a wall.
              const wall = createWall(baseX, baseY);
              levelMapSprites.push(wall);
            } else if (roomData.roomTileNumber !== 10 && worldFullMap[yLevelMap][xLevelMap] === 0) {
              // If Position is used by game item, cannot render other in the same position.
              let pointUsed = false;

              // Create timers collectibles.
              if (totalTimers < mapGeneratorOptions.maxTimersPerRoom && !pointUsed) {
                const chanceCollectible = getRandomInt(0, mapGeneratorOptions.timerProbability);
                if (chanceCollectible >= 5 && chanceCollectible <= 6) {
                  const timer = createTimer(baseX, baseY);
                  totalTimers += 1;
                  pointUsed = true;
                  timerCollectibles.push(timer);
                }
              }

              // Create 404 cards collectibles.
              if (totalCards < mapGeneratorOptions.maxCardsPerLevel && !pointUsed) {
                const chanceCollectible = getRandomInt(0, mapGeneratorOptions.cardProbability);
                // We need at least 1 404 card in the game level
                if (chanceCollectible === 10 || totalCards === 0) {
                  const card = createCard(baseX, baseY);
                  totalCards += 1;
                  pointUsed = true;
                  cardsCollectibles.push(card);
                }
              }

              // Create HyperEngines collectibles.
              if (totalHyperEngines < mapGeneratorOptions.hyperEnginePerLevel && !pointUsed) {
                const chance = getRandomInt(0, mapGeneratorOptions.hyperEngineProbability);
                if (chance === 10) {
                  const hyperEngine = createHyperEngine(baseX, baseY);
                  totalHyperEngines += 1;
                  pointUsed = true;
                  hyperEngineCollectibles.push(hyperEngine);
                }
              }

              // Create mines enemies.
              if (totalMines < mapGeneratorOptions.maxMinesPerRoom && !pointUsed) {
                const chanceCollectible = getRandomInt(0, mapGeneratorOptions.mineProbability);
                if (chanceCollectible >= 5 && chanceCollectible <= 6) {
                  const mine = createMine(baseX, baseY);
                  totalMines += 1;
                  pointUsed = true;
                  minesEnemies.push(mine);
                }
              }

              // Background Props
              if (!pointUsed) {
                const chanceProp = getRandomInt(0, 7);
                if (chanceProp === 5) {
                  backgroundProps.push(
                    createBacgroundProp(baseX, baseY, Math.floor(Math.random() * 2) * 8)
                  );
                }
              }
            }
          }
        }
      }
    }
  }
  return {
    levelMapSprites,
    worldFullMap,
    timerCollectibles,
    cardsCollectibles,
    minesEnemies,
    backgroundProps,
    hyperEngineCollectibles
  };
};

export default { create };
