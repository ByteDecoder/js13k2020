import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameGlobals';
import Game from '../gameEngine/game';

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
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    radius: (blockSize * gameScale) / 2,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        8,
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

export default createCard;
