import { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
}

const dummyProducts: Product[] = Array.from({ length: 1000 }, (_, idx) => ({
  id: idx + 1,
  name: `상품${idx + 1}`,
  category: idx % 2 === 0 ? "전자제품" : "의류",
}));

export function ProductList() {
  const [category, setCategory] = useState("전체");
  const [isDarkMode, setIsDarkMode] = useState(false); // 💡 연산과 무관한 UI 상태 (리렌더링 유발용)

  // 🎯 문제: category가 바뀔 때만 필터링 연산이 실행되도록 useMemo를 완성하세요!
  const filteredProducts = useMemo(() => {
    console.log("🔥 [필터링 연산] 실행 중...");
    if (category === "전체") return dummyProducts;
    return dummyProducts.filter((product) => product.category === category);
  }, [
    /* 💡 빈칸: 의존성 배열에 무엇이 들어가야 할까요? */
    category,
  ]);

  return (
    <div
      style={{
        background: isDarkMode ? "#222" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        padding: "20px",
      }}
    >
      {/* 1. 카테고리 변경 (연산과 관련된 상태) */}
      <button onClick={() => setCategory("전체")}>전체</button>
      <button onClick={() => setCategory("전자제품")}>전자제품</button>
      <button onClick={() => setCategory("의류")}>의류</button>

      {/* 2. 테마 변경 (연산과 무관한 상태 - 리렌더링 발생) */}
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        테마 변경 ({isDarkMode ? "다크" : "라이트"})
      </button>

      <p>
        현재 카테고리: {category} (총 {filteredProducts.length}개)
      </p>
    </div>
  );
}
