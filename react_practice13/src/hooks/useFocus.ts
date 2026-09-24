import { useEffect, useRef } from "react";

export function useFocus<T extends HTMLElement = HTMLInputElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;

    ref.current?.focus();

    return () => {};
  }, [ref]);

  return ref;
}
