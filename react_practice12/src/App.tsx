import { useState } from "react";

import "./App.css";
import { useEventListener } from "./hooks/useEventListenerRow";

function App() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [lastKey, setLastKey] = useState<string>("없음");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 1. 창 크기 변경 감지 (resize)
  useEventListener("resize", () => setWindowWidth(window.innerWidth));

  // 2. 키보드 입력 감지 (keydown) - ESC 눌렀을 때 모달 닫기
  // useEventListener("escape");
  useEventListener("keydown", (event) => {
    setLastKey(event.key);

    if (event.key === "Escape") setIsModalOpen(false);
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>useEventListener 실습</h1>

      {/* 1. 창 크기 감지 테스트 */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>1. 창 크기 변경 (resize)</h2>
        <p>
          현재 창 너비: <strong>{windowWidth}px</strong>
          {window.outerHeight}
        </p>
        <small>브라우저 창 크기를 줄이거나 늘려보세요.</small>
      </section>

      <hr />

      {/* 2. 키보드 감지 및 모달 테스트 */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>2. 키보드 입력 감지 (keydown)</h2>
        <p>
          마지막으로 누른 키: <code>{lastKey}</code>
        </p>

        <button onClick={() => setIsModalOpen(true)}>모달 열기</button>

        {isModalOpen && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "2px solid #0070f3",
              borderRadius: "8px",
              backgroundColor: "#f0f7ff",
            }}
          >
            <p>💡 모달이 열렸습니다!</p>
            <p>
              <strong>ESC 키</strong>를 누르거나 아래 버튼을 누르면 닫힙니다.
            </p>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
