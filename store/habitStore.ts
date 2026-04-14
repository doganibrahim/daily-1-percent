import { create } from 'zustand';

import { getDayKey, isSameDayKey } from '@/lib/date';
import { calculateNewTarget, predictTomorrowTarget } from '@/lib/engine';
import { getPersistedHabitState, setPersistedHabitState } from '@/lib/storage';
import { STORAGE_SCHEMA_VERSION } from '@/lib/storageKeys';
import { Habit } from '@/types/habit';

type HabitCheckInScenario = 'success' | 'miss';

export interface HabitPrediction {
  ifSuccess: number;
  ifMiss: number;
}

interface HabitStoreState {
  habits: Habit[];
  hydrated: boolean;
  hydratedAt: number | null;
  error: string | null;
  lastCheckInHabitId: string | null;
  hydrate: () => void;
  addHabit: (input: { name: string; icon?: string; color?: string }) => void;
  checkInHabit: (habitId: string, scenario?: HabitCheckInScenario) => void;
  resetError: () => void;
  removeHabit: (habitId: string) => void;
  getPredictionForHabit: (habitId: string) => HabitPrediction | null;
  isCheckedInToday: (habitId: string) => boolean;
}

const DEFAULT_ICON = 'leaf';
const DEFAULT_COLOR = 'bg-sage-500';
const SAME_DAY_ERROR = 'You already checked in for this habit today.';
const NOT_FOUND_ERROR = 'Habit not found.';

const persistHabits = (habits: Habit[]): number => {
  const hydratedAt = Date.now();
  setPersistedHabitState({
    habits,
    hydratedAt,
    version: STORAGE_SCHEMA_VERSION,
  });

  return hydratedAt;
};

const createHabitId = (): string => {
  return `habit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const useHabitStore = create<HabitStoreState>((set, get) => ({
  habits: [],
  hydrated: false,
  hydratedAt: null,
  error: null,
  lastCheckInHabitId: null,

  hydrate: () => {
    const persisted = getPersistedHabitState();
    const nextHydratedAt = persisted.hydratedAt || null;

    set({
      habits: persisted.habits,
      hydratedAt: nextHydratedAt,
      hydrated: true,
      error: null,
    });
  },

  addHabit: ({ name, icon = DEFAULT_ICON, color = DEFAULT_COLOR }) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      set({ error: 'Habit name cannot be empty.' });
      return;
    }

    const nextHabit: Habit = {
      id: createHabitId(),
      name: trimmedName,
      icon,
      color,
      currentValue: 1,
      streak: 0,
      createdAt: Date.now(),
      lastCheckInAt: undefined,
      lastCheckInDate: undefined,
    };

    const currentHabits = get().habits;
    const nextHabits = [nextHabit, ...currentHabits];
    const nextHydratedAt = persistHabits(nextHabits);

    set({
      habits: nextHabits,
      hydratedAt: nextHydratedAt,
      error: null,
    });
  },

  checkInHabit: (habitId, scenario = 'success') => {
    const state = get();
    const todayKey = getDayKey();
    const targetHabit = state.habits.find((habit) => habit.id === habitId);

    if (!targetHabit) {
      set({ error: NOT_FOUND_ERROR });
      return;
    }

    if (isSameDayKey(targetHabit.lastCheckInDate, todayKey)) {
      set({ error: SAME_DAY_ERROR });
      return;
    }

    const isSuccess = scenario === 'success';
    const nextHabits = state.habits.map((habit) => {
      if (habit.id !== habitId) {
        return habit;
      }

      const nextValue = calculateNewTarget(habit.currentValue, isSuccess);
      return {
        ...habit,
        currentValue: nextValue,
        streak: isSuccess ? habit.streak + 1 : 0,
        lastCheckInAt: Date.now(),
        lastCheckInDate: todayKey,
      };
    });

    const nextHydratedAt = persistHabits(nextHabits);

    set({
      habits: nextHabits,
      hydratedAt: nextHydratedAt,
      error: null,
      lastCheckInHabitId: habitId,
    });
  },

  resetError: () => {
    set({ error: null });
  },

  removeHabit: (habitId) => {
    const currentHabits = get().habits;
    const nextHabits = currentHabits.filter((habit) => habit.id !== habitId);
    const nextHydratedAt = persistHabits(nextHabits);

    set({
      habits: nextHabits,
      hydratedAt: nextHydratedAt,
      error: null,
    });
  },

  isCheckedInToday: (habitId) => {
    const habit = get().habits.find((item) => item.id === habitId);
    if (!habit) return false;
    return isSameDayKey(habit.lastCheckInDate, getDayKey());
  },

  getPredictionForHabit: (habitId) => {
    const habit = get().habits.find((item) => item.id === habitId);
    if (!habit) {
      return null;
    }

    return {
      ifSuccess: predictTomorrowTarget(habit.currentValue, true),
      ifMiss: predictTomorrowTarget(habit.currentValue, false),
    };
  },
}));
