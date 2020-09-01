import menuScene from './scenes/menuScene';

const gameMenu = menuScene.create();

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

gameMenu.start();
