import { useEffect, useMemo, useState } from "react";

const dethunkify = (value) => (typeof value === "function" ? value() : value);

const useStorage = (getStorage, key, initialValue, errorCallback) => {
  const storage = useMemo(() => {
    try {
      return getStorage();
    } catch {}

    return null;
  }, [getStorage]);

  const [value, setValue] = useState(() => {
    const serializedValue = storage?.getItem(key);

    if (serializedValue == null) {
      return dethunkify(initialValue);
    }

    try {
      return JSON.parse(serializedValue);
    } catch {
      return serializedValue;
    }
  });

  useEffect(() => {
    if (storage) {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (error) {
        errorCallback?.(error);
      }
    }
  }, [errorCallback, key, storage, value]);

  return [value, setValue];
};

const getLocalStorage = () => localStorage;

const useLocalStorage = (key, initialValue, errorCallback) =>
  useStorage(getLocalStorage, key, initialValue, errorCallback);
