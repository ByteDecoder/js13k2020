import { Position } from './locationMap';

/**
 * Game sprite scale multiplier.
 */
export const gameScale = 5;
/**
 * Game sprite size.
 */
export const blockSize = 8;

/**
 * Initial game entry point.
 */
export const playerStartingPoint: Position = { x: 5, y: 5 };

/**
 * World max room size vertically.
 */
export const worldWidthSize = 15;

/**
 * World max room size horizontally.
 */
export const worldHeightSize = 15;

/**
 * We can stop the time here.
 */
export const isTimeEnabled = true;

/**
 * Enable or diseable SFX.
 */
export const isSoundFxEnabled = true;

/**
 * Number of missions to end the game.
 */
export const endgameTotalMissionCompleted = 1;
