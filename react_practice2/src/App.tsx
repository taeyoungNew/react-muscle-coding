import { useTodo } from "./hooks/useTodo";
import "./App.css";
import { useState, type ReactElement } from "react";

function App() {
  const { addTodo, complateToggle, deleteTodo, todos } = useTodo();
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleComplated = (id: number) => {
    complateToggle(id);
  };
  return (
    <div>
      <h3>add todo</h3>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />{" "}
        <button type="submit">추가</button>
      </form>
      <h3>todo list</h3>
      <ul>
        {todos.map((todo) => (
          <li
            style={{ display: "flex", width: "100%", gap: "1em" }}
            key={todo.id}
          >
            content: {todo.text}{" "}
            <button onClick={() => handleComplated(todo.id)}>
              {" "}
              {todo.complated ? "완료" : "미완료"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
