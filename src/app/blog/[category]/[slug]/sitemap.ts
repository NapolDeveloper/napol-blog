import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getPostList } from '@/lib/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postList = await getPostList();

  return postList.map(post => ({
    url: `${siteConfig.url}${post.url}`,
    lastModified: post.date,
  }));
}
