import { Text } from '@/components/ui/text';
import { Post } from '@/models/post';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <>
      <Link href={post.url}>
        <div className="group flex gap-4">
          <div className="flex-col">
            <Text size="lg" weight="bold" className="mb-1.5 line-clamp-2 transition group-hover:text-blue-500">
              {post.title}
            </Text>
            <Text size="sm" color={'muted'}>
              {post.dateString}
            </Text>
          </div>
        </div>
      </Link>
    </>
  );
}
