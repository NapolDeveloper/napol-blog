'use client';

import Link from 'next/link';
import ThemeToggle from '../shared/theme-toggle';

const NAV_LIST = [
  { name: 'Napol', path: '/blog' },
  { name: 'Home', path: '/home' },
  { name: 'Blog', path: '/blog' },
];

export default function Header() {
  return (
    <nav className="fixed z-40 flex w-full flex-col items-center justify-center border-b bg-background px-6 shadow-sm print:hidden">
      <div className="mx-auto flex h-[64px] w-full max-w-[800px] items-center justify-between">
        <div className="flex items-center gap-4">
          {NAV_LIST.map(item => (
            <Link href={item.path} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
