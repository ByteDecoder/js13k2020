import { Scene, GameLoop, GameObject, init, initKeys, Text } from 'kontra';

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
  messages?: Text[];
}

export const createScene = ({
  cameraLookTarget = null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render = () => {},
  props = [],
  messages = []
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
      messages.forEach((message) => message.render());
    }
  });

  return {
    start: () => loop.start(),
    stop: () => loop.stop()
  };
};
