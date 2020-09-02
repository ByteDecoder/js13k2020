import { Sprite } from 'kontra';
import { blockSize } from '../gameGlobals';

/**
 * Creates a wall prefab.
 * @param x
 * @param y
 * @param scale
 */
const createWall = (x: number, y: number, scale = 1): Sprite =>
  Sprite({
    x: x * scale,
    y: y * scale,
    color: 'green',
    width: blockSize * scale,
    height: blockSize * scale,
    collitionIdx: `wall_${x}_${y}`
  });

export default createWall;
