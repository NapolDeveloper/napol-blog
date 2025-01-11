import { Text } from '@/components/ui/text';

import { Github, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto h-44 w-full max-w-[800px] bg-background pb-8">
      <div className="flex h-full w-full flex-col items-end justify-end gap-1">
        <div className="flex items-center gap-2">
          <Link href="mailto:loma1016@gmail.com">
            <Mail className="w-5 transition hover:text-blue-500" />
          </Link>
          <Link href="https://github.com/NapolDeveloper" target="__blank">
            <Github className="w-5 transition hover:text-blue-500" />
          </Link>
        </div>
        <Text size="sm" color="muted">
          © 2025.
          <strong>Napol</strong> all rights reserved.
        </Text>
      </div>
    </footer>
  );
}
