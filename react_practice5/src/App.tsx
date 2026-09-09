import "./App.css";
import { useInput } from "./hooks/useInputs";

function App() {
  const { form, reset, onChange } = useInput({ username: "", password: "" });
  return (
    <div>
      <h3>로그인 폼</h3>
      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="아이디"
      />

      <input
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="패스워드"
      />

      <button onClick={reset}>초기화</button>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

export default App;
