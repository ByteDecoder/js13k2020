import { Sprite } from 'kontra';
import { gameScale, blockSize, playerStartingPoint as entryPoint } from '../gameEngine/gameGlobals';
import { entryRoom } from '../rooms/roomTypes';
import Game from '../gameEngine/game';
import { calulateAxisRoomPosition } from '../gameEngine/locationMap';

/**
 * Creates an instance of the submarine player.
 */
const createPlayer = (): Sprite => {
  return Sprite({
    x: calulateAxisRoomPosition(entryPoint.x, entryRoom.width),
    y: calulateAxisRoomPosition(entryPoint.y, entryRoom.height),
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
