import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { parseCategoryName } from '@/lib/post';
import { Post } from '@/models/post';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <>
      <Link href={post.url}>
        <div className="group flex flex-col gap-4">
          {/* 이미지 */}
          <div className="relative aspect-video w-full overflow-hidden rounded-md sm:w-[240px] sm:flex-shrink-0">
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

          <div className="flex-col">
            <Text size="sm" color="muted">
              {parseCategoryName(post.category)}
            </Text>
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
