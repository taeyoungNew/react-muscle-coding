import { useState } from "react";

/**
 * 모달 열기/닫기, 드롭다운, 비밀번호 숨김/보임 등 Boolean 상태를 뒤집는 훅
 * @param value
 * @param limit
 */
export function useToggle(initialValue: boolean = false) {
  const [isOpen, toggleOpen] = useState(initialValue);

  const setToggle = () => {
    toggleOpen((prev) => !prev);
  };

  return [isOpen, setToggle] as const;
}
