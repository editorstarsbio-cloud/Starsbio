import { MetadataRoute } from 'next';
import { getAllCelebrities, getAllCategories } from '@/lib/repository';
import { ZODIAC_SIGNS, SITE_CONFIG } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl;
  const now = new Date();

  // Core static discovery pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/birthdays`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog/who-is-shah-rukh-khan-biography-net-worth-family-awards`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/category`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/zodiac`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/in-memoriam`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/editorial-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/corrections-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/data-sources`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 365 Daily Birthday Calendar Pages (e.g. /birthdays/10/13)
  const birthdayDayRoutes: MetadataRoute.Sitemap = [];
  const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= daysInMonths[m - 1]; d++) {
      birthdayDayRoutes.push({
        url: `${baseUrl}/birthdays/${m}/${d}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // All 192 Categories
  const categories = await getAllCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Zodiac sign pages
  const zodiacRoutes: MetadataRoute.Sitemap = Object.keys(ZODIAC_SIGNS).map((sign) => ({
    url: `${baseUrl}/zodiac/${sign.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // ALL Celebrities (Complete 17,490 profile index so Google discovers EVERY single page)
  const allCelebrities = await getAllCelebrities();
  const profileRoutes: MetadataRoute.Sitemap = allCelebrities.map((c) => ({
    url: `${baseUrl}/people/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : now,
    changeFrequency: 'weekly',
    priority: c.image_url ? 0.9 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...zodiacRoutes,
    ...birthdayDayRoutes,
    ...profileRoutes,
  ];
}
