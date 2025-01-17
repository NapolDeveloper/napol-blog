import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // 크롤러 지정
      userAgent: '*',
      // 크롤링을 허용할 경로
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
