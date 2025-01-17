import { Metadata } from 'next';

import { getPostDetail, getPostPaths, parsePostInfo, parseToc } from '@/lib/post';

import PostBody from '../../_components/post/post-body';
import PostHeader from '../../_components/post/post-header';
import TableOfContent from '../../_components/post/table-of-content-sidebar';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string; category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  const post = await getPostDetail(category, slug);

  const title = `${post.title}`;
  const imageUrl = `${siteConfig.url}${post.thumbnail}`;

  return {
    title,
    description: post.desc,

    openGraph: {
      title,
      description: post.desc,
      type: 'article',
      publishedTime: post.date.toISOString(),
      url: `${siteConfig.url}${post.url}`,
      images: [imageUrl],
    },
    twitter: {
      title,
      description: post.desc,
      images: [imageUrl],
    },
  };
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
    <div className="prose mx-auto w-full max-w-[800px] dark:prose-invert">
      <PostHeader post={post} />
      <article className="relative">
        <PostBody post={post} />
        <TableOfContent toc={toc} />
      </article>
    </div>
  );
}
