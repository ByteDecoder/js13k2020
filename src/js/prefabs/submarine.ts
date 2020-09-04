import { Sprite } from 'kontra';
import { gameScale, blockSize } from '../gameGlobals';
import { entryPoint } from '../generators/worldGenerator';
import { entryRoom } from '../rooms/roomTypes';
import Game from '../gameEngine/game';

/**
 * Creates an instance of the submarine player.
 */
export const createSubmarine = (): Sprite => {
  return Sprite({
    x: entryPoint.x * entryRoom.width * blockSize * gameScale + 16,
    y: entryPoint.y * entryRoom.height * blockSize * gameScale + 16,
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    radius: blockSize / 2,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        8,
        0,
        blockSize,
        blockSize,
        8,
        0,
        blockSize,
        blockSize
      );
    }
  });
};

export default createSubmarine;
