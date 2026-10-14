import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search?', '/api/'],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
