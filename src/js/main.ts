import Game from './gameEngine/game';
import soundFx from './sounds/soundBank';



document.addEventListener('DOMContentLoaded', function () {
  /**
   * Game execution entry point.
   */
  window.zzfx(...soundFx.intro);
  Game.getInstance().start();
});
