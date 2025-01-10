import { getPostList } from '@/lib/post';
import PostCard from './post-card';

export default async function PostList() {
  const postList = await getPostList();

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {postList.map(post => (
          <li key={post.date + post.url}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
