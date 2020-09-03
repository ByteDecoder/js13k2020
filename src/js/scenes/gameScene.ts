import { Scene, GameLoop, GameObject, init, initKeys, Text, Sprite } from 'kontra';

init();
initKeys();

/**
 * External interaction with the scene.
 */
export interface IGameScene {
  start(): void;
  stop(): void;
  destroy(): void;
}

/**
 * Define a set of sprite categories used in the scene.
 */
export interface SceneProps {
  player?: Sprite;
  walls?: Sprite[];
  timers?: Sprite[];
  cards?: Sprite[];
  mines?: Sprite[];
  backGroundOne?: Sprite;
}

/**
 * Defien the scene context.
 */
export interface SceneOptions {
  cameraLookTarget?: GameObject;
  sceneProps?: SceneProps;
  messages?: Text[];
  update?: (dt?: number, sceneProps?: SceneProps) => void;
  render?: (sceneProps?: SceneProps) => void;
}

/**
 *
 * @param sceneOptions Set the scene context.
 */
export const createScene = (sceneOptions: SceneOptions): IGameScene => {
  const scene = Scene({
    id: 'scene'
  });

  const loop = GameLoop({
    update: (dt) => {
      if (sceneOptions.cameraLookTarget) {
        scene.lookAt(sceneOptions.cameraLookTarget);
      }
      sceneOptions.update(dt, sceneOptions.sceneProps);
    },
    render: () => {
      scene.render();
      if (sceneOptions.render) {
        sceneOptions.render(sceneOptions.sceneProps);
      }
      if (sceneOptions.sceneProps) {
        sceneOptions.sceneProps.walls.forEach((wall) => wall.render());
      }
      //sceneOptions.sceneProps.mines.forEach((mine) => mine.render());
      //sceneOptions.sceneProps.cards.forEach((card) => card.render());
      //sceneOptions.sceneProps.timers.forEach((timer) => timer.render());
      //sceneOptions.sceneProps.player.render();
      sceneOptions.messages.forEach((message) => message.render());
    }
  });

  return {
    start: () => loop.start(),
    stop: () => loop.stop(),
    destroy: () => scene.destroy()
  };
};
