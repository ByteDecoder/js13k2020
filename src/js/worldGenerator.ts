import { entryRoom } from './rooms/roomTypes';
import roomSpawner from './rooms/roomSpawner';

export const worldWidthSize = 15;
export const worldHeightSize = 15;

/**
 * Initial game entry point.
 */
export const entryPoint = { x: 5, y: 5 };

/**
 * Base ocean world template
 */
const oceanWorld = Array(worldHeightSize)
  .fill(0)
  .map(() => Array(worldWidthSize).fill(0));

/**
 * Defines a room spawn point data structure.
 */
interface IRoomSpawnPoint {
  x: number;
  y: number;
  openingDirection: number;
}

/**
 * Creates a room spawn point.
 * @param x
 * @param y
 * @param openingDirection
 */
const createRoomSpwanPoint = (x: number, y: number, openingDirection: number): IRoomSpawnPoint => {
  return { x, y, openingDirection };
};

const pendingRooms: IRoomSpawnPoint[] = [];

/**
 * Creates a new random worldmap for the game session with rooms.
 */
const create = (): number[][] => {
  const newWorld = [...oceanWorld];
  newWorld[entryPoint.y][entryPoint.x] = entryRoom.roomTileNumber;

  pendingRooms.push(createRoomSpwanPoint(entryPoint.x, entryPoint.y - 1, 1));
  pendingRooms.push(createRoomSpwanPoint(entryPoint.x + 1, entryPoint.y, 2));
  pendingRooms.push(createRoomSpwanPoint(entryPoint.x, entryPoint.y + 1, 3));
  pendingRooms.push(createRoomSpwanPoint(entryPoint.x - 1, entryPoint.y, 4));

  do {
    const spawnPoint = pendingRooms.shift();
    const newRoom = roomSpawner.spawn(spawnPoint.openingDirection);

    newWorld[spawnPoint.y][spawnPoint.x] = newRoom.roomTileNumber;

    newRoom.roomDirections.forEach((direction) => {
      let newSpawnPoint: IRoomSpawnPoint = null;

      switch (direction) {
        case 1:
          if (newWorld[spawnPoint.y - 1][spawnPoint.x] === 0) {
            newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.y - 1, 1);
          }
          break;
        case 2:
          if (newWorld[spawnPoint.y][spawnPoint.x + 1] === 0) {
            newSpawnPoint = createRoomSpwanPoint(spawnPoint.x + 1, spawnPoint.y, 2);
          }
          break;
        case 3:
          if (newWorld[spawnPoint.y + 1][spawnPoint.x] === 0) {
            newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.y + 1, 3);
          }
          break;
        case 4:
          if (newWorld[spawnPoint.y][spawnPoint.x - 1] === 0) {
            newSpawnPoint = createRoomSpwanPoint(spawnPoint.x - 1, spawnPoint.y, 4);
          }
          break;
        default:
          break;
      }
      if (newSpawnPoint) {
        pendingRooms.push(newSpawnPoint);
      }
    });
  } while (pendingRooms.length !== 0);

  console.log(newWorld);
  return newWorld;
};

export default { create };
