import "./App.css";
import { useToggles } from "./hooks/useToggle";

function App() {
  const { toggle, setFalse, setTrue, toggleFunc } = useToggles();

  const toggleButton = () => {
    toggleFunc();
  };

  const openButton = () => {
    setTrue();
  };

  const closeButton = () => {
    setFalse();
  };

  return (
    <>
      <h3>토글 여닫이</h3>
      <button onClick={toggleButton}>토글버튼</button>
      <button onClick={openButton}>토글열기</button>
      <button onClick={closeButton}>토글닫기</button>
      <div>
        {toggle ? <span>닫기</span> : <span>열기</span>}{" "}
        {<div style={{ display: toggle ? "block" : "none" }}>토글내용</div>}
      </div>
    </>
  );
}

export default App;
