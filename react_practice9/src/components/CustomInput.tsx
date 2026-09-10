import { useFocus } from "../hooks/useFocus";

export function CustomInput() {
  const ref1 = useFocus();

  return (
    <article>
      <input ref={ref1} type="text" />
    </article>
  );
}
