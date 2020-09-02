import { Sprite } from 'kontra';
import { gameScale, blockSize } from '../gameGlobals';
import { entryPoint } from '../generators/worldGenerator';
import { entryRoom } from '../rooms/roomTypes';

/**
 * Creates an instance of the submarine player.
 */
export const createSubmarine = (): Sprite => {
  return Sprite({
    x: entryPoint.x * entryRoom.width * blockSize * gameScale + 128,
    y: entryPoint.y * entryRoom.height * blockSize * gameScale + 128,
    color: 'red',
    width: blockSize * gameScale,
    height: blockSize * gameScale
  });
};

export default createSubmarine;
