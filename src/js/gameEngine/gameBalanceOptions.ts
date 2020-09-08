import { MapGeneratorOptions } from '../generators/levelMapGenerator';
import { PlayerOptions } from './PlayerOptions';
import { HyperEngineOptions } from './HyperEngineOptions';

/**
 * Default Player game balance options.
 */
export const defaultPlayerOptions = (): PlayerOptions => {
  return { playerTime: 15, playerMovementSpeed: 2, playerTimeRateConsumption: 2, sonarTimeRate: 2 };
};

/**
 * Default HyperEngine game balance options.
 */
export const defaultHyperEngineOptions = (): HyperEngineOptions => {
  return {
    isHyperEngineReady: false,
    hyperEngineEnabled: false,
    hyperEngineVelocity: 4,
    hyperEngineRechargeTime: 10,
    hyperEngineCharges: 3,
    hyperEngineDurationTime: 5
  };
};

export const defaultMapGeneratorOptions = (): MapGeneratorOptions => {
  return {
    maxTimersPerRoom: 3,
    timerProbability: 200,
    maxCardsPerLevel: 10,
    cardProbability: 200,
    maxMinesPerRoom: 20,
    mineProbability: 70
  };
};

export const defaultTimerRechargeValue = 3;
