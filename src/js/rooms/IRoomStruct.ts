/**
 * Defines a Room metadata structure.
 */
export interface IRoomStruct {
  /**
   * Room available doors.
   */
  roomDirections: number[];
  /**
   * Room tile number.
   */
  roomTileNumber: number;
  /**
   * Door tilemap.
   */
  map: number[][];
}
