import { useState } from "react";

export function useTabs<T>(initalIndex: number = 0, allTabs: T[]) {
  const [currentIndex, setCurrentIndex] = useState(initalIndex);

  const currentItem = allTabs.length > 0 ? allTabs[currentIndex] : null;

  const changeIndex = (index: number) => {
    if (index >= 0 && allTabs.length > index) setCurrentIndex(index);
  };

  return { changeIndex, currentItem };
}
