import roomTypes from './roomTypes';

/**
 * Rooms with bottom doors.
 */
const bottomRooms = [roomTypes.bRoom, roomTypes.brRoom, roomTypes.tbRoom];
/**
 * Rooms with top doors.
 */
const topRooms = [roomTypes.ltRoom, roomTypes.tRoom, roomTypes.tbRoom, roomTypes.trRoom];
/**
 * Rooms with left doors.
 */
const leftRooms = [roomTypes.lRoom, roomTypes.lrRoom, roomTypes.ltRoom];
/**
 * Rooms with right doors.
 */
const rightRooms = [roomTypes.brRoom, roomTypes.lrRoom, roomTypes.rRoom, roomTypes.trRoom];

export default {
  bottomRooms,
  topRooms,
  leftRooms,
  rightRooms
};
