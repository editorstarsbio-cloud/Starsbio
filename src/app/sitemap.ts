import { MetadataRoute } from 'next';
import { getCalculators, categories } from '@/calculators';
import { getArticles, blogCategories } from '@/content/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.allcalctool.com';
  
  const allCalculators = await getCalculators();
  const publishedCalcs = allCalculators.filter(c => c.status === 'published');
  
  const allArticles = await getArticles();
  const publishedArticles = allArticles.filter(a => a.status === 'published');

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/category/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Calculator Pages
  for (const calc of publishedCalcs) {
    routes.push({
      url: `${baseUrl}/${calc.slug}/`,
      lastModified: new Date(), // Could be from file stats in a real environment
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Category Pages
  for (const cat of categories) {
    routes.push({
      url: `${baseUrl}/category/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Blog Article Pages
  for (const article of publishedArticles) {
    routes.push({
      url: `${baseUrl}/blog/${article.slug}/`,
      lastModified: new Date(article.updated || article.published),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Blog Category Pages
  for (const cat of blogCategories) {
    routes.push({
      url: `${baseUrl}/blog/category/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return routes;
}
