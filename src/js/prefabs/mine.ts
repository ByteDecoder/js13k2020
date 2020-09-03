import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameGlobals';

/**
 * Creates a 404 Card prefab.
 * @param x
 * @param y
 * @param scale
 */
const createMine = (x: number, y: number): Sprite =>
  Sprite({
    type: 'mine',
    x: x * gameScale,
    y: y * gameScale,
    color: 'red',
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    radius: blockSize / 2
  });

export default createMine;
