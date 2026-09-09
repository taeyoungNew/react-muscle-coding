import { useState } from "react";

interface ToggleProps {
  initalValue: boolean;
}

export function useToggles(options: ToggleProps = { initalValue: false }) {
  const { initalValue } = options;
  const [toggle, setToggle] = useState(initalValue);

  const toggleFunc = () => {
    setToggle((prev) => !prev);
  };

  const setTrue = () => {
    setToggle(true);
  };

  const setFalse = () => {
    setToggle(false);
  };

  return { toggleFunc, toggle, setTrue, setFalse };
}
