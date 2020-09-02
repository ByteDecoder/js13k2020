import { Sprite } from 'kontra';
import { blockSize } from '../gameGlobals';
import createWall from '../prefabs/wall';
import { worldHeightSize, worldWidthSize } from './worldGenerator';
import { roomContainer, entryRoom } from '../rooms/roomTypes';
import getRandomInt from '../lib/mathUtils';
import createTimer from '../prefabs/timer';

/**
 * Creates full detaisled map with props sprites
 *
 * @param worldMap
 * @param maxTimersPerRoom
 * @param timerProbability
 */
const create = (
  worldMap: number[][],
  maxTimersPerRoom: number,
  timerProbability: number
): { levelMapSprites: Sprite[]; worldFullMap: number[][]; timerCollectibles: Sprite[] } => {
  const levelMapSprites = [];
  const timerCollectibles = [];
  const worldFullMap = Array(entryRoom.height * worldHeightSize)
    .fill(0)
    .map(() => Array(entryRoom.width * worldWidthSize).fill(0));

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
            if (worldFullMap[yLevelMap][xLevelMap] === 1) {
              const baseX = xLevelMap * blockSize;
              const baseY = yLevelMap * blockSize;
              const wall = createWall(baseX, baseY);
              levelMapSprites.push(wall);
            } else if (totalTimers < maxTimersPerRoom) {
              const chanceTimerCollectible = getRandomInt(0, timerProbability);
              if (chanceTimerCollectible === 5) {
                const baseX = xLevelMap * blockSize;
                const baseY = yLevelMap * blockSize;
                const timer = createTimer(baseX, baseY);
                totalTimers += 1;
                timerCollectibles.push(timer);
              }
            }
          }
        }
      }
    }
  }
  return { levelMapSprites, worldFullMap, timerCollectibles };
};

export default { create };
