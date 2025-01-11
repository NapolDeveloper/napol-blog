'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="outline" size="icon" onClick={handleChangeTheme}>
      {theme === 'dark' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'light' && <Moon className="absolute h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}
