import { Text } from '@/components/ui/text';
import { getPostByPath } from '@/lib/post';
import PostCard from './post-card';

const Main = [
  'src/posts/dev/biome/content.mdx',
  'src/posts/deep_dive/seo/content.mdx',
  'src/posts/deep_dive/hoisting/content.mdx',
];

export default async function MainPost() {
  const postList = await Promise.all(Main.map(path => getPostByPath(path)));
  console.log(postList);

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <Text size="xl" weight="bold" className="border-b border-white">
        Main Posts
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
