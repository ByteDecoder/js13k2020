import { createScene, IGameScene } from './gameScene';
import { createSmText, createMdText, createLgText, createText } from '../utils/textUtil';

/**
 * Creates the Generic Scene.
 */
const createGenericScene = (
  titleText: string,
  subtitleText: string,
  actionText: string,
  footerText = '',
  callbackAction: () => void
): IGameScene => {
  const title = createLgText(titleText, { x: 400, y: 200 });

  const subtitle = createMdText(subtitleText, {
    x: 400,
    y: 300
  });

  const action = createSmText(actionText, { x: 400, y: 400 });

  const footer = createText(footerText, { x: 200, y: 580 }, 16);

  return createScene({
    messages: [title, subtitle, action, footer],
    update() {
      callbackAction();
    }
  });
};

export default createGenericScene;
