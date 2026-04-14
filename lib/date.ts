/**
 * Returns a stable local day key in YYYY-MM-DD format.
 * This is used for same-day check-in guards.
 */
export const getDayKey = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Checks whether two day keys represent the same calendar day.
 */
export const isSameDayKey = (dayKeyA?: string, dayKeyB?: string): boolean => {
  if (!dayKeyA || !dayKeyB) {
    return false;
  }

  return dayKeyA === dayKeyB;
};
