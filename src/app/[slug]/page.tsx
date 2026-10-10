import { notFound } from 'next/navigation';
import { getCalculators, categories } from '@/calculators';
import CalculatorEngine from '@/components/CalculatorEngine';
import Link from 'next/link';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const allCalculators = await getCalculators();
  return allCalculators.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const allCalculators = await getCalculators();
  const def = allCalculators.find((c) => c.slug === p.slug);
  if (!def) return {};

  return {
    title: def.seoTitle || def.name,
    description: def.metaDescription || def.short,
    alternates: {
      canonical: `https://www.allcalctool.com/${def.slug}/`,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const p = await params;
  const allCalculators = await getCalculators();
  const def = allCalculators.find((c) => c.slug === p.slug);

  if (!def || def.status !== 'published') {
    notFound();
  }

  const category = categories.find((c) => c.slug === def.category);
  const relatedCalcs = def.related ? allCalculators.filter(c => def.related!.includes(c.slug) && c.status === 'published') : [];

  // Attempt to load optional long-form Markdown content
  let markdownContent = null;
  try {
    const mdPath = path.join(process.cwd(), 'src/content/calculators', `${def.slug}.md`);
    markdownContent = await fs.readFile(mdPath, 'utf8');
  } catch (e) {
    // No markdown file exists for this calculator yet, which is fine!
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={`/category/${def.category}/`} className="hover:text-primary">
                {category?.name || def.category}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">{def.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{def.name}</h1>
      <p className="text-lg text-slate-600 mb-8">{def.short}</p>

      {/* The Calculator Engine */}
      <div className="mb-12">
        <CalculatorEngine slug={def.slug} />
      </div>

      {/* Calculator Content */}
      <article className="prose prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:text-slate-900">
        
        {markdownContent ? (
          // If long-form Markdown exists, render it completely!
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {markdownContent}
          </ReactMarkdown>
        ) : (
          // Fallback to original TS definition text if no markdown exists yet
          <>
            <section className="mb-10">
              <h2>About this Calculator</h2>
              {def.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {def.formula && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 my-6 font-mono text-center">
                  {def.formula}
                </div>
              )}
            </section>

            {def.howTo && def.howTo.length > 0 && (
              <section className="mb-10">
                <h2>How to Use</h2>
                <ol>
                  {def.howTo.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>
            )}

            {def.example && (
              <section className="mb-10">
                <h2>Example</h2>
                <p>{def.example}</p>
              </section>
            )}

            {((def.assumptions && def.assumptions.length > 0) || (def.limitations && def.limitations.length > 0)) && (
              <section className="mb-10 bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h2 className="text-amber-900 mt-0">Assumptions & Limitations</h2>
                <ul className="text-amber-800 mb-0">
                  {def.assumptions?.map((a, i) => <li key={`a-${i}`}>{a}</li>)}
                  {def.limitations?.map((l, i) => <li key={`l-${i}`}>{l}</li>)}
                </ul>
              </section>
            )}

            {def.faqs && def.faqs.length > 0 && (
              <section className="mb-10">
                <h2>Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {def.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                      <p className="text-slate-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </article>

      {/* Related Calculators */}
      {relatedCalcs.length > 0 && (
        <section className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedCalcs.map((c) => (
              <Link key={c.slug} href={`/${c.slug}/`} className="card p-4 hover:border-primary transition-colors group">
                <h3 className="font-semibold text-slate-900 group-hover:text-primary mb-1">{c.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{c.short}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Schema */}
      {def.faqs && def.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": def.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": def.name,
            "applicationCategory": "CalculatorApplication",
            "operatingSystem": "Any",
            "description": def.short,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
