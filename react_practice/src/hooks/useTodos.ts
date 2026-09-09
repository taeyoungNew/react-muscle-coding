import { useState, useEffect } from "react";
import type { TodoType } from "../types/todo";
import { fetchTodos } from "../service/todoService";

export const usePosts = () => {
  const [data, setData] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTodos()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
