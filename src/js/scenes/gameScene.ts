import { Scene, GameLoop, GameObject, init, initKeys } from 'kontra';

init();
initKeys();

export interface IGameScene {
  start(): void;
  stop(): void;
}

export interface SceneOptions {
  update?(dt: number): void;
  render?(): void;
  props?: GameObject[];
}

export const createScene = ({
  update = () => {},
  render = () => {},
  props = []
}: SceneOptions = {}): IGameScene => {
  const scene = Scene({
    id: 'scene',
    children: [...props]
  });

  const loop = GameLoop({
    update: (dt) => update(dt),
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
