import { init, Sprite, GameLoop, Text, initKeys, keyPressed, collides } from 'kontra';

initKeys();
const { canvas } = init();

const submarineSprite = new Image();
submarineSprite.src = '../sprites/submarine.png';

const gameScale = 4;
const levelWidthSize = 10;
const levelHeightSize = 5;

interface ICollitionData {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const world = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
    collitionIdx: `wall_${x}_${y}`
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
const collisionLayerMap = new Map<string, ICollitionData>();

const worldRenderer = () => {
  const level = [];
  for (let y = 0; y < levelHeightSize; y += 1) {
    for (let x = 0; x < levelWidthSize; x += 1) {
      if (world[y][x] === 1) {
        const baseX = x * 16;
        const baseY = y * 16;
        const wall = wallFactory(baseX, baseY, gameScale);
        level.push(wall);
        const collitionData: ICollitionData = {
          xMin: baseX * gameScale,
          xMax: baseX * gameScale + gameScale * wall.width,
          yMin: baseY * gameScale,
          yMax: baseY * gameScale + gameScale * wall.height
        };
        collisionLayerMap.set(wall.collitionIdx, collitionData);
      }
    }
  }
  return level;
};

levelMap = worldRenderer();

const loop = GameLoop({
  update(dt) {
    submarine.update();

    let playerDirection = '';

    if (keyPressed('up')) {
      submarine.y -= 2 + dt;
      playerDirection = 'up';
    }

    if (keyPressed('down')) {
      submarine.y += 2 + dt;
      playerDirection = 'down';
    }

    if (keyPressed('right')) {
      submarine.x += 2 + dt;
      playerDirection = 'right';
    }

    if (keyPressed('left')) {
      submarine.x -= 2 + dt;
      playerDirection = 'left';
    }

    // Checking wall collition
    levelMap.forEach((block) => {
      const collide = collides(block, submarine);
      if (collide) {
        const collitionData = collisionLayerMap.get(block.collitionIdx);
        console.log(collitionData);
        console.log(submarine);
        switch (playerDirection) {
          case 'right':
            if (submarine.x + submarine.width >= collitionData.xMin && submarine.y) {
              submarine.x = block.x - submarine.width;
            }
            break;
          case 'left':
            if (submarine.x === collitionData.xMax) {
              submarine.x = collitionData.xMax + 1;
            }
            break;
          case 'down':
            if (submarine.y + submarine.height >= collitionData.yMin) {
              submarine.y = collitionData.yMin - submarine.height;
            }
            break;
          default:
            break;
        }
      }
    });
  },
  render() {
    text.render();
    levelMap.forEach((block) => block.render());
    submarine.render();
  }
});

loop.start();
