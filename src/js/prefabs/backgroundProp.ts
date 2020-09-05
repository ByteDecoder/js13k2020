import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameEngine/gameGlobals';
import Game from '../gameEngine/game';

/**
 * Creates a 404 Card prefab.
 * @param x
 * @param y
 * @param scale
 */
const createBackgroundProp = (x: number, y: number, variant: number): Sprite =>
  Sprite({
    type: 'backgroundProp',
    x: x * gameScale,
    y: y * gameScale,
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        variant,
        8,
        blockSize,
        blockSize,
        0,
        0,
        blockSize * gameScale,
        blockSize * gameScale
      );
    }
  });

export default createBackgroundProp;
