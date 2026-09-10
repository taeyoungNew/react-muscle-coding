import { useState } from "react";
import { usePrevious } from "./hooks/usePrevious";

function App() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <main
      style={{ padding: "32px", fontFamily: "sans-serif", lineHeight: "1.6" }}
    >
      <h2>usePrevious 테스트</h2>

      <div
        style={{
          marginBottom: "16px",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <p>
          현재 카운트: <strong>{count}</strong>
        </p>
        <p>
          이전 카운트: <strong>{prevCount ?? "undefined (최초 마운트)"}</strong>
        </p>
        <p>
          변화 방향:{" "}
          {prevCount === undefined ? (
            "초기 상태"
          ) : count > prevCount ? (
            <span style={{ color: "red" }}>▲ 증가함</span>
          ) : count < prevCount ? (
            <span style={{ color: "blue" }}>▼ 감소함</span>
          ) : (
            "-"
          )}
        </p>
      </div>

      <button onClick={() => setCount((prev) => prev + 1)}>+1 증가</button>
      <button
        onClick={() => setCount((prev) => prev - 1)}
        style={{ marginLeft: "8px" }}
      >
        -1 감소
      </button>
    </main>
  );
}
export default App;
