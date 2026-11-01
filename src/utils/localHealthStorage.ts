export const LOCAL_HEALTH_DATA_OWNER_KEY = 'healthcalc_local_health_owner';
export const LOCAL_HEALTH_DATA_CLEARED_EVENT = 'healthcalc:user-profile-cleared';

const isHealthDataKey = (key: string): boolean =>
  key.startsWith('hc_') ||
  key.startsWith('healthcalc_') ||
  key.startsWith('fitness-') ||
  key.startsWith('ac_triggers_') ||
  key === 'healthcalc-user' ||
  key === 'healthcalc-metrics' ||
  key === 'healthcalc-sync-status' ||
  key === 'healthcalc-daily-logs' ||
  key === 'userTDEE' ||
  key === 'userBMR';

const removeHealthDataKeys = (): void => {
  const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
    .filter((key): key is string => key !== null && isHealthDataKey(key));
  keys.forEach((key) => localStorage.removeItem(key));
};

export const getLocalHealthDataOwner = (): string | null => {
  try {
    return localStorage.getItem(LOCAL_HEALTH_DATA_OWNER_KEY);
  } catch {
    return null;
  }
};

/**
 * Clear unscoped health data and set its owner. A missing or different owner
 * is treated as untrusted legacy data, not as data that may be imported.
 */
export const ensureLocalHealthDataOwner = (userId: string | null): void => {
  const owner = userId ?? 'guest';
  try {
    if (localStorage.getItem(LOCAL_HEALTH_DATA_OWNER_KEY) !== owner) {
      clearLocalHealthDataStorage(owner);
    }
  } catch {
    // Continue without local persistence when browser storage is unavailable.
  }
};

/** Clear all health-related browser data, optionally retaining a new owner. */
export const clearLocalHealthDataStorage = (
  ownerId?: string | null,
  notify = true,
): void => {
  try {
    removeHealthDataKeys();
    if (ownerId === undefined) {
      localStorage.removeItem(LOCAL_HEALTH_DATA_OWNER_KEY);
    } else {
      localStorage.setItem(LOCAL_HEALTH_DATA_OWNER_KEY, ownerId ?? 'guest');
    }
  } catch {
    // Health data is cleared on a best-effort basis if storage is restricted.
  }

  if (notify && typeof window !== 'undefined') {
    window.dispatchEvent(new Event(LOCAL_HEALTH_DATA_CLEARED_EVENT));
  }
};
