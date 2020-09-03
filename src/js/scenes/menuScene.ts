import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

const title = '404 MISSION';
const subtitle = 'An underwater adventure';
const action = 'Press [ENTER] to continue';
const footer = 'Made by ByteDecoder, 2020';

/**
 * Creates the Game Menu Scene.
 */
const createMenuScene = (): IGameScene =>
  createGenericScene(title, subtitle, action, footer, () => {
    if (keyPressed('enter')) {
      Game.getInstance().playGame();
    }
  });

export default createMenuScene;
