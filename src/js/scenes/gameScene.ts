import { Scene, GameLoop, GameObject, init, initKeys } from 'kontra';

init();
initKeys();

export interface IGameScene {
  start(): void;
  stop(): void;
}

export interface SceneOptions {
  cameraLookTarget?: GameObject;
  update?(dt: number): void;
  render?(): void;
  props?: GameObject[];
}

export const createScene = ({
  cameraLookTarget = null,
  update = () => {},
  render = () => {},
  props = []
}: SceneOptions = {}): IGameScene => {
  const scene = Scene({
    id: 'scene',
    children: [...props]
  });

  const loop = GameLoop({
    update: (dt) => {
      if (cameraLookTarget) {
        scene.lookAt(cameraLookTarget);
      }
      update(dt);
    },
    render: () => {
      scene.render();
      render();
    }
  });

  return {
    start: () => loop.start(),
    stop: () => loop.stop()
  };
};
