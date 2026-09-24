import { useState, useEffect, useRef, useCallback } from "react";

// 1. 더미 데이터 타입 및 가짜 API 함수 (500ms 지연)
interface Item {
  id: number;
  title: string;
}

const fetchDummyData = (page: number): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 총 5페이지까지만 데이터가 존재한다고 가정
      if (page > 5) return resolve([]);

      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: `📦 더미 데이터 아이템 ${(page - 1) * 10 + i + 1}`,
      }));
      resolve(newItems);
    }, 500);
  });
};

export function InfiniteScoll() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 2. 화면 하단 감지 대상(Target)을 가리킬 Ref
  const targetRef = useRef<HTMLDivElement | null>(null);

  // 3. 데이터 로딩 함수
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const newItems = await fetchDummyData(page);
    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  // 4. IntersectionObserver 연결
  useEffect(() => {
    if (!targetRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Target 요소가 화면에 교차(보임)되었을 때
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }, // Target 요소가 50% 이상 보일 때 이벤트 발생
    );

    // 관찰 시작
    observer.observe(targetRef.current);

    // Clean-up: 언마운트되거나 리렌더링 시 기존 관찰 해제
    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, loading]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>📜 무한 스크롤 테스트</h2>

      {/* 리스트 출력 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "20px",
              margin: "12px 0",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>

      {/* 5. Observer 관찰 대상 요소 (화면 맨 아래 배치) */}
      <div
        ref={targetRef}
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6c757d",
        }}
      >
        {loading && <p>⏳ 다음 페이지 불러오는 중...</p>}
        {!hasMore && <p>🎉 모든 데이터를 불러왔습니다!</p>}
      </div>
    </div>
  );
}
