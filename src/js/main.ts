import Game from './gameEngine/game';
import soundFx from './sounds/soundBank';
import wallImageUrl from '../sprites/wall.png';

declare global {
  interface Window {
    zzfx: (...args: number[]) => void;
  }
}

Game.getInstance().missionCount = 0;

const image = new Image();
image.src = wallImageUrl;
image.onload = function () {
  Game.getInstance().imageAssets.set('wall', image);
};

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Game execution entry point.
   */
  window.zzfx(...soundFx.intro);
  Game.getInstance().start();
});
