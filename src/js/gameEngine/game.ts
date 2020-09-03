import createMenuScene from '../scenes/menuScene';
import { IGameScene } from '../scenes/gameScene';
import GameStateMachine, { GameStates } from './gameStateMachine';
import createMissionScene from '../scenes/missionScene';
import createGameOverScene from '../scenes/gameOverScene';

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

  private constructor() {
    this.stateMachine = new GameStateMachine();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  /**
   * Load and plays the current scene based on the game FSM.
   */
  start(): void {
    this.loadGameScene();
    this.currentGameScene.start();
    console.log(this.stateMachine.getCurrentState());
  }

  /**
   * Move to the play state.
   */
  public playGame(): void {
    this.currentGameScene.stop();
    this.stateMachine.transitionToPlayGame();
    this.start();
  }

  /**
   * Return from game scene to menu scene.
   */
  public gameMenu(): void {
    this.currentGameScene.stop();
    this.stateMachine.transitionToGameMenu();
    this.start();
  }

  public gameOver(): void {
    this.currentGameScene.stop();
    this.stateMachine.transitionToGameOver();
    this.start();
  }

  private loadGameScene(): void {
    switch (this.stateMachine.getCurrentState()) {
      case GameStates.GameMenu:
        this.currentGameScene = createMenuScene();
        break;
      case GameStates.PlayingGame:
        this.currentGameScene = createMissionScene();
        break;
      case GameStates.GameOver:
        this.currentGameScene = createGameOverScene();
        break;
      default:
        this.currentGameScene = createMenuScene();
        break;
    }
  }
}
