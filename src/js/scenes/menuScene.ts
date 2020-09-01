import { keyPressed, init, initKeys } from 'kontra';
import { createScene, IGameScene } from './gameScene';
import { createSmText, createMdText, createLgText } from '../utils/textUtil';

init();
initKeys();

const gameTitle = createLgText('404 Dark Room', { x: 400, y: 200 });

const gameSubtitle = createMdText('An underwater adventure', {
  x: 400,
  y: 300
});

const gameAction = createSmText('Press [ENTER] to continue', { x: 400, y: 400 });

const props = [gameTitle, gameSubtitle, gameAction];

const update = () => {
  if (keyPressed('enter')) {
    const a = 1 + 1;
    console.log('key enter pressed.');
  }
};

/**
 * Creates the Game Menu Scene.
 */
const createMenuScene = (): IGameScene => createScene({ update, props });

export default createMenuScene;
