import { Text } from 'kontra';

export interface Position {
  x: number;
  y: number;
}

export const createText = (
  text: string,
  { x, y }: Position,
  fontSize: number,
  textAlign = 'center'
): Text =>
  Text({
    text,
    font: `${fontSize}px Courier New`,
    color: 'white',
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    textAlign
  });

export const createSmText = (text: string, { x, y }: Position, textAlign = 'center'): Text =>
  createText(text, { x, y }, 24, textAlign);

export const createMdText = (text: string, { x, y }: Position, textAlign = 'center'): Text =>
  createText(text, { x, y }, 32, textAlign);

export const createLgText = (text: string, { x, y }: Position, textAlign = 'center'): Text =>
  createText(text, { x, y }, 64, textAlign);
