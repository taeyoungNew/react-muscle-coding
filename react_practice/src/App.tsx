import { useState } from "react";
import "./App.css";
import { usePosts } from "./hooks/useTodos";

function App() {
  const { data, loading, error } = usePosts();
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <h1>게시글 목록</h1>
      {data.map((todo) => {
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
        </div>;
      })}
    </>
  );
}

export default App;
