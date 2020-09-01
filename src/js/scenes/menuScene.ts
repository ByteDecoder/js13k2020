import { Text, keyPressed, init, initKeys } from 'kontra';
import { createScene, IGameScene } from './gameScene';

init();
initKeys();

const gameTitle = Text({
  text: '404 Dark Room',
  font: '64px Arial',
  color: 'white',
  x: 400,
  y: 200,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: 'center'
});

const gameSubtitle = Text({
  text: 'Find the 404 undewater room before time ends',
  font: '32px Arial',
  color: 'white',
  x: 400,
  y: 300,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: 'center'
});

const gameAction = Text({
  text: 'Press [ENTER] to continue',
  font: '24px Arial',
  color: 'white',
  x: 400,
  y: 400,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: 'center'
});

const props = [gameTitle, gameSubtitle, gameAction];

const update = () => {
  if (keyPressed('enter')) {
    const a = 1 + 1;
    console.log('key enter pressed.');
  }
};

const create = (): IGameScene => createScene({ update, props });

export default { create };
