/**
 * calculates the new value based on the user's success.
 * @param currentValue current value
 * @param isSuccess whether the day was successful
 * @returns yhe newly calculated value
 */
export const calculateNewValue = (currentValue: number, isSuccess: boolean): number => {
    if (isSuccess) {
      // compound growth formula: %1 increase
      return Number((currentValue * 1.01).toFixed(4));
    }
    
    // Failure case: %0.5 decrease
    const newValue = currentValue * 0.995;
    
    // Lower bound: Value should never fall below 1.0
    return newValue < 1 ? 1 : Number(newValue.toFixed(4));
  };
  
  /**
   * calculates the difference in days between two timestamps (for streak/series tracking)
   */
  export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
    const d1 = new Date(timestamp1).toDateString();
    const d2 = new Date(timestamp2).toDateString();
    return d1 === d2;
  };