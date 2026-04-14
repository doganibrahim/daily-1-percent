export const STORAGE_SCHEMA_VERSION = 1;

export const STORAGE_KEYS = {
  habits: 'habits',
  hydratedAt: 'hydratedAt',
  version: 'version',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
