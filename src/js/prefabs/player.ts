import { Sprite } from 'kontra';
import { gameScale, blockSize, playerStartingPoint as entryPoint } from '../gameEngine/gameGlobals';
import { entryRoom } from '../rooms/roomTypes';
import Game from '../gameEngine/game';

/**
 * Creates an instance of the submarine player.
 */
const createPlayer = (): Sprite => {
  return Sprite({
    x: entryPoint.x * entryRoom.width * blockSize * gameScale + blockSize * gameScale,
    y: entryPoint.y * entryRoom.height * blockSize * gameScale + blockSize * gameScale,
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    radius: (blockSize * gameScale) / 2,
    spriteSheet: Game.getInstance().spriteSheet,
    render(this: Sprite) {
      this.context.drawImage(
        this.spriteSheet,
        8,
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
};

export default createPlayer;
