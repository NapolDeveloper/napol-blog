import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/models/post';
import { Text } from '@/components/ui/text';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import { parseCategoryName } from '@/lib/post';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <>
      <Link href={post.url}>
        <div className="group flex flex-col gap-4 p-4 sm:flex-row-reverse sm:items-center">
          {/* 이미지 */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:w-[320px] sm:flex-shrink-0">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={post.thumbnail || '/news.png'}
                alt={`thumbnail for ${post.title}`}
                sizes="50vw"
                fill
                priority
                className="rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </AspectRatio>
          </div>

          {/* 텍스트 */}
          <div className="flex flex-col justify-center">
            <Text size="sm">{parseCategoryName(post.category)}</Text>
            <Text size="xl" weight="bold" className="mb-2 mt-2 line-clamp-1 transition group-hover:text-blue-500">
              {post.title}
            </Text>
            <Text size="sm" color="muted" className="mb-4 line-clamp-2">
              {post.desc}
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
