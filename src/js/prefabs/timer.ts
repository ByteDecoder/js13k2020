import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameEngine/gameGlobals';
import { defaultTimerRechargeValue } from '../gameEngine/gameBalanceOptions';

/**
 * Creates a Timer prefab.
 * @param x
 * @param y
 * @param scale
 */
const createTimer = (x: number, y: number): Sprite =>
  Sprite({
    type: 'timer',
    rechargeValue: defaultTimerRechargeValue,
    x: x * gameScale,
    y: y * gameScale,
    radius: (blockSize * gameScale) / 2,
    anchor: { x: 0, y: 0 },
    render() {
      this.context.strokeStyle = 'white';
      this.context.beginPath(); // start drawing a shape
      this.context.arc(21, 21, this.radius, 0, Math.PI * 2);
      this.context.stroke(); // outline the circle
    }
  });

export default createTimer;
