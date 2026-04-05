import { MMKV } from 'react-native-mmkv';

// main storage instance
export const storage = new MMKV({
  id: 'daily1percent-storage',
});

// helper functions: to store and get data as JSON
export const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};