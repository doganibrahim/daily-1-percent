export interface Habit {
  id: string;
  name: string;
  icon: string; // icon name from expo/vector-icons
  color: string; // color token/class for UI (e.g. 'bg-sage-500')
  currentValue: number; // current adaptive target/value (starts at 1.0)
  streak: number; // number of consecutive successful days
  createdAt: number; // creation date (timestamp)
  lastCheckInAt?: number; // last completed check-in timestamp
  lastCheckInDate?: string; // day key in YYYY-MM-DD format (same-day guard)
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // date in YYYY-MM-DD format (for day-level querying)
  valueBefore: number; // value before check-in
  valueAfter: number; // value after check-in (increase/decrease)
  isSuccess: boolean; // whether this check-in counted as success
}