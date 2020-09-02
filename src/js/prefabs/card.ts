import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameGlobals';

/**
 * Creates a 404 Card prefab.
 * @param x
 * @param y
 * @param scale
 */
const createCard = (x: number, y: number): Sprite =>
  Sprite({
    type: 'card',
    x: x * gameScale,
    y: y * gameScale,
    color: 'grey',
    width: blockSize * gameScale,
    height: blockSize * gameScale
  });

export default createCard;
