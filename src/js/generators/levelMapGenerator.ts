import { Sprite } from 'kontra';
import { blockSize } from '../gameGlobals';
import createWall from '../prefabs/wall';
import { worldHeightSize, worldWidthSize } from './worldGenerator';
import { roomContainer, entryRoom } from '../rooms/roomTypes';
import getRandomInt from '../lib/mathUtils';
import createTimer from '../prefabs/timer';
import createCard from '../prefabs/card';

export interface MapGeneratorOptions {
  /**
   * Max timer collectibles per room.
   */
  maxTimersPerRoom: number;
  /**
   * Chance tp get a timer collectible in a room.
   * 200: scarce
   */
  timerProbability: number;
  /**
   * Max cards per level.
   */
  maxCardsPerLevel: number;
  /**
   * Chance tp get a timer collectible in a room.
   * 200: scarce
   */
  cardProbability: number;
}

export interface MapGeneratorOutput {
  levelMapSprites: Sprite[];
  worldFullMap: number[][];
  timerCollectibles: Sprite[];
  cardsCollectibles: Sprite[];
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

  const worldFullMap = Array(entryRoom.height * worldHeightSize)
    .fill(0)
    .map(() => Array(entryRoom.width * worldWidthSize).fill(0));

  let totalCards = 0;

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
        for (let yLevelMap = startingRow; yLevelMap < endingRow; yLevelMap += 1) {
          for (let xLevelMap = startingCol; xLevelMap < endingCol; xLevelMap += 1) {
            const baseX = xLevelMap * blockSize;
            const baseY = yLevelMap * blockSize;

            if (worldFullMap[yLevelMap][xLevelMap] === 1) {
              const wall = createWall(baseX, baseY);
              levelMapSprites.push(wall);
            } else {
              if (totalTimers < mapGeneratorOptions.maxTimersPerRoom) {
                const chanceCollectible = getRandomInt(0, mapGeneratorOptions.timerProbability);
                if (chanceCollectible === 5) {
                  const timer = createTimer(baseX, baseY);
                  totalTimers += 1;
                  timerCollectibles.push(timer);
                }
              }
              if (totalCards < mapGeneratorOptions.maxCardsPerLevel) {
                const chanceCollectible = getRandomInt(0, mapGeneratorOptions.cardProbability);
                if (chanceCollectible === 10) {
                  const card = createCard(baseX, baseY);
                  totalCards += 1;
                  cardsCollectibles.push(card);
                }
              }
            }
          }
        }
      }
    }
  }
  return { levelMapSprites, worldFullMap, timerCollectibles, cardsCollectibles };
};

export default { create };
