import { getPostDetail, getPostPaths, parsePostInfo, parseToc } from '@/lib/post';
import PostBody from '../../_components/post/post-body';
import PostHeader from '../../_components/post/post-header';
import TableOfContent from '../../_components/post/table-of-content-sidebar';

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
  const toc = parseToc(post.content);

  return (
    <div className="prose mx-auto w-full max-w-[800px] px-0 dark:prose-invert">
      <PostHeader post={post} />
      <article className="relative">
        <PostBody post={post} />
        <TableOfContent toc={toc} />
      </article>
    </div>
  );
}
