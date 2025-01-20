import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/models/post';
import { Text } from '@/components/ui/text';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Calendar } from 'lucide-react';
import { parseCategoryName } from '@/lib/post';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <>
      <Link href={post.url}>
        <div className="group flex cursor-pointer flex-col gap-4 sm:flex-row">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <AspectRatio ratio={16 / 9}>
              <Image
                // !TODO 추후 썸네일 추가시 주석 해제
                src={post.thumbnail || '/news.png'}
                alt={`thumbnail for ${post.title}`}
                sizes="(max-width: 350px), 10vw, 350px 100px"
                fill
                priority
                className="rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col justify-center">
            <Text size="sm">{parseCategoryName(post.category)}</Text>
            <Text size="2xl" weight="bold" className="mt-2 line-clamp-1 transition group-hover:text-blue-500">
              {post.title}
            </Text>
            <Text size="sm" color="muted" className="line-clamp-2">
              {post.desc}
            </Text>
            <div className="mt-4 flex items-center gap-1">
              <Calendar className="w-3.5 text-muted-foreground" />
              <Text size="sm" color={'muted'}>
                {post.dateString}
              </Text>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
