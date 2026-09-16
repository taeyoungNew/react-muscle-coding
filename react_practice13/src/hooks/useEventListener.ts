import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: HTMLElement | Window | Document = window,
) {
  // 최신handler함수를 보관할 Ref
  const savedHandler = useRef(handler);

  // handler가 새로바뀌면 Ref의 current값만 업데이트
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Ref에 담긴 최신 handler를 실행하는 감싸개함수
    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    // 등록 Dom에 이벤트 리스너붙이기
    element.addEventListener(eventName, eventListener);

    // 클린업 언마운트 시 이벤트 떼어내기
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
