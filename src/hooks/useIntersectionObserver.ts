import { useEffect, useState } from 'react';

/**
 * IntersectionObserver를 사용해 요소의 활성 상태를 감지하는 커스텀 훅
 * @param selectors 감지할 요소의 셀렉터 (예: 'h1, h2, h3')
 * @param options IntersectionObserver 옵션
 * @returns 활성화된 요소의 ID
 */
export function useIntersectionObserver(selectors: string, options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const elements = document.querySelectorAll(selectors);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selectors, options]);

  return activeId;
}
