import roomTemplates from './roomTemplates';
import { IRoomStruct } from './IRoomStruct';

/**
 * Random number between a mix and max range.
 * @param min min value.
 * @param max max value.
 */
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate the next room based on the direction prvided.
 *
 * @param openingDirection
 * 1 -> need bottom door
 * 2 -> need left door
 * 3 -> need top door
 * 4 -> need right door
 */
const spawn = (openingDirection: number): IRoomStruct => {
  let randomRoom = 0;
  let nextRoom = null;

  if (openingDirection === 1) {
    // Need to spawn a room with a BOTTOM door
    randomRoom = getRandomInt(0, roomTemplates.bottomRooms.length);
    nextRoom = roomTemplates.bottomRooms[randomRoom];
  } else if (openingDirection === 2) {
    // Need to spawn a room with a LEFT door
    randomRoom = getRandomInt(0, roomTemplates.leftRooms.length);
    nextRoom = roomTemplates.leftRooms[randomRoom];
  } else if (openingDirection === 3) {
    // Need to spawn a room with TOP door
    randomRoom = getRandomInt(0, roomTemplates.topRooms.length);
    nextRoom = roomTemplates.topRooms[randomRoom];
  } else if (openingDirection === 4) {
    // Need to spwan a room with RIGHT door
    randomRoom = getRandomInt(0, roomTemplates.rightRooms.length);
    nextRoom = roomTemplates.rightRooms[randomRoom];
  }

  return nextRoom;
};

export default { spawn };
