import { getPostList } from '@/lib/post';
import PostCard from './post-card';

interface Props {
  category?: string;
}

export default async function PostList({ category }: Props) {
  const postList = await getPostList(category);

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {postList.map(post => (
          <li key={post.date + post.url}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
