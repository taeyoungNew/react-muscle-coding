import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: HTMLElement | Window | Document = window, // default param으로 되어있기때문에 에러가안뜸
) {
  // 최신 handler 함수를 보관할 Ref (이벤트 재등록 방지용)
  const savedHandler = useRef(handler);

  // handler가 새로 바뀌면 Ref의 current값만 업데이트
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Ref에 담긴 최신 handler를 실행하는 감싸개함수
    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    // 등록Dom에 이벤트 리스너붙이기
    element.addEventListener(eventName, eventListener);

    // 클린업 언마운트 시 이벤트 떼어내기
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
