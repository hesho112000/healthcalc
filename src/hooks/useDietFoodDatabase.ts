import { useEffect, useState } from 'react';
import { loadDietFoodDatabase, loadFilipinoFoodDatabase } from '../utils/calculations';

/** Starts loading the optional diet datasets after a consuming page mounts. */
export const useDietFoodDatabase = (includeFilipino = false, enabled = true): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    if (!enabled) {
      setReady(false);
      return () => {
        active = false;
      };
    }

    setReady(false);
    const loaders = [loadDietFoodDatabase()];
    if (includeFilipino) loaders.push(loadFilipinoFoodDatabase());
    void Promise.all(loaders)
      .catch(() => undefined)
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [enabled, includeFilipino]);

  return ready;
};
