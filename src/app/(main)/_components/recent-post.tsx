import { Text } from '@/components/ui/text';
import { getPostList } from '@/lib/post';
import PostCard from './post-card';

export default async function RecentPost() {
  const postList = (await getPostList()).splice(0, 3);

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <Text size="xl" weight="bold" className="border-b border-white">
        Recent Posts
      </Text>
      <ul className="mt-6 grid grid-cols-1 gap-6">
        {postList.map(post => (
          <li key={post.date + post.url}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
