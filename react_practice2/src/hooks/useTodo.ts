import { useState } from "react";
import type { Todo } from "../types/todoType";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;

    setTodos((prev) => [...prev, { id: Date.now(), text, complated: false }]);
  };

  const complateToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complated: !todo.complated } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    if (!id) return;
    setTodos((prev) => prev.filter((el) => el.id !== id));
  };

  return { todos, addTodo, complateToggle, deleteTodo };
};
