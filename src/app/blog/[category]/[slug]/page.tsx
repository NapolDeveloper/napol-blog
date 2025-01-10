import { getPostDetail, getPostPaths, parsePostInfo } from '@/lib/post';
import PostBody from '../../_components/post/post-body';
import PostHeader from '../../_components/post/post-header';

interface Props {
  params: Promise<{ slug: string; category: string }>;
}

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map(path => parsePostInfo(path))
    .map(item => ({
      category: item.category,
      slug: item.slug,
    }));
  return paramList;
}

export default async function PostDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const category = (await params).category;

  const post = await getPostDetail(category, slug);

  return (
    <div className="prose dark:prose-invert mx-auto w-full max-w-[800px] px-0 sm:px-6">
      <PostHeader post={post} />
      <article className="">
        <PostBody post={post} />
      </article>
    </div>
  );
}
