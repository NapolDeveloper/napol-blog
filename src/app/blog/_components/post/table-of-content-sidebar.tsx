'use client';

import { useHeaderObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { HeadingItem } from '@/models/post';

interface Props {
  toc: HeadingItem[];
}

export default function TableOfContent({ toc }: Props) {
  const { activeHierarchy } = useHeaderObserver('h1, h2, h3', {
    root: null,
    rootMargin: '0px 0px -80% 0px',
    threshold: 0,
  });

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    event.preventDefault();
    const target = document.querySelector(link);
    if (target) {
      const yOffset = 80; // 상단 고정 헤더 간격
      const y = target.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside className="not-prose absolute -top-[200px] left-full hidden h-[calc(100%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-12 mt-[200px] w-[200px]">
        <div className="mb-4 border-l pl-4">
          <div className="mb-2 font-bold text-gray-700 dark:text-gray-200">On this page</div>
          <ul className="text-sm">
            {toc.map(item => {
              const isH3 = item.indent === 1;
              const isActive = activeHierarchy.includes(item.link.slice(1)); // 계층 구조에서 활성화 상태 확인
              return (
                <li
                  key={item.link}
                  className={cn(
                    isH3 && 'ml-4',
                    isActive && 'font-bold text-blue-500',
                    'py-1 transition hover:text-blue-500'
                  )}
                >
                  <a href={item.link} onClick={e => handleLinkClick(e, item.link)}>
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
