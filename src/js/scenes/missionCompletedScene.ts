import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

/**
 * Creates the Misson Completed Scene.
 */
const createMissionCompletedScene = (): IGameScene => {
  const title = 'MISSION COMPLETED';
  const subtitle = 'Transmitting to central\n the 404 Cards found data.';
  const action = 'Press [x] to start the next mission.';
  const footer = `${Game.getInstance().missionCount} mission(s) completed`;

  return createGenericScene(title, subtitle, action, footer, () => {
    if (keyPressed('x')) {
      Game.getInstance().playGame();
    }
  });
};

export default createMissionCompletedScene;
