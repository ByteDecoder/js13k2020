import { keyPressed } from 'kontra';
import { IGameScene } from './gameScene';
import Game from '../gameEngine/game';
import createGenericScene from './genericScene';

/**
 * Creates the Game Ending Scene.
 */
const creatGameEndingScene = (): IGameScene => {
  const title = 'DECIPHERING CARDS';
  const subtitle =
    '⏁⊑⟒ ⌇⟒⏃⌇ ⏃⍀⟒ ⟟⋏⎎⟟⋏⟟⏁⟒ ⌰⟟☍⟒ ⏁⊑⟒\n ⏁⊑⟒ ⌇⏁⏃⍀⌇. ⍙⟒ ⏃⍀⟒ ⊑⟒⍀⟒ ⋏⍜⍙,\n ⍙⟒ ⍙⟒⍀⟒ ⊑⟒⍀⟒ ⊬⟒⌇⏁⟒⍀⎅⏃⊬.';
  const action = 'Press [x] to end the mission.';
  const footer = 'The oceans are infinite like the stars.\n Civilization NOT FOUND yet.';

  return createGenericScene(title, subtitle, action, footer, () => {
    if (keyPressed('x')) {
      Game.getInstance().gameMenu();
    }
  });
};

export default creatGameEndingScene;
