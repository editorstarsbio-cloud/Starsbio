import type { Article, BlogCategorySlug } from './types';
import { article as compoundInterestArticle } from './articles/compound-interest';

export const getArticles = async (): Promise<Article[]> => {
  const all: Article[] = [
    compoundInterestArticle
  ];
  return all.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
};

export const blogCategories: { slug: BlogCategorySlug; name: string }[] = [
  { slug: 'math-guides', name: 'Math Guides' },
  { slug: 'finance-guides', name: 'Finance Guides' },
  { slug: 'business-calculations', name: 'Business Calculations' },
  { slug: 'health-fitness', name: 'Health & Fitness' },
  { slug: 'education', name: 'Education' },
  { slug: 'date-time', name: 'Date & Time' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'automotive', name: 'Automotive' },
  { slug: 'cooking', name: 'Cooking' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'statistics', name: 'Statistics' },
  { slug: 'everyday-calculations', name: 'Everyday Calculations' },
  { slug: 'science', name: 'Science' }
];
