import createMenuScene from './scenes/menuScene';
import { IGameScene } from './scenes/gameScene';

/**
 * Singleton instance for handling the entire game execution.
 */
export default class Game {
  private static instance: Game;

  /**
   * Current game scene being played.
   */
  public currentGameScene: IGameScene;

  private constructor() {
    this.currentGameScene = createMenuScene();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  run(): void {
    this.currentGameScene.start();
  }
}
