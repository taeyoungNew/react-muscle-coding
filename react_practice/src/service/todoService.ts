import type { TodoType } from "../types/todo";

export const fetchTodos = (): Promise<TodoType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "첫 번째 글", content: "리액트 연습 시작" },
        { id: 2, title: "두 번째 글", content: "머슬 메모리 완성하기" },
      ]);
    }, 1000);
  });
};
