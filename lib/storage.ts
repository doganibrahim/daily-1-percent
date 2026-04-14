import { Habit } from '@/types/habit';

import { STORAGE_KEYS, STORAGE_SCHEMA_VERSION, StorageKey } from './storageKeys';

export interface PersistedHabitState {
  habits: Habit[];
  hydratedAt: number;
  version: number;
}

interface StorageAdapter {
  set: (key: string, value: string) => void;
  getString: (key: string) => string | undefined;
  remove: (key: string) => void;
}

const createMemoryStorage = (): StorageAdapter => {
  const memory = new Map<string, string>();

  return {
    set: (key, value) => {
      memory.set(key, value);
    },
    getString: (key) => {
      return memory.get(key);
    },
    remove: (key) => {
      memory.delete(key);
    },
  };
};

const createStorageAdapter = (): StorageAdapter => {
  try {
    // Lazily require MMKV to avoid crashing in Expo Go environments
    // where NitroModules may not be available.
    const mmkvModule = require('react-native-mmkv') as {
      createMMKV?: (config?: { id?: string }) => StorageAdapter;
    };

    if (typeof mmkvModule.createMMKV === 'function') {
      return mmkvModule.createMMKV({
        id: 'daily1percent-storage',
      });
    }
  } catch {
    // Fall back to in-memory storage when MMKV native module is unavailable.
  }

  return createMemoryStorage();
};

// Shared storage adapter across repository/store layers.
export const storage = createStorageAdapter();

const safeParse = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const serialize = <T>(value: T): string => {
  return JSON.stringify(value);
};

export const setItem = <T>(key: StorageKey, value: T): void => {
  storage.set(key, serialize(value));
};

export const getItem = <T>(key: StorageKey, fallback: T): T => {
  const rawValue = storage.getString(key);

  if (!rawValue) {
    return fallback;
  }

  return safeParse<T>(rawValue, fallback);
};

export const removeItem = (key: StorageKey): void => {
  storage.remove(key);
};

export const getPersistedHabitState = (): PersistedHabitState => {
  const habits = getItem<Habit[]>(STORAGE_KEYS.habits, []);
  const hydratedAt = getItem<number>(STORAGE_KEYS.hydratedAt, 0);
  const version = getItem<number>(STORAGE_KEYS.version, STORAGE_SCHEMA_VERSION);

  return {
    habits,
    hydratedAt,
    version,
  };
};

export const setPersistedHabitState = (state: PersistedHabitState): void => {
  setItem(STORAGE_KEYS.habits, state.habits);
  setItem(STORAGE_KEYS.hydratedAt, state.hydratedAt);
  setItem(STORAGE_KEYS.version, state.version);
};