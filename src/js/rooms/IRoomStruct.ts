/**
 * Defines a Room metadata structure.
 */
export interface IRoomStruct {
  /**
   * Room available doors.
   */
  roomDirections: number[];
  /**
   * Door tilemap.
   */
  map: number[][];
}
