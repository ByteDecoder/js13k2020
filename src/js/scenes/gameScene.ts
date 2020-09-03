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
 * Defien the scene context.
 */
export interface SceneOptions {
  cameraLookTarget?: GameObject;
  sceneProps?: Sprite[];
  messages?: Text[];
  update?: (dt?: number, sceneProps?: Sprite[]) => void;
}

/**
 *
 * @param sceneOptions Set the scene context.
 */
export const createScene = (sceneOptions: SceneOptions): IGameScene => {
  const scene = Scene({
    id: 'scene'
  });

  const { sceneProps } = sceneOptions;

  if (sceneProps) {
    scene.children = sceneProps;
  }

  const loop = GameLoop({
    update: (dt) => {
      if (sceneOptions.cameraLookTarget) {
        scene.lookAt(sceneOptions.cameraLookTarget);
      }
      sceneOptions.update(dt, sceneOptions.sceneProps);
    },
    render: () => {
      scene.render();
      sceneOptions.messages.forEach((message) => message.render());
    }
  });

  return {
    start: () => loop.start(),
    stop: () => loop.stop(),
    destroy: () => scene.destroy()
  };
};
