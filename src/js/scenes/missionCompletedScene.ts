import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

const title = 'MISSION COMPLETED';
const subtitle = 'All 404 cards were collected.';
const action = 'Press [x] to start the next mission.';

/**
 * Creates the Misson Completed Scene.
 */
const createMissionCompletedScene = (): IGameScene =>
  createGenericScene(title, subtitle, action, () => {
    if (keyPressed('x')) {
      Game.getInstance().playGame();
    }
  });

export default createMissionCompletedScene;
