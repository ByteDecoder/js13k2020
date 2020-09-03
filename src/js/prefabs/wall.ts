import { Sprite } from 'kontra';
import { blockSize, gameScale } from '../gameGlobals';
import Game from '../gameEngine/game';

/**
 * Creates a wall prefab.
 * @param x
 * @param y
 * @param scale
 */
const createWall = (x: number, y: number): Sprite =>
  Sprite({
    x: x * gameScale,
    y: y * gameScale,
    color: 'green',
    width: blockSize * gameScale,
    height: blockSize * gameScale,
    collitionIdx: `wall_${x}_${y}`,
    image: Game.getInstance().imageAssets.get('wall')
  });

export default createWall;
