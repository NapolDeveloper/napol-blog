import Link from 'next/link';
import { Calendar } from 'lucide-react';

import { Text } from '@/components/ui/text';
import { Post } from '@/models/post';
import PostTagBadge from '@/components/shared/post-tag-badge';
import { parseCategoryName } from '@/lib/post';

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
        {parseCategoryName(post.category)}
      </Link>

      {/* 작성일 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <Calendar className="w-3.5 text-muted-foreground" />
        <Text size="sm" color={'muted'}>
          {post.dateString}
        </Text>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {post.tag.map((tag, index) => (
          <PostTagBadge key={tag + index}>{tag}</PostTagBadge>
        ))}
      </div>

      <hr className="mt-5" />
    </header>
  );
}
