export enum GameStates {
  GameMenu = 0,
  PlayingGame = 1,
  GameOver = 2,
  FinalizeGame = 3
}

export default class GameStateMachine {
  private currentState: GameStates;

  constructor() {
    this.currentState = GameStates.GameMenu;
  }

  public getCurrentState(): GameStates {
    return this.currentState;
  }

  playGame(): void {
    if (this.currentState === GameStates.GameMenu) {
      this.currentState = GameStates.PlayingGame;
    }
  }
}