import { Scene, GameLoop, GameObject, init, initKeys, Text, Sprite, keyPressed } from 'kontra';
import { openFullscreen } from '../utils/html5Screen';

init();
initKeys();

/**
 * External interaction with the scene.
 */
export interface IGameScene {
  start(): void;
  stop(): void;
  destroy(): void;
  hide(): void;
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
 * Creates the game scene with props and camera.
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
      // Enters into fullscreen mode
      if (keyPressed('f')) {
        openFullscreen();
      }

      if (sceneOptions.cameraLookTarget) {
        scene.lookAt(sceneOptions.cameraLookTarget);
      }
      sceneOptions.update(dt, sceneOptions.sceneProps);

      // Clean dead GameObjects from the scene.
      scene.children = scene.children.filter((sprite) => sprite.isAlive());
    },
    render: () => {
      scene.render();
      sceneOptions.messages.forEach((message) => message.render());
    }
  });

  return {
    start: () => loop.start(),
    stop: () => loop.stop(),
    destroy: () => scene.destroy(),
    hide: () => scene.hide()
  };
};
