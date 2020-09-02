import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameGlobals';

/**
 * Creates a 404 Card prefab.
 * @param x
 * @param y
 * @param scale
 */
const createTimer = (x: number, y: number): Sprite =>
  Sprite({
    type: 'timer',
    x: x * gameScale,
    y: y * gameScale,
    radius: blockSize / 2,
    render() {
      this.context.strokeStyle = 'white';
      this.context.beginPath(); // start drawing a shape
      this.context.arc(blockSize / 2, blockSize / 2, this.radius, 0, Math.PI * 2);
      this.context.stroke(); // outline the circle
    }
  });

export default createTimer;