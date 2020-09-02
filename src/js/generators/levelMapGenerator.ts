import { Sprite } from 'kontra';
import { gameScale, blockSize } from '../gameGlobals';
import createWall from '../prefabs/wall';
import { worldHeightSize, worldWidthSize } from './worldGenerator';
import { roomContainer, entryRoom } from '../rooms/roomTypes';

/**
 * Creates full detaisled map with props sprites
 * @param worldMap
 */
const create = (worldMap: number[][]): { levelMapSprites: Sprite[]; worldFullMap: number[][] } => {
  const level = [];
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
        for (let yLevelMap = startingRow; yLevelMap < endingRow; yLevelMap += 1) {
          for (let xLevelMap = startingCol; xLevelMap < endingCol; xLevelMap += 1) {
            if (worldFullMap[yLevelMap][xLevelMap] === 1) {
              const baseX = xLevelMap * blockSize;
              const baseY = yLevelMap * blockSize;
              const wallSprite = createWall(baseX, baseY, gameScale);
              level.push(wallSprite);
            }
          }
        }
      }
    }
  }
  return { levelMapSprites: level, worldFullMap };
};

export default { create };
