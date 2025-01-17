import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getCategoryList, getPostList } from '@/lib/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryList = getCategoryList();
  const postList = await getPostList();

  const generatedCategorySitemap = categoryList.map(category => ({
    url: `${siteConfig.url}/blog/${category}`,
    lastModified: new Date(),
  }));

  const generatedPostSitemap = postList.map(post => ({
    url: `${siteConfig.url}${post.url}`,
    lastModified: post.date,
  }));

  return [...generatedCategorySitemap, ...generatedPostSitemap];
}
