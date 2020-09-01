import createMenuScene from './scenes/menuScene';
import { IGameScene } from './scenes/gameScene';

export default class Game {
  private static _game: Game;

  public currentGameScene: IGameScene;

  private constructor() {
    this.currentGameScene = createMenuScene();
  }

  static instace = (): Game => {
    if (this._game == undefined) Game._game = new Game();
    return Game._game;
  };

  run = (): void => {
    this.currentGameScene.start();
  };
}
