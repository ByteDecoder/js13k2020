/**
 * Player gameplay options.
 */
interface PlayerOptions {
  /**
   * Starting player time.
   */
  playerTime: number;
  /**
   * Player movement speed.
   */
  playerMovementSpeed: number;
  /**
   * Number of secords being passed to reduce player time.
   */
  playerTimeRateConsumption: number;
  /**
   * Time to play the submarine sonar sound.
   */
  sonarTimeRate: number;
}
