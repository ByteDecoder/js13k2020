import Game from './gameEngine/game';
import soundFx from './sounds/soundBank';

declare global {
  interface Window {
    zzfx: (...args: number[]) => void;
  }
}

/* const image = new Image();
image.src = '../sprites/wall.png';
image.onload = function () {
  console.log('here');
  console.log(image);
};

load('../sprites/wall.png').then(function () {
  console.log(imageAssets.wall);
});
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Game execution entry point.
   */
  window.zzfx(...soundFx.intro);
  Game.getInstance().start();
});
