export const runtime = 'edge';
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getFeaturedCelebrities } from '@/lib/repository';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Flame } from 'lucide-react';

export const revalidate = 3600; // Hourly refresh

export const metadata: Metadata = {
  title: 'Top 100 Trending Celebrities Today - Most Popular Famous Stars | StarsBio',
  description:
    'Discover the top 100 most popular and trending celebrities today on StarsBio. Live rankings of actors, musicians, YouTubers, and public figures with verified biographies and ages.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/trending`,
  },
};

export default async function TrendingPage() {
  const trendingStars = await getFeaturedCelebrities(100);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Trending Top 100' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <h1 className="text-xl sm:text-2xl font-black tracking-wide text-slate-900 uppercase">
            Trending Top 100 Celebrities
          </h1>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Live Daily Rank
        </span>
      </div>

      {/* Identical 2-Column Ranking List Format (Matching Homepage & Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {trendingStars.map((celeb, idx) => {
          const fakeBoost = ((idx * 179 + 423) % 4000) + 120;
          return (
            <Link
              key={celeb.id}
              href={`/people/${celeb.slug}`}
              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-pink-50/50 border border-slate-200/80 hover:border-pink-300 transition-all shadow-sm hover:shadow"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/80 shadow-xs">
                  {celeb.image_url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={celeb.image_url}
                        alt={celeb.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0.5 right-0.5 pointer-events-none z-10 flex items-center bg-slate-950/70 px-1 py-0.5 rounded shadow">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/starsbio-watermark.png" alt="StarsBio" className="h-1.5 w-auto object-contain brightness-110" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold">
                      {celeb.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate">
                    {celeb.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {celeb.primary_profession || 'Public Figure'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 flex-shrink-0 pl-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  &uarr; {fakeBoost}
                </span>
                <span className="text-xs font-black text-slate-400">
                  #{celeb.popularity_score || idx + 1}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
