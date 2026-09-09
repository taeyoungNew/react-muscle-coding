import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storageVal, setStorageVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`로컬스토리지에 저장실패 key: ${key}, `, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStorageVal(value);

      window.localStorage.setItem(key, JSON.stringify(storageVal));
    } catch (error) {
      console.error(`localStorage 쓰기 실패 (key: ${key}):`, error);
    }
  };

  return [storageVal, setValue] as const;
}
