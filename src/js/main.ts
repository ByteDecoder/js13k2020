import Game from './gameEngine/game';
/* import './vendors/jsfxr';

declare global {
  interface Window {
    jsfxr: (settings: number[]) => string;
  }
}

const sounds = {
  jump: [0, 0, 0.1, 0.4, 0.2, 0.3, 0, 0.1, 0, 0, 0, 0, 0, 0.47, 0, 0, 0, 0, 0.5, 0, 0, 0.2, 0, 0.5],
  fix: [3, 0, 0.1, 0.4, 0.15, 0.45, 0, -0.45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.4, 0, 0.5],
  save: [0, 0, 0.06, 0.4, 0.5, 0.4, 0, 0.43, 0, 0, 0, 0, 0, 0.2, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 0.5],
  death: [0, 0, 0.3, 0.4, 0.3, 0.4, 0, -0.4, 0, 0, 0, 0, 0, 0.3, 0, 0.4, 0, 0, 1, 0, 0, 0, 0, 0.5],
  win: [0, 0, 0.09, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0.65, 0.5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.5]
}; */

document.addEventListener('DOMContentLoaded', function () {
  /*   const sound = window.jsfxr(sounds.jump);
  const audioPlayer = new Audio();
  audioPlayer.src = sound;
  audioPlayer.autoplay = true;
  const audioPromise = audioPlayer.play();
  if (audioPromise) {
    // Older browsers may not return a promise, according to the MDN website
    audioPromise.catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  } */
  /**
   * Game execution entry point.
   */
  Game.getInstance().start();
});
