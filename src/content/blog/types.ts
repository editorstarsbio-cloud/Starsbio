/** Typed blog content schema. Articles are stored as TypeScript files in src/content/blog/articles/. */

export type BlogCategorySlug =
  | 'math-guides'
  | 'finance-guides'
  | 'business-calculations'
  | 'health-fitness'
  | 'education'
  | 'date-time'
  | 'construction'
  | 'real-estate'
  | 'automotive'
  | 'cooking'
  | 'technology'
  | 'statistics'
  | 'everyday-calculations'
  | 'science';

/**
 * Body blocks. Inline text in 'p' and list items supports a tiny safe markup:
 *   [link text](/internal-path/)  -> internal link (must start with "/")
 *   **bold**
 * Nothing else is interpreted; no raw HTML is rendered.
 */
export type Block =
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'formula'; text: string }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { type: 'note'; text: string };

export interface Source {
  title: string;
  url: string;
  publisher: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: BlogCategorySlug;
  /** ISO date YYYY-MM-DD */
  published: string;
  updated?: string;
  author: string;
  status: 'draft' | 'published';
  featured?: boolean;
  tags?: string[];
  body: Block[];
  faqs?: { q: string; a: string }[];
  /** Calculator slugs that exist in the registry. */
  relatedCalculators: string[];
  /** Other article slugs. */
  relatedArticles?: string[];
  sources?: Source[];
}
