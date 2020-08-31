import { init, Sprite, GameLoop, Text, initKeys, keyPressed, Scene } from 'kontra';
import { blockSize, gameScale } from './gameGlobals';
import worldGenerator, { worldHeightSize, worldWidthSize, entryPoint } from './worldGenerator';
import { roomContainer, entryRoom } from './rooms/roomTypes';

init();
initKeys();

/**
 * Random generated world map.
 */
const worldMap = worldGenerator.create();

/**
 * Detailed level world map with sprite walls.
 */
const worldFullMap = Array(entryRoom.height * worldHeightSize)
  .fill(0)
  .map(() => Array(entryRoom.width * worldWidthSize).fill(0));

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
  x: entryPoint.x * entryRoom.width * blockSize * gameScale + 128,
  y: entryPoint.y * entryRoom.height * blockSize * gameScale + 128,
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
  for (let y = 0; y < worldHeightSize; y += 1) {
    for (let x = 0; x < worldWidthSize; x += 1) {
      if (worldMap[y][x] !== 0) {
        const roomData = roomContainer.get(worldMap[y][x]);

        const startingRow = y * roomData.height;
        const endingRow = startingRow + roomData.height;
        const startingCol = x * roomData.width;
        const endingCol = startingRow + roomData.width;

        // Copy the room map data into the worldFullMap
        for (let yRoomData = 0; yRoomData < roomData.height; yRoomData += 1) {
          worldFullMap[startingRow + yRoomData].splice(
            startingCol,
            roomData.map[yRoomData].length,
            ...roomData.map[yRoomData]
          );
        }

        // Creating wall sprites according worldFullMap tileset.
        for (let yLevelMap = startingRow; yLevelMap < endingRow; yLevelMap += 1) {
          for (let xLevelMap = startingCol; xLevelMap < endingCol; xLevelMap += 1) {
            if (worldFullMap[yLevelMap][xLevelMap] === 1) {
              const baseX = xLevelMap * blockSize;
              const baseY = yLevelMap * blockSize;
              const wall = wallFactory(baseX, baseY, gameScale);
              level.push(wall);
            }
          }
        }
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

console.log(worldFullMap);

const loop = GameLoop({
  update(dt) {
    levelScene.lookAt(submarine);

    let positionX = Math.ceil(submarine.x / gameScale / blockSize);
    let positionY = Math.ceil(submarine.y / gameScale / blockSize);

    if (keyPressed('up')) {
      if (worldFullMap[positionY - 1][positionX] === 0) {
        submarine.y -= 2 + dt;
      }
    }

    if (keyPressed('down')) {
      positionY = Math.ceil((submarine.y + 2) / gameScale / blockSize);
      if (worldFullMap[positionY][positionX] === 0) {
        submarine.y += 2 + dt;
      }
    }

    if (keyPressed('right')) {
      positionX = Math.ceil((submarine.x + 2) / gameScale / blockSize);
      if (worldFullMap[positionY][positionX] === 0) {
        submarine.x += 2 + dt;
      }
    }

    if (keyPressed('left')) {
      if (worldFullMap[positionY][positionX - 1] === 0) {
        submarine.x -= 2 + dt;
      }
    }
  },
  render() {
    text.render();
    levelScene.render();
  }
});

loop.start();
