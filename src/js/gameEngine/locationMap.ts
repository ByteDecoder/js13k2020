import { Sprite } from 'kontra';
import { gameScale, blockSize } from '../gameGlobals';

/**
 * Represents a x,y point.
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Map the player postion in a grid world scale.
 * @param prefab sprite to be mapped
 */
export const prefabPosition = (prefab: Sprite): Position => {
  const x = Math.ceil(prefab.x / gameScale / blockSize);
  const y = Math.ceil(prefab.y / gameScale / blockSize);

  return { x, y };
};

/**
 * Checks if the Tile in the desired position is walkable by the player.
 * @param position
 * @param tileMap
 */
export const tileIsWalkable = (position: Position, tileMap: number[][]): boolean => {
  return tileMap[position.y][position.x] === 0 || tileMap[position.y][position.x] === 2;
};
