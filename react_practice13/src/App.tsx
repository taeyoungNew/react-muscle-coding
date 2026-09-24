import { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { useFocus } from "./hooks/useFocus";
import { usePrevious } from "./hooks/usePrevious";
import { useDebounce } from "./hooks/useDebounce";
import { InfiniteScoll } from "./components/InfiniteScroll";

function App<T>() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [crrtVal, setCrrtVal] = useState("");
  const preVal = usePrevious(crrtVal);
  const [inputVal, onChangeVal] = useState("");

  const debounce = useDebounce(inputVal, 400);
  // useEffect(() => {

  // }, [inputVal])

  const entryValue = (formData: FormData) => {
    const inputVal = String(formData.get("inputVal"));
    if (!inputVal) return;
    setCrrtVal(inputVal);
  };

  return (
    <>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>useThrottle실습</h1>
        <InfiniteScoll />

        <hr />

        <h1>useDebounce실습</h1>
        <p>{debounce}</p>
        <input type="text" onChange={(e) => onChangeVal(e.target.value)} />

        <hr />
        <h1>previous실습</h1>
        <div>crrValue: {crrtVal}</div>
        <div>preValue: {preVal}</div>
        <form action={entryValue}>
          <input type="text" name="inputVal" />
          <button type="submit">버튼</button>
        </form>
        <hr />
        <h1>포커스 실습</h1>
        <input type="text" ref={focus} />
        <hr />
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
