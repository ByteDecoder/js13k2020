import Game from './game';

const enum GameStates {
  GameMenu = 0,
  Mission = 1,
  GameOver = 2
}

class StateMachine {
  public currentState: string;

  constructor() {
    this.currentState = 'GAME_MENU';
  }

  nextState = () => {
    console.log('Next state');
  };
}

Game.instace.run();
