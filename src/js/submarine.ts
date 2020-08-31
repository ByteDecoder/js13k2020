import { Sprite } from 'kontra';
import { gameScale, blockSize } from './gameGlobals';

export const submarine = Sprite({
  x: blockSize * gameScale,
  y: blockSize * gameScale,
  color: 'red',
  width: blockSize * gameScale,
  height: blockSize * gameScale
});

export default { submarine: 'v0.1.0' };
