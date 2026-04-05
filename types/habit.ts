export interface Habit {
    id: string;
    name: string;
    icon: string; // icon name from expo/vector-icons
    color: string; // color of the card in Tailwind class (e.g: 'bg-green-500')
    currentValue: number; // current value of the habit (starting: 1.0)
    streak: number; // how many days in a row the habit is being done
    createdAt: number; // creation date (timestamp)
    lastCheckIn?: number; // last time the habit was completed (timestamp)
  }
  
  export interface HabitLog {
    id: string;
    habitId: string;
    date: string; // date in '2024-03-25' format (for easy querying)
    valueBefore: number; // value before the check-in
    valueAfter: number; // value after the check-in (increased or decreased)
  }