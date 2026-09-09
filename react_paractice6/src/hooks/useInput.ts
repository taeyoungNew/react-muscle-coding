import { useState, type ChangeEvent } from "react";

export function useInput(initalValue: string = "") {
  const [inputVal, setInputVal] = useState(initalValue);

  const setInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  //  reset = () => setInputVal("");
  const reset = () => setInputVal(initalValue);

  return { inputVal, setInputVal, setInput, reset };
}
