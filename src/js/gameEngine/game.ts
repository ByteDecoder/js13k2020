import createMenuScene from '../scenes/menuScene';
import { IGameScene } from '../scenes/gameScene';
import GameStateMachine, { GameStates } from './gameStateMachine';
import createMissionScene from '../scenes/missionScene';

/**
 * Singleton instance for handling the entire game execution.
 */
export default class Game {
  private static instance: Game;

  /**
   * Current game scene being played.
   */
  public currentGameScene: IGameScene;

  /**
   * Main game FSM.
   */
  public stateMachine: GameStateMachine;

  private menuScene = createMenuScene();

  private missionScene = createMissionScene();

  private constructor() {
    this.stateMachine = new GameStateMachine();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  start(): void {
    this.loadGameScene();
    this.currentGameScene.start();
  }

  public playGame(): void {
    this.currentGameScene.stop();
    this.stateMachine.transitionToPlayGame();
    this.start();
  }

  public stopPlaying(): void {
    this.currentGameScene.stop();
    this.stateMachine.transitionToGameMenu();
    this.start();
  }

  private loadGameScene(): void {
    switch (this.stateMachine.getCurrentState()) {
      case GameStates.GameMenu:
        this.currentGameScene = this.menuScene;
        break;
      case GameStates.PlayingGame:
        this.currentGameScene = this.missionScene;
        break;
      case GameStates.GameOver:
        this.currentGameScene = this.menuScene;
        break;
      default:
        this.currentGameScene = this.menuScene;
        break;
    }
  }
}
