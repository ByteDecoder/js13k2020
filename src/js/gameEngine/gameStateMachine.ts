export enum GameStates {
  GameMenu = 0,
  PlayingGame = 1,
  GameOver = 2,
  FinalizeGame = 3
}

export default class GameStateMachine {
  private currentState: GameStates;

  constructor() {
    this.resetFSM();
  }

  /**
   * Get current FSM state.
   */
  public getCurrentState(): GameStates {
    return this.currentState;
  }

  /**
   * Resets the FSM to the initial state.
   */
  resetFSM(): void {
    this.currentState = GameStates.GameMenu;
  }

  transitionToPlayGame(): void {
    if (this.currentState === GameStates.GameMenu) {
      this.currentState = GameStates.PlayingGame;
    }
  }

  transitionToGameMenu(): void {
    if (this.currentState === GameStates.PlayingGame || this.currentState === GameStates.GameOver) {
      this.currentState = GameStates.GameMenu;
    }
  }

  transitionToGameOver(): void {
    if (this.currentState === GameStates.PlayingGame) {
      this.currentState = GameStates.GameOver;
    }
  }
}
