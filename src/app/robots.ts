import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/celebrity-image/',
          // P1-6 Fix: Allow /search so SearchAction (JSON-LD) is not contradicted.
          // The search results page has a canonical + noindex so it won't pollute index.
          '/search',
        ],
        disallow: [
          '/search?',    // Block query-string search URLs from index (but allow the page itself)
          '/api/cron/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/api/celebrity-image/', '/public/', '/starsbio-watermark.png'],
        disallow: [],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
