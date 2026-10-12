import React from 'react';
import type { Metadata } from 'next';
import { searchCelebrities } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  return {
    title: query ? `Search Results for "${query}" | ${SITE_CONFIG.brandName}` : `Search Celebrity Database | ${SITE_CONFIG.brandName}`,
    description: `Search verified birthdays, ages, biographies, and professions of celebrities and public figures.`,
    robots: {
      index: false, // Technical SEO best practice: internal search pages are noindexed to prevent crawl bloat
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  const results = query ? await searchCelebrities(query, 50) : [];

  const breadcrumbs = [
    { label: 'Search' },
    ...(query ? [{ label: `"${query}"` }] : []),
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Celebrity Search</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {query ? `Search Results for "${query}"` : 'Search Public Figures & Celebrities'}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Search our verified database by name or profession.
          </p>
        </div>

        {/* Search Input Box */}
        <form action="/search" method="GET" className="relative max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by celebrity name, actor, singer..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-2xl text-sm outline-none transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        </form>
      </div>

      {query ? (
        results.length > 0 ? (
          <section className="space-y-4">
            <div className="text-xs text-slate-500 px-1">
              Found {results.length} matching profile{results.length === 1 ? '' : 's'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((celeb) => (
                <CelebrityCard key={celeb.id} celebrity={celeb} />
              ))}
            </div>
          </section>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm space-y-3">
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-semibold text-slate-700">No results found for &quot;{query}&quot;</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try checking your spelling or searching for a general profession like Movie Actor or Pop Singer.
            </p>
          </div>
        )
      ) : (
        <div className="p-8 text-center text-xs text-slate-400">
          Enter a query above to start searching.
        </div>
      )}
    </div>
  );
}
