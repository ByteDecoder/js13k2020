import roomTemplates from './roomTemplates';

/**
 * 1 -> need bootom door
 * 2 -> need top door
 * 3 -> need left door
 * 4 -> need right door
 */
const openingDirection = 0;

const spawn = () => {
  if (openingDirection === 1) {
    // Need to spawn a room with a BTOOM door
  } else if (openingDirection === 2) {
    // Need to spawn a room with TOP door
  } else if (openingDirection === 3) {
    // Need to spawn a room with LEFT door
  } else if (openingDirection === 4) {
    // Need to spwan a room with RIGHT door
  }
};
