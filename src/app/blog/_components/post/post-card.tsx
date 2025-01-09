import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Post } from '@/models/post';
import { Text } from '@/components/ui/text';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link href={post.url}>
      <Card>
        {/* 이미지 영역 */}
        <CardContent className="p-0">
          <div className="relative aspect-video w-full rounded-t-md border-b">
            <Image
              src={post.thumbnail}
              alt={`thumbnail for ${post.title}`}
              sizes="(max-width: 1000px) 50vw, 450px"
              fill
              priority
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex flex-col">
            <Text>{post.category}</Text>
            <Text size="lg" weight="bold" className="mb-2">
              {post.title}
            </Text>
            <Text size="sm">{post.dateString}</Text>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
