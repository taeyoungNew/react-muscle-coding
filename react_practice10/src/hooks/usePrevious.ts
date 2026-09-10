import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T | undefined) {
  // 1. useRef 생성 (기본값 없음/undefined)
  const ref = useRef<T>(value);

  // 2. useEffect로 화면 그려진 후 ref.current 갱신
  useEffect(() => {
    ref.current = value;
  }, [value]); // <= value가 변하면 ref의 현재 값을 변경

  // 3. 렌더링 타임에는 ref.current 반환
  return ref.current;
}
