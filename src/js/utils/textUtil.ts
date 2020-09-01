import { Text } from 'kontra';

export interface Position {
  x: number;
  y: number;
}

export const createText = (text: string, { x, y }: Position, fontSize: number): Text =>
  Text({
    text,
    size: fontSize,
    family: 'monospace',
    color: 'white',
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center'
  });

export const createSmText = (text: string, { x, y }: Position): Text =>
  createText(text, { x, y }, 24);

export const createMdText = (text: string, { x, y }: Position): Text =>
  createText(text, { x, y }, 32);

export const createLgText = (text: string, { x, y }: Position): Text =>
  createText(text, { x, y }, 64);
