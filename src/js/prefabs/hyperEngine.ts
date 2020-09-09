import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameEngine/gameGlobals';
import Game from '../gameEngine/game';

/**
 * Creates a HyperEngine prefab.
 * @param x
 * @param y
 * @param scale
 */
const createHyperEngine = (x: number, y: number): Sprite =>
  Sprite({
    type: 'hyperEngine',
    x: x * gameScale,
    y: y * gameScale,
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    radius: (blockSize * gameScale) / 2,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        0,
        16,
        blockSize,
        blockSize,
        0,
        0,
        blockSize * gameScale,
        blockSize * gameScale
      );
    }
  });

export default createHyperEngine;
