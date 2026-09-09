import { useQuantity } from "./hooks/useQuantity";

import "./App.css";

function App() {
  const { decrease, increase, isMax, isMin, quantity, reset } = useQuantity();

  const imcreaseFuc = () => {
    increase();
  };

  const decreaseFuc = () => {
    decrease();
  };

  const restFunc = () => {
    reset();
  };

  return (
    <>
      <h3>현재수량 : {quantity}</h3>
      <div>
        <button disabled={isMax} onClick={() => imcreaseFuc()}>
          수량 +
        </button>
        <button disabled={isMin} onClick={() => decreaseFuc()}>
          수량 -
        </button>
        <button onClick={() => restFunc()}>리셋</button>
      </div>
    </>
  );
}

export default App;
