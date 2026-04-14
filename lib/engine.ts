const SUCCESS_MULTIPLIER = 1.01;
const MISS_MULTIPLIER = 0.995;
const MIN_TARGET_VALUE = 1;
const PRECISION = 4;

const normalizeTarget = (value: number): number => {
  return Number(value.toFixed(PRECISION));
};

/**
 * Calculates the next adaptive target based on check-in outcome.
 * - success: +1%
 * - miss: -0.5% (floored at 1.0)
 */
export const calculateNewTarget = (currentValue: number, isSuccess: boolean): number => {
  if (isSuccess) {
    return normalizeTarget(currentValue * SUCCESS_MULTIPLIER);
  }

  const decreased = currentValue * MISS_MULTIPLIER;
  return Math.max(MIN_TARGET_VALUE, normalizeTarget(decreased));
};

/**
 * Backwards-compatible alias for older call sites.
 */
export const calculateNewValue = calculateNewTarget;

/**
 * Predicts tomorrow's target for a given scenario without mutating state.
 */
export const predictTomorrowTarget = (
  currentValue: number,
  successScenario: boolean
): number => {
  return calculateNewTarget(currentValue, successScenario);
};