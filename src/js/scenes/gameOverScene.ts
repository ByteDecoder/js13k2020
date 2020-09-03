import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

const title = 'GAME OVER';
const subtitle = 'Your adventure ends here.';
const action = 'Press [x] to continue';

/**
 * Creates the Game Over Scene.
 */
const createGameOverScene = (): IGameScene =>
  createGenericScene(title, subtitle, action, '', () => {
    if (keyPressed('x')) {
      Game.getInstance().gameMenu();
    }
  });

export default createGameOverScene;
