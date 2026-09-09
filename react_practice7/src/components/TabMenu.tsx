import type { ChangeEvent } from "react";
import { useTabs } from "../hooks/useTabs";

const content = [
  { tab: "섹션 1", content: "첫 번째 탭의 상세 내용입니다." },
  { tab: "섹션 2", content: "두 번째 탭의 상세 내용입니다." },
];

export const TabMenu = () => {
  const { changeIndex, currentItem } = useTabs(0, content);

  return (
    <article>
      <header>
        <ul style={{ display: "flex" }}>
          {content.map((el, index) => {
            return (
              <li key={el.tab}>
                <button onClick={() => changeIndex(index)}>{el.tab}</button>
              </li>
            );
          })}
        </ul>
      </header>
      {currentItem!.content}
    </article>
  );
};
