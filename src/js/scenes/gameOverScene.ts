import { keyPressed } from 'kontra';
import { createScene, IGameScene } from './gameScene';
import { createSmText, createMdText, createLgText } from '../utils/textUtil';
import Game from '../gameEngine/game';

const gameTitle = createLgText('GAME OVER', { x: 400, y: 200 });

const gameSubtitle = createMdText('Your adventure ends here.', {
  x: 400,
  y: 300
});

const gameAction = createSmText('Press [x] to continue', { x: 400, y: 400 });

const props = [gameTitle, gameSubtitle, gameAction];

const update = () => {
  if (keyPressed('x')) {
    Game.getInstance().gameMenu();
  }
};

/**
 * Creates the Game Menu Scene.
 */
const createGameOverScene = (): IGameScene => createScene({ update, props });

export default createGameOverScene;
