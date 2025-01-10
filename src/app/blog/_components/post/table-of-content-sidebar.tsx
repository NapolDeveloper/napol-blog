'use client';

import { cn } from '@/lib/utils';
import { HeadingItem } from '@/models/post';
import Link from 'next/link';

interface Props {
  toc: HeadingItem[];
}

export default function TableOfContent({ toc }: Props) {
  return (
    <aside className="not-prose absolute -top-[200px] left-full hidden h-[calc(100%+150px)] lg:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-20 mt-[200px] w-[200px]">
        <div className="mb-4 border-l pl-4">
          <div className="mb-2 font-bold text-gray-700 dark:text-gray-200">On this page</div>
          <ul className="text-sm">
            {toc.map(item => {
              const isH3 = item.indent === 1;
              return (
                <li key={item.link} className={cn(isH3 && 'ml-4', 'py-1 transition hover:text-blue-500')}>
                  <Link href={item.link}>{item.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
