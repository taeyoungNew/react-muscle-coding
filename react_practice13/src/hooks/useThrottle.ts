import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, limit: number): T {
  // 1. 화면갱신용상태
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. 마지막 실행 시각을 보관할 ref(리랜더링 X)
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const elapsedTime = now - lastRan.current; // 경과 시간
    const remainingTime = limit - elapsedTime; // 남은 대기 시간

    // 3. 타이머 설정
    const handler = setTimeout(
      () => {
        // 빈칸 2: 대기 시간이 끝났을 때 실행 조건 확인 후
        // throttledValue 갱신 & lastRan.current 최신화
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      } /* 빈칸 3: 얼만큼 기다린 후 실행할지? */,
      remainingTime,
    );

    // 4. 클린업
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
