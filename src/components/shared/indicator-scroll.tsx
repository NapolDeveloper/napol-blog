'use client';

import { useState, useEffect } from 'react';

export default function IndicatorScroll() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY; // 현재 스크롤 위치
      const scrollHeight = document.body.scrollHeight - window.innerHeight; // 전체 스크롤 가능한 높이
      if (scrollHeight) {
        setCompletion((currentProgress / scrollHeight) * 100); // 완료율 계산
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 w-full">
      <div
        style={{ width: `${completion}%` }} // completion 값을 기반으로 width 조정
        className="h-1 bg-blue-400"
      />
    </div>
  );
}
