import { init, Sprite, GameLoop, Text, initKeys, keyPressed, Scene } from 'kontra';
import { blockSize, levelHeightSize, gameScale, levelWidthSize } from './gameGlobals';

init();
initKeys();

const world = [
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1]
];

const wallFactory = (x: number, y: number, scale = 1) =>
  Sprite({
    x: x * scale,
    y: y * scale,
    color: 'green',
    width: blockSize * scale,
    height: blockSize * scale,
    collitionIdx: `wall_${x}_${y}`
  });

const submarine = Sprite({
  x: blockSize * gameScale,
  y: blockSize * gameScale,
  color: 'red',
  width: blockSize * gameScale,
  height: blockSize * gameScale
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

const levelCreator = () => {
  const level = [];
  for (let y = 0; y < levelHeightSize; y += 1) {
    for (let x = 0; x < levelWidthSize; x += 1) {
      if (world[y][x] === 1) {
        const baseX = x * blockSize;
        const baseY = y * blockSize;
        const wall = wallFactory(baseX, baseY, gameScale);
        level.push(wall);
      }
    }
  }
  return level;
};

levelMap = levelCreator();

const levelScene = Scene({
  id: 'levelScene',
  children: [submarine, ...levelMap]
});

const loop = GameLoop({
  update(dt) {
    levelScene.lookAt(submarine);

    let positionX = Math.ceil(submarine.x / gameScale / blockSize);
    let positionY = Math.ceil(submarine.y / gameScale / blockSize);

    if (keyPressed('up')) {
      if (world[positionY - 1][positionX] === 0) {
        submarine.y -= 2 + dt;
      }
    }

    if (keyPressed('down')) {
      positionY = Math.ceil((submarine.y + 2) / gameScale / blockSize);
      if (world[positionY][positionX] === 0) {
        submarine.y += 2 + dt;
      }
    }

    if (keyPressed('right')) {
      positionX = Math.ceil((submarine.x + 2) / gameScale / blockSize);
      if (world[positionY][positionX] === 0) {
        submarine.x += 2 + dt;
      }
    }

    if (keyPressed('left')) {
      if (world[positionY][positionX - 1] === 0) {
        submarine.x -= 2 + dt;
      }
    }
  },
  render() {
    // submarine.render();
    text.render();
    // levelMap.forEach((wall) => wall.render());
    levelScene.render();
  }
});

loop.start();
