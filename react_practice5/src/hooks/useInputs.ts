import { useState, type ChangeEvent } from "react";

// <T extentds Record<string, nay>> => 제네릭타입의 T인데
// 아무타입이나 넣지말고 최소한 Record<string, any>형태(키: 문자열, 값: 객체)의 값만 허용하겠다는 뜻
export function useInput<T extends Record<string, any>>(initalFrom: T) {
  const [form, setForm] = useState<T>(initalFrom);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setForm(initalFrom);

  return { form, onChange, reset };
}
