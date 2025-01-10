import { getPostList } from '@/lib/post';
import PostCard from './post-card';

export default async function PostList() {
  const postList = await getPostList();

  return (
    <section className="mx-auto w-full max-w-[1200px] px-0 sm:px-6">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {postList.map(post => (
          <li key={post.date + post.url}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
