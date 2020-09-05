import roomTemplates from './roomTemplates';
import getRandomInt from '../lib/mathUtils';
import { RoomStruct, bRoom, lRoom, tRoom, rRoom } from './roomTypes';

/**
 * Generate the next room based on the direction provided.
 *
 * @param openingDirection
 * 1 -> need bottom door
 * 2 -> need left door
 * 3 -> need top door
 * 4 -> need right door
 * 5 -> need bottom door clossed room
 * 6 -> need left door clossed room
 * 7 -> need top door clossed room
 * 8 -> need right door, cloosed rom
 */
const spawn = (openingDirection: number): RoomStruct => {
  let randomRoom = 0;
  let nextRoom = null;

  switch (openingDirection) {
    case 1:
      // Need to spawn a room with a BOTTOM door
      randomRoom = getRandomInt(0, roomTemplates.bottomRooms.length - 1);
      nextRoom = roomTemplates.bottomRooms[randomRoom];
      break;
    case 2:
      // Need to spawn a room with a LEFT door
      randomRoom = getRandomInt(0, roomTemplates.leftRooms.length - 1);
      nextRoom = roomTemplates.leftRooms[randomRoom];
      break;
    case 3:
      // Need to spawn a room with TOP door
      randomRoom = getRandomInt(0, roomTemplates.topRooms.length - 1);
      nextRoom = roomTemplates.topRooms[randomRoom];
      break;
    case 4:
      // Need to spwan a room with RIGHT door
      randomRoom = getRandomInt(0, roomTemplates.rightRooms.length - 1);
      nextRoom = roomTemplates.rightRooms[randomRoom];
      break;
    case 5:
      // Need to spwan a room with BOTTON door and closed
      nextRoom = bRoom;
      break;
    case 6:
      // Need to spwan a room with LEFT door and closed
      nextRoom = lRoom;
      break;
    case 7:
      // Need to spwan a room with TOP door and closed
      nextRoom = tRoom;
      break;
    case 8:
      // Need to spwan a room with RIGHT door and closed
      nextRoom = rRoom;
      break;
    default:
      break;
  }

  return nextRoom;
};

export default { spawn };
