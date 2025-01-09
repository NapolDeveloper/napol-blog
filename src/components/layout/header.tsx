'use client';
import Link from 'next/link';
import { ModeToggle } from '../shared/mode-toggle';

const NAV_LIST = [
  { name: 'Napol', path: '/blog' },
  { name: '', path: '/about' },
];

export default function Header() {
  return (
    <nav className="fixed z-40 flex w-full flex-col items-center justify-center border-b bg-background shadow-sm print:hidden">
      <div className="flex h-[64px] w-full items-center justify-between px-12">
        {NAV_LIST.map(item => (
          <Link href={item.path} key={item.name}>
            {item.name}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
}
