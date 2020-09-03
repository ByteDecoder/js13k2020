import { Sprite } from 'kontra';
import { gameScale } from '../gameGlobals';
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
    image: Game.getInstance().imageAssets.get('wall')
  });

export default createWall;
