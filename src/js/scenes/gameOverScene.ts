import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

/**
 * Creates the Game Over Scene.
 */
const createGameOverScene = (): IGameScene => {
  const title = 'GAME OVER';
  const subtitle = `Your adventure ends here\n after ${
    Game.getInstance().missionCount
  } mission(s).`;
  const action = 'Press [x] to continue';
  const footer = 'Try again...';

  return createGenericScene(title, subtitle, action, footer, () => {
    if (keyPressed('x')) {
      Game.getInstance().gameMenu();
    }
  });
};

export default createGameOverScene;
