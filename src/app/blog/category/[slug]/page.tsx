import { notFound } from 'next/navigation';
import { getArticles, blogCategories } from '@/content/blog';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogCategories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const category = blogCategories.find((c) => c.slug === p.slug);
  if (!category) return {};

  return {
    title: `${category.name} Articles & Guides`,
    description: `Read articles, guides, and practical explanations about ${category.name.toLowerCase()}.`,
    alternates: {
      canonical: `https://www.allcalctool.com/blog/category/${category.slug}/`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const p = await params;
  const category = blogCategories.find((c) => c.slug === p.slug);
  if (!category) notFound();

  const allArticles = await getArticles();
  const articles = allArticles.filter(a => a.category === category.slug && a.status === 'published');
  
  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/blog/" className="hover:text-primary">Blog</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">{category.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{category.name} Guides</h1>
        <p className="text-lg text-slate-600">
          Articles and explanations covering {category.name.toLowerCase()}.
        </p>
      </div>

      <div className="space-y-6">
        {articles.length > 0 ? (
          articles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className="card p-6 flex flex-col sm:flex-row hover:border-primary transition-all group gap-4">
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary mb-2">{article.title}</h2>
                <p className="text-sm text-slate-600 line-clamp-2">{article.description}</p>
              </div>
              <div className="sm:w-32 flex-shrink-0 flex items-start sm:items-end justify-between sm:flex-col text-xs text-slate-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:border-l sm:pl-4">
                <span className="mb-1">{new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-primary font-medium group-hover:underline">Read &rarr;</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-500">More articles are coming to this category soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
