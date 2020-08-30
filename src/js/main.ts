import { init, Sprite, GameLoop, Text, initKeys, keyPressed } from 'kontra';

initKeys();
const { canvas } = init();

const submarineSprite = new Image();
submarineSprite.src = '../sprites/submarine.png';

const gameScale = 4;
const levelWidthSize = 8;
const levelHeightSize = 5;

const world = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

const submarine = Sprite({
  x: 16 * gameScale,
  y: 16 * gameScale,
  color: 'red',
  width: 16 * gameScale,
  height: 16 * gameScale
});

const wallFactory = (x: number, y: number, scale = 1) =>
  Sprite({
    x: x * scale,
    y: y * scale,
    color: 'green',
    width: 16 * scale,
    height: 16 * scale,
    name: `wall_${x}_${y}`
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

let levelMap = [];

const worldRenderer = () => {
  const level = [];
  for (let y = 0; y < levelHeightSize; y += 1) {
    for (let x = 0; x < levelWidthSize; x += 1) {
      if (world[y][x] === 1) {
        const wall = wallFactory(x * 16, y * 16, gameScale);
        level.push(wall);
      }
    }
  }
  return level;
};

levelMap = worldRenderer();

const loop = GameLoop({
  update(dt) {
    submarine.update();

    if (keyPressed('up')) {
      submarine.y -= 2 + dt;
    }
    if (keyPressed('down')) {
      submarine.y += 2 + dt;
    }

    if (keyPressed('right')) {
      submarine.x += 2 + dt;
    }
    if (keyPressed('left')) {
      submarine.x -= 2 + dt;
    }

    if (submarine.x > canvas.width) {
      submarine.x = -submarine.width;
    }
  },
  render() {
    text.render();
    levelMap.forEach((block) => block.render());
    submarine.render();
  }
});

loop.start();
