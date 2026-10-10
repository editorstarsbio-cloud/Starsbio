import { getArticles, blogCategories } from '@/content/blog';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Guides',
  description: 'Articles, guides, and explanations about math, finance, health, and how to calculate everyday things.',
  alternates: {
    canonical: 'https://www.allcalctool.com/blog/',
  },
};

export default async function BlogIndexPage() {
  const articles = await getArticles();
  const published = articles.filter(a => a.status === 'published');
  const featured = published.filter(a => a.featured).slice(0, 3);
  const recent = published.filter(a => !a.featured).slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <section className="text-center py-10 border-b border-slate-200">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Blog & Guides</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Deep dives, formulas, and practical guides to help you understand the math behind the calculators.
        </p>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}/`} className="card p-6 flex flex-col hover:border-primary transition-all group">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {blogCategories.find(c => c.slug === article.category)?.name}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary mb-3 leading-tight">{article.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-3">{article.description}</p>
                <div className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100 flex justify-between">
                  <span>{article.author}</span>
                  <span>{new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
        <div className="space-y-6">
          {recent.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className="card p-6 flex flex-col sm:flex-row hover:border-primary transition-all group gap-4">
              <div className="flex-grow">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                  {blogCategories.find(c => c.slug === article.category)?.name}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary mb-2">{article.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{article.description}</p>
              </div>
              <div className="sm:w-32 flex-shrink-0 flex items-start sm:items-end justify-between sm:flex-col text-xs text-slate-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:border-l sm:pl-4">
                <span className="mb-1">{new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-primary font-medium group-hover:underline">Read article &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {blogCategories.map(cat => {
            const count = published.filter(a => a.category === cat.slug).length;
            if (count === 0) return null;
            return (
              <Link key={cat.slug} href={`/blog/category/${cat.slug}/`} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-primary hover:bg-white transition-all text-center group">
                <h3 className="font-semibold text-slate-800 group-hover:text-primary">{cat.name}</h3>
                <span className="text-sm text-slate-500">{count} article{count !== 1 ? 's' : ''}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
