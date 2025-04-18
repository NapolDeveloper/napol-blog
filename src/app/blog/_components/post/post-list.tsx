import { getCategoryDetailList, getPostList } from '@/lib/post';
import PostCard from './post-card';
import CategoryList from '../../[category]/_components/category/category-list';

interface Props {
  category?: string;
}

export default async function PostList({ category }: Props) {
  const postList = await getPostList(category);
  const categoryList = getCategoryDetailList();
  console.log(postList);

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <section className="mb-10">
        <CategoryList categoryList={categoryList} />
      </section>

      <ul className="grid grid-cols-1 gap-6">
        {postList.map(post => (
          <li key={post.date + post.url}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
