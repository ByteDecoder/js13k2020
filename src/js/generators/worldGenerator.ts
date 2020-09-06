import { entryRoom } from '../rooms/roomTypes';
import roomSpawner from '../rooms/roomSpawner';
import { worldHeightSize, worldWidthSize, playerStartingPoint } from '../gameEngine/gameGlobals';

/**
 * Defines a room spawn point data structure.
 */
interface RoomSpawnPoint {
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
const createRoomSpwanPoint = (x: number, y: number, openingDirection: number): RoomSpawnPoint => {
  return { x, y, openingDirection };
};

/**
 * Creates a new random worldmap for the game session with rooms.
 */
const create = (): number[][] => {
  /**
   * Creates a new fresh world map.
   */
  const newWorld = Array(worldHeightSize)
    .fill(0)
    .map(() => Array(worldWidthSize).fill(0));

  /**
   * Generates a room path in the specfied direction on the world map.
   * @param x
   * @param y
   * @param startingDirection Direction to move
   */
  const generateRoomPath = (x: number, y: number, startingDirection: number): void => {
    const pendingRooms: RoomSpawnPoint[] = [];

    pendingRooms.push(createRoomSpwanPoint(x, y, startingDirection));

    do {
      const spawnPoint = pendingRooms.shift();
      const newRoom = roomSpawner.spawn(spawnPoint.openingDirection);

      newWorld[spawnPoint.y][spawnPoint.x] = newRoom.roomTileNumber;

      newRoom.roomDirections.forEach((direction) => {
        let newSpawnPoint: RoomSpawnPoint = null;

        switch (direction) {
          case 1:
            if (spawnPoint.y - 1 === 0) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.y - 1, 5);
            } else if (newWorld[spawnPoint.y - 1][spawnPoint.x] === 0) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.y - 1, 1);
            }
            break;
          case 2:
            if (spawnPoint.x + 1 === worldWidthSize - 1) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.x - 1, 6);
            } else if (newWorld[spawnPoint.y][spawnPoint.x + 1] === 0) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x + 1, spawnPoint.y, 2);
            }
            break;
          case 3:
            if (spawnPoint.y + 1 === worldHeightSize + 1) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.x + 1, 7);
            } else if (newWorld[spawnPoint.y + 1][spawnPoint.x] === 0) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.y + 1, 3);
            }
            break;
          case 4:
            if (spawnPoint.x - 1 === 0) {
              newSpawnPoint = createRoomSpwanPoint(spawnPoint.x, spawnPoint.x - 1, 8);
            } else if (newWorld[spawnPoint.y][spawnPoint.x - 1] === 0) {
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
  };

  newWorld[playerStartingPoint.y][playerStartingPoint.x] = entryRoom.roomTileNumber;

  generateRoomPath(playerStartingPoint.x, playerStartingPoint.y - 1, 1);
  generateRoomPath(playerStartingPoint.x + 1, playerStartingPoint.y, 2);
  generateRoomPath(playerStartingPoint.x, playerStartingPoint.y + 1, 3);
  generateRoomPath(playerStartingPoint.x - 1, playerStartingPoint.y, 4);

  return newWorld;
};

export default { create };
