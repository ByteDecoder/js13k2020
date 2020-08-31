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
