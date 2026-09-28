import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { ProductList } from "./mocks/ProductList";
import { CounterWithReducer } from "./mocks/CounterWithReducer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>useReducer연습</h1>
      <CounterWithReducer />
      <hr />
      <h1>useMemo연습</h1>
      <ProductList />
    </>
  );
}

export default App;
