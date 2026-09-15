import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Lazy Initialization: 첫 렌더링 시에만 localStorage를 읽음 (무한 루프 방지)
  const [storagedValue, setStoragedValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`localStorage 읽기 실패 ${key}`, error);
      return initialValue;
    }
  });

  // 2. storagedValue나 key가 바뀔때만 localStorage동기화
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storagedValue));
    } catch (error) {
      console.error(`localStorage 저장 실패 (${key}):`, error);
    }
  }, [key, storagedValue]);

  return [storagedValue, setStoragedValue] as const;
}
