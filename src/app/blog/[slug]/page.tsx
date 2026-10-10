import { notFound } from 'next/navigation';
import { getArticles, blogCategories } from '@/content/blog';
import { getCalculators } from '@/calculators';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Block } from '@/content/blog/types';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === p.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://www.allcalctool.com/blog/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.published,
      modifiedTime: article.updated,
      authors: [article.author],
    }
  };
}

// Very simple inline parser for our safe subset [text](/url) and **bold**
function parseInline(text: string) {
  const parts: React.ReactNode[] = [];
  let current = '';
  let i = 0;
  
  while (i < text.length) {
    if (text.startsWith('[', i)) {
      const endBracket = text.indexOf(']', i);
      const startParen = text.indexOf('(', endBracket);
      const endParen = text.indexOf(')', startParen);
      
      if (endBracket > i && startParen === endBracket + 1 && endParen > startParen) {
        if (current) parts.push(<span key={i + 't'}>{current}</span>);
        current = '';
        const linkText = text.slice(i + 1, endBracket);
        const url = text.slice(startParen + 1, endParen);
        parts.push(
          <Link key={i + 'l'} href={url} className="text-primary hover:underline font-medium">
            {linkText}
          </Link>
        );
        i = endParen + 1;
        continue;
      }
    }
    
    if (text.startsWith('**', i)) {
      const endStar = text.indexOf('**', i + 2);
      if (endStar > i) {
        if (current) parts.push(<span key={i + 't'}>{current}</span>);
        current = '';
        const boldText = text.slice(i + 2, endStar);
        parts.push(<strong key={i + 'b'} className="font-semibold">{boldText}</strong>);
        i = endStar + 2;
        continue;
      }
    }
    
    current += text[i];
    i++;
  }
  if (current) parts.push(<span key="last">{current}</span>);
  return <>{parts}</>;
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2': return <h2 id={block.id} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{block.text}</h2>;
    case 'h3': return <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">{block.text}</h3>;
    case 'p': return <p className="mb-4 text-slate-700 leading-relaxed">{parseInline(block.text)}</p>;
    case 'ul': 
      return (
        <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
          {block.items.map((item, i) => <li key={i}>{parseInline(item)}</li>)}
        </ul>
      );
    case 'ol': 
      return (
        <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
          {block.items.map((item, i) => <li key={i}>{parseInline(item)}</li>)}
        </ol>
      );
    case 'formula':
      return (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 my-6 font-mono text-center text-slate-800">
          {block.text}
        </div>
      );
    case 'note':
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 text-blue-900 rounded-r-md text-sm">
          {parseInline(block.text)}
        </div>
      );
    case 'table':
      return (
        <div className="my-8 overflow-x-auto">
          {block.caption && <div className="text-sm font-semibold text-slate-700 mb-2">{block.caption}</div>}
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-md overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                {block.columns.map((col, i) => <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-slate-800">{col}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j} className="px-4 py-2 text-sm text-slate-600">{parseInline(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: Props) {
  const p = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === p.slug);
  
  if (!article || article.status !== 'published') {
    notFound();
  }

  const category = blogCategories.find(c => c.slug === article.category);
  const allCalculators = await getCalculators();
  const relatedCalcs = article.relatedCalculators 
    ? allCalculators.filter(c => article.relatedCalculators.includes(c.slug) && c.status === 'published')
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
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
          {category && (
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link href={`/blog/category/${category.slug}/`} className="hover:text-primary">
                  {category.name}
                </Link>
              </div>
            </li>
          )}
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-slate-200">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center font-medium text-slate-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {article.author}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {new Date(article.published).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {article.updated && <span className="ml-2 italic">(Updated: {new Date(article.updated).toLocaleDateString('en-US')})</span>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article className="prose prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {article.body.map((block, i) => <RenderBlock key={i} block={block} />)}
            
            {article.faqs && article.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {article.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                      <p className="text-slate-600 leading-relaxed">{parseInline(faq.a)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {article.sources && article.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Sources</h2>
                <ul className="text-sm text-slate-600 space-y-2">
                  {article.sources.map((src, i) => (
                    <li key={i}>
                      {src.publisher}: <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{src.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          {relatedCalcs.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                Related Calculators
              </h3>
              <ul className="space-y-3">
                {relatedCalcs.map(c => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}/`} className="text-sm text-slate-700 hover:text-primary font-medium block">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {article.tags && article.tags.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(t => (
                  <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
