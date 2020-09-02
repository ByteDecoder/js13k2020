/**
 * Random number between a mix and max range.
 * @param min min value.
 * @param max max value.
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default getRandomInt;
