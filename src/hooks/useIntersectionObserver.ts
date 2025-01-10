import { useEffect, useState } from 'react';

/**
 * 헤더의 활성 상태와 계층 구조를 추적하는 커스텀 훅
 * @param selectors 감지할 헤더 태그의 셀렉터 (예: 'h1, h2, h3')
 * @param options IntersectionObserver 옵션
 * @returns 활성화된 헤더 ID와 계층 구조
 */
export function useHeaderObserver(selectors: string, options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeHierarchy, setActiveHierarchy] = useState<string[]>([]); // 활성화된 헤더 계층

  useEffect(() => {
    const elements = document.querySelectorAll(selectors);
    const observerOptions = {
      root: options?.root || null,
      rootMargin: options?.rootMargin || '0px 0px -80% 0px',
      threshold: options?.threshold || 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleHeaders: { id: string; level: number }[] = [];

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = parseInt(entry.target.tagName[1]); // h1, h2, h3 등에서 숫자 추출
          visibleHeaders.push({ id: entry.target.id, level });
        }
      });

      if (visibleHeaders.length > 0) {
        const sortedHeaders = visibleHeaders.sort((a, b) => a.level - b.level); // 가장 상위 헤더 우선
        setActiveId(sortedHeaders[0].id); // 현재 활성화된 헤더 ID 설정
        setActiveHierarchy(sortedHeaders.map(header => header.id)); // 계층 구조 업데이트
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(el => observer.observe(el));

    // 새로고침 시 초기 상태 복원
    const initialVisibleHeader = Array.from(elements).find(
      el => el.getBoundingClientRect().top >= 0 && el.getBoundingClientRect().top < window.innerHeight
    );
    if (initialVisibleHeader) {
      setActiveId(initialVisibleHeader.id);
      setActiveHierarchy([initialVisibleHeader.id]);
    }

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selectors, options]);

  return { activeId, activeHierarchy };
}
