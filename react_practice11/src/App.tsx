import "./App.css";

import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <main
      style={{ padding: "32px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h2>useDebounce 테스트</h2>

      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="search"
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          검색어 입력 (Delay: 500ms)
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 빠르게 입력해 보세요..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          background: "#f8f9fa",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
          ⚡ <strong>실시간 입력값:</strong>{" "}
          {searchTerm || <span style={{ color: "#aaa" }}>(입력 없음)</span>}
        </p>
        <p style={{ margin: 0 }}>
          🐢 <strong>디바운스된 값 (API 호출용):</strong>{" "}
          <span style={{ color: "#0284c7", fontWeight: "bold" }}>
            {debouncedSearchTerm || (
              <span style={{ color: "#aaa" }}>(대기 중)</span>
            )}
          </span>
        </p>
      </div>
    </main>
  );
}

export default App;
