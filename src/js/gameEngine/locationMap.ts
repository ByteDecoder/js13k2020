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
export const prefabTilePosition = (prefab: Sprite): Position => {
  const x = Math.round(prefab.x / gameScale / blockSize);
  const y = Math.round(prefab.y / gameScale / blockSize);

  return { x, y };
};

/**
 * Checks if the Tile in the desired position is walkable by the player.
 * @param position tile position target.
 * @param tileMap tilemap definition.
 */
export const tileIsWalkable = (position: Position, tileMap: number[][]): boolean => {
  return tileMap[position.y][position.x] === 0 || tileMap[position.y][position.x] === 2;
};
