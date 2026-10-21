import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/celebrity-image/'],
        disallow: ['/search?', '/api/cron/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/api/celebrity-image/', '/public/', '/starsbio-watermark.png'],
        disallow: [],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
