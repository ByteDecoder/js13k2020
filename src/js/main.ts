import { init, Sprite, GameLoop, Text, initKeys, keyPressed } from 'kontra';

initKeys();
const { canvas } = init();

const submarineSprite = new Image();
submarineSprite.src = '../sprites/submarine.png';

const world = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

const submarine = Sprite({
  x: 100,
  y: 80,
  color: 'red',
  width: 40,
  height: 40,
  dx: 2
});

const wallFactory = (x, y) =>
  Sprite({
    x,
    y,
    color: 'red',
    width: 40,
    height: 40,
    dx: 2
  });

const text = Text({
  text: 'Underwater Escape',
  font: '32px Arial',
  color: 'white',
  x: 300,
  y: 100,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: 'center'
});

const worldRenderer = () => {
  for(let x=0, x< 5; x++) {

  }
};

const loop = GameLoop({
  update(dt) {
    submarine.update();

    if (keyPressed('up')) {
      submarine.y -= 4 + dt;
    }
    if (keyPressed('down')) {
      submarine.y += 4 + dt;
    }

    if (submarine.x > canvas.width) {
      submarine.x = -submarine.width;
    }
  },
  render() {
    text.render();
    submarine.render();
  }
});

loop.start();
