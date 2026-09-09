import { useInput } from "../hooks/useInput";

export const InputVal = () => {
  const { inputVal, reset, setInput, setInputVal } = useInput();
  return (
    <article>
      <div>현재입력 {inputVal}</div>
      <input value={inputVal} onChange={(e) => setInput(e)} />
      <button onClick={reset}>초기화</button>
    </article>
  );
};
