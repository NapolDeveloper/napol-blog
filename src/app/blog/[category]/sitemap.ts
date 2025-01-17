import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getCategoryList } from '@/lib/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryList = getCategoryList();

  return categoryList.map(category => ({
    url: `${siteConfig.url}/blog/${category}`,
    lastModified: new Date(),
  }));
}
