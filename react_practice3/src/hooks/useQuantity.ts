// useQuantity.ts
import { useState } from "react";

export interface UseQuantityOptions {
  initial?: number;
  min?: number;
  max?: number;
}

export interface UseQuantityReturn {
  quantity: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  isMin: boolean;
  isMax: boolean;
}

export function useQuantity(
  options: UseQuantityOptions = {},
): UseQuantityReturn {
  const { initial = 1, min = 1, max = 10 } = options;

  // 1. 수량 상태 정의 (초기값: initial)
  const [quantity, setQuantity] = useState<number>(initial);

  // 2. 수량 +1 (max를 넘지 못하도록 조건문 작성)
  const increase = () => {
    // TODO: 구현하기
    setQuantity((prev) => (prev >= max ? prev : prev + 1));
  };

  // 3. 수량 -1 (min 미만으로 내려가지 못하도록 조건문 작성)
  const decrease = () => {
    // TODO: 구현하기
    setQuantity((prev) => (prev <= min ? prev : prev - 1));
  };

  // 4. 초기값(initial)으로 리셋
  const reset = () => {
    // TODO: 구현하기
    setQuantity(initial);
  };

  // 5. 버튼 disabled 상태 판단용 불리언값
  const isMin = quantity <= min; // TODO: quantity가 min 이하인지 확인
  const isMax = quantity >= max; // TODO: quantity가 max 이상인지 확인

  return {
    quantity,
    increase,
    decrease,
    reset,
    isMin,
    isMax,
  };
}
