import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCelebrities } from '@/lib/repository';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Users } from 'lucide-react';

export const revalidate = 86400;

// P1-7 Fix: /people was 404 — now a real A–Z paginated directory
// This is the hub page for all celebrity profiles, used in breadcrumbs + sitemap

const PAGE_SIZE = 100;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ letter?: string; page?: string }>;
}): Promise<Metadata> {
  const { letter = 'A' } = await searchParams;
  const title = `Celebrities A–Z — ${letter.toUpperCase()} | StarsBio`;
  const description = `Browse all celebrities starting with "${letter.toUpperCase()}" on StarsBio. Verified birthdays, ages, and biographies.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.siteUrl}/people?letter=${letter.toUpperCase()}` },
    openGraph: { title, description, type: 'website', url: `${SITE_CONFIG.siteUrl}/people` },
  };
}

export default async function PeopleIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ letter?: string; page?: string }>;
}) {
  const { letter = 'A', page = '1' } = await searchParams;
  const activeLetter = letter.toUpperCase();
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const allCelebrities = await getAllCelebrities();

  // Filter by starting letter
  const filtered = allCelebrities.filter((c) =>
    c.name?.toUpperCase().startsWith(activeLetter)
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const slice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const breadcrumbs = [{ label: 'All Celebrities (A–Z)' }];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Celebrity Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrities A–Z
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Browse all {allCelebrities.length.toLocaleString()} celebrity profiles alphabetically.
          Click a letter to explore verified birthdays, ages, and biographies.
        </p>
      </div>

      {/* Alphabet bar */}
      <div className="flex flex-wrap gap-2">
        {alphabet.map((l) => (
          <Link
            key={l}
            href={`/people?letter=${l}`}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border transition-colors
              ${activeLetter === l
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
          >
            {l}
          </Link>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
        {filtered.length} profiles starting with &ldquo;{activeLetter}&rdquo;
        {totalPages > 1 && ` — page ${currentPage} of ${totalPages}`}
      </p>

      {/* Profile list */}
      {slice.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {slice.map((celeb) => (
            <li key={celeb.slug}>
              <Link
                href={`/people/${celeb.slug}`}
                className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-300 hover:shadow-sm transition-all group"
              >
                {celeb.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={celeb.image_url}
                    alt={celeb.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold text-sm">
                    {celeb.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600">
                    {celeb.name}
                  </p>
                  {celeb.primary_profession && (
                    <p className="text-xs text-slate-400 truncate">{celeb.primary_profession}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">No profiles found starting with &ldquo;{activeLetter}&rdquo;.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/people?letter=${activeLetter}&page=${p}`}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors
                ${currentPage === p
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
                }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
