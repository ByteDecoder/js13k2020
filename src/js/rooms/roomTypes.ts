/**
 * Map tile definition
 * 0 => open spot
 * 1 => wall
 * 2 => cannot render anything there. Clean path
 */

/**
 * Defines a Room metadata structure.
 */
export interface RoomStruct {
  /**
   * Room available doors.
   */
  roomDirections: number[];
  /**
   * Room tile number.
   */
  roomTileNumber: number;
  /**
   * Room width.
   */
  width: number;
  /**
   * Room height.
   */
  height: number;
  /**
   * Door tilemap.
   */
  map: number[][];
}

/**
 * Entry room.
 */
export const entryRoom: RoomStruct = {
  roomDirections: [1, 2, 3, 4],
  roomTileNumber: 10,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1]
  ]
};

/**
 * Bottom door room.
 */
const bRoom: RoomStruct = {
  roomDirections: [],
  roomTileNumber: 11,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1]
  ]
};

/**
 * Left door room.
 */
const lRoom: RoomStruct = {
  roomDirections: [],
  roomTileNumber: 12,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Left, Right door room.
 */
const lrRoom: RoomStruct = {
  roomDirections: [2, 4],
  roomTileNumber: 13,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Right door room.
 */
const rRoom: RoomStruct = {
  roomDirections: [],
  roomTileNumber: 14,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Bottom, Right door room.
 */
const brRoom: RoomStruct = {
  roomDirections: [2, 3],
  roomTileNumber: 15,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1]
  ]
};

/**
 * Top door room.
 */
const tRoom: RoomStruct = {
  roomDirections: [],
  roomTileNumber: 16,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Top, Bottom door room.
 */
const tbRoom: RoomStruct = {
  roomDirections: [1, 3],
  roomTileNumber: 17,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1]
  ]
};

/**
 * Left, Right door room.
 */
const ltRoom: RoomStruct = {
  roomDirections: [1, 4],
  roomTileNumber: 18,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Top, Right door room.
 */
const trRoom: RoomStruct = {
  roomDirections: [1, 2],
  roomTileNumber: 19,
  width: 12,
  height: 12,
  map: [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

/**
 * Initialize Room dictionary container.
 */
const initializateRoomContainer = () => {
  const container = new Map<number, RoomStruct>();
  container.set(entryRoom.roomTileNumber, entryRoom);
  container.set(bRoom.roomTileNumber, bRoom);
  container.set(lRoom.roomTileNumber, lRoom);
  container.set(lrRoom.roomTileNumber, lrRoom);
  container.set(rRoom.roomTileNumber, rRoom);
  container.set(brRoom.roomTileNumber, brRoom);
  container.set(tRoom.roomTileNumber, tRoom);
  container.set(tbRoom.roomTileNumber, tbRoom);
  container.set(ltRoom.roomTileNumber, ltRoom);
  container.set(trRoom.roomTileNumber, trRoom);

  return container;
};

/**
 * Dictionary that contains room data index by roomTileNumber
 */
export const roomContainer = initializateRoomContainer();

export default {
  entryRoom,
  bRoom,
  lRoom,
  lrRoom,
  rRoom,
  brRoom,
  tRoom,
  tbRoom,
  ltRoom,
  trRoom
};
