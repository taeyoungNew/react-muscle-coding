import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>1단계: 모달 실습</h1>
        <button onClick={() => setIsModalOpen(true)}>모달 열기</button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>완성도 높은 모달</h2>
          <p>
            HTML5 &lt;dialog&gt; 기반이라 별도의 z-index 없이도 최상단에 뜹니다.
          </p>
          <p>
            키보드 <strong>ESC</strong>를 누르면 useEventListener가 감지하여
            닫아줍니다.
          </p>
        </Modal>
      </main>
    </>
  );
}

export default App;
