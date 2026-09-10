# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## React Custom Hooks (Muscle Coding)

React의 렌더링 라이프사이클, useRef, useEffect 클린업 패턴 및 타입스크립트 제네릭을 체화하기 위해 직접 구현한 커스텀 훅 라이브러리입니다.

## 목차

useFocus

usePrevious

useDebounce

## 1. useFocus

💡 개념
컴포넌트가 마운트될 때 지정한 DOM 엘리먼트에 자동으로 포커스를 맞춰주는 훅입니다.

### 구현 코드

```
import { useEffect, useRef } from "react";

/**
 * 마운트 시 지정된 HTML 엘리먼트에 포커스를 지정하는 훅
 * @template T HTMLElement를 상속받는 타입 (기본값: HTMLInputElement)
 */
export function useFocus<T extends HTMLElement = HTMLInputElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}
```

🎯 핵심 학습 포인트
독립된 ref 바인딩: 훅 내부에서 새로 생성된 ref 객체를 반환하므로, 특정 <input> 또는 <button> 태그에 바인딩되어 다른 엘리먼트와 포커스 혼선이 생기지 않습니다.

제네릭 기본값 (Default Type): T extends HTMLElement = HTMLInputElement 설정을 통해 타입을 직접 명시하지 않으면 기본적으로 HTMLInputElement로 작동하며, 필요에 따라 <textarea>, <button> 등 모든 HTML 엘리먼트로 확장이 가능합니다.

## 2. usePrevious

💡 개념
렌더링 타임라인 차이를 이용해 "직전 렌더링 시점의 값"을 보관하고 반환하는 훅입니다. (과거 값과 현재 값의 Diff 비교용)

### 구현 코드

```
import { useEffect, useRef } from "react";

/**
 * 이전 렌더링 시점의 state 또는 props 값을 반환하는 훅
 * @template T 값의 타입
 * @param value 현재 상태 값
 */
export function usePrevious<T>(value: T): T | undefined {
  // TS2554 방지 및 최초 렌더링 시 undefined 보관을 위해 explicit initialValue 지정
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    // 렌더링 및 화면 수립(Paint) 완료 후, 다음 렌더링을 위해 최신 값으로 덮어씀
    ref.current = value;
  }, [value]);

  // 렌더링 타임에는 이전 useEffect 실행 시점에 저장되었던 ref.current를 반환
  return ref.current;
}
```

🎯 핵심 학습 포인트
렌더링 타임라인 활용: return ref.current는 렌더링 과정 중에 실행되고, useEffect 내부의 ref.current = value는 화면이 그려진(Paint) 후에 실행됩니다. 이 시차를 이용해 렌더링 순간에는 "이전 값"을 반환할 수 있습니다.

TS2554 타입 문제 해결: useRef<T undefined |>(undefined)처럼 undefined 인자를 명시적으로 전달해야 타입 오버로딩 에러 없이 초기값을 undefined로 설정할 수 있습니다.

## 3. useDebounce

💡 개념
연속으로 발생하는 이벤트(예: 타이핑) 중 마지막 이벤트가 발생하고 지정한 시간(delay)이 지난 후에 최종 값을 업데이트하는 훅입니다. (API 호출 최적화용)

### 구현 코드

```
import { useEffect, useState } from "react";

/**
 * 입력 값이 변경된 후 지정한 delay(ms) 동안 추가 변경이 없을 때만 값을 업데이트하는 훅
 * @template T 값의 타입
 * @param value 실시간 입력 값
 * @param delay 지연 시간 (밀리초)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 1. delay 후 상태 업데이트 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. useEffect 클린업 함수: value나 delay가 바뀌면 기존 타이머 취소
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```
