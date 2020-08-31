import roomTemplates from './roomTemplates';
import { IRoomStruct } from './IRoomStruct';
import mathUtils from '../lib/mathUtils';

/**
 * Generate the next room based on the direction provided.
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
    randomRoom = mathUtils.getRandomInt(0, roomTemplates.bottomRooms.length - 1);
    nextRoom = roomTemplates.bottomRooms[randomRoom];
  } else if (openingDirection === 2) {
    // Need to spawn a room with a LEFT door
    randomRoom = mathUtils.getRandomInt(0, roomTemplates.leftRooms.length - 1);
    nextRoom = roomTemplates.leftRooms[randomRoom];
  } else if (openingDirection === 3) {
    // Need to spawn a room with TOP door
    randomRoom = mathUtils.getRandomInt(0, roomTemplates.topRooms.length - 1);
    nextRoom = roomTemplates.topRooms[randomRoom];
  } else if (openingDirection === 4) {
    // Need to spwan a room with RIGHT door
    randomRoom = mathUtils.getRandomInt(0, roomTemplates.rightRooms.length - 1);
    nextRoom = roomTemplates.rightRooms[randomRoom];
  }

  return nextRoom;
};

export default { spawn };
