import { useEffect, useRef } from "react";

export function useFocus<T extends HTMLElement = HTMLInputElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}
