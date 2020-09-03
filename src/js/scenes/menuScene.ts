import { keyPressed } from 'kontra';
import { createScene, IGameScene } from './gameScene';
import { createSmText, createMdText, createLgText, createText } from '../utils/textUtil';
import Game from '../gameEngine/game';

const gameTitle = createLgText('404 MISSION', { x: 400, y: 200 });

const gameSubtitle = createMdText('An underwater adventure', {
  x: 400,
  y: 300
});

const gameAction = createSmText('Press [ENTER] to continue', { x: 400, y: 400 });
const gameAuthor = createText('Made by ByteDecoder, 2020', { x: 170, y: 580 }, 16);

/**
 * Creates the Game Menu Scene.
 */
const createMenuScene = (): IGameScene =>
  createScene({
    messages: [gameTitle, gameSubtitle, gameAction, gameAuthor],
    update() {
      if (keyPressed('enter')) {
        Game.getInstance().playGame();
      }
    }
  });

export default createMenuScene;
