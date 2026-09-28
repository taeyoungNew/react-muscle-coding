import { useReducer } from "react";

// 1단계: State 및 Action 타입 정의
interface State {
  count: number;
  error: string | null;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

// 2단계: Reducer 함수 작성 (컴포넌트 외부에 작성!)
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1, error: null };
    case "DECREMENT":
      return { ...state, count: state.count - 1, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return { count: 0, error: null };
    default:
      return state;
  }
}

export function CounterWithReducer() {
  // [현재 상태, 디스패치 함수] = useReducer(리듀서함수, 초기상태)
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    error: null,
  });

  return (
    <div>
      <h3>카운트: {state.count}</h3>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      {/* dispatch로 Action 객체를 전달! */}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>초기화</button>
      <button
        onClick={() =>
          dispatch({ type: "SET_ERROR", payload: "강제 에러 발생!" })
        }
      >
        에러 발생
      </button>
    </div>
  );
}
