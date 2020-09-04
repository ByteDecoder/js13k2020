import { Sprite } from 'kontra';
import { gameScale, blockSize } from '../gameGlobals';
import Game from '../gameEngine/game';

/**
 * Creates a wall prefab.
 * @param x
 * @param y
 */
const createWall = (x: number, y: number): Sprite =>
  Sprite({
    x: x * gameScale,
    y: y * gameScale,
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        0,
        0,
        blockSize,
        blockSize,
        0,
        0,
        blockSize * gameScale,
        blockSize * gameScale
      );
    }
  });

export default createWall;
