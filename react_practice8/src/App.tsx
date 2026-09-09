import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // 사용법은 useState와 완전히 동일함!
  // key 이름인 "isDarkMode"로 스토리지에 저장됨
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#222" : "#fff",
        color: isDarkMode ? "#fff" : "#222",
      }}
    >
      <h1>{isDarkMode ? "다크 모드 🌙" : "라이트 모드 ☀️"}</h1>

      <button onClick={() => setIsDarkMode((prev) => !prev)}>테마 변경</button>
    </div>
  );
}

export default App;
