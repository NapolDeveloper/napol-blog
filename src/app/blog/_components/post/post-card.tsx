import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/models/post';
import { Text } from '@/components/ui/text';

import { CalendarDays } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link href={post.url}>
      <div className="group flex cursor-pointer flex-col">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9}>
            <Image
              // !TODO 추후 썸네일 추가시 주석 해제
              // src={post.thumbnail}
              src={'/news.png'}
              alt={`thumbnail for ${post.title}`}
              sizes="(max-width: 1000px) 50vw, 450px"
              fill
              priority
              className="rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <div className="mt-6 flex flex-col">
          <Text size="2xl" weight="bold" className="mb-1 line-clamp-2">
            {post.title}
          </Text>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-3.5 text-muted-foreground" />
            <Text size="sm" color={'muted'}>
              {post.dateString}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
}
