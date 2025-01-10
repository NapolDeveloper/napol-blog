import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

import { Text } from '@/components/ui/text';
import { Post } from '@/models/post';

interface Props {
  post: Post;
}

export default function PostHeader({ post }: Props) {
  return (
    <header className="mb-[50px] text-center">
      <Text as="h1" size={'4xl'} weight={'extrabold'} className="mb-5">
        {post.title}
      </Text>

      {/* 카테고리 */}
      <Link
        href={`/blog/${post.category}`}
        className="font-semibold text-blue-600 no-underline underline-offset-4 hover:underline"
      >
        {post.category}
      </Link>

      {/* 작성일 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <CalendarDays className="w-3.5 text-muted-foreground" />
        <Text size="sm" color={'muted'}>
          {post.dateString}
        </Text>
      </div>

      <hr className="mt-5" />
    </header>
  );
}
