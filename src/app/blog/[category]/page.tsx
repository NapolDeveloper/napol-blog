import { Metadata } from 'next';

import PostList from '../_components/post/post-list';
import { getCategoryList, parseCategoryName } from '@/lib/post';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map(category => ({ category }));
  return paramList;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const parsedCategoryName = parseCategoryName(category);

  const title = `${parsedCategoryName} | ${siteConfig.name}`;

  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      title,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = (await params).category;

  return (
    <>
      <PostList category={category} />
    </>
  );
}
