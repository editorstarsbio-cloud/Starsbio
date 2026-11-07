import React from 'react';
import { Metadata } from 'next';
import { getTrendingCelebrities } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { TrendingUp, Flame, Sparkles } from 'lucide-react';

export const revalidate = 3600; // Hourly refresh

export const metadata: Metadata = {
  title: 'Trending Celebrities Today - Most Popular Famous Birthdays & Stars',
  description:
    'Discover the most popular and trending celebrities today on StarsBio. Live rankings of actors, musicians, YouTubers, and public figures with verified biographies and ages.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/trending`,
  },
};

export default async function TrendingPage() {
  const trendingStars = await getTrendingCelebrities(100);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Trending Celebrities' },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-600 rounded-3xl text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white uppercase tracking-wider mb-4 border border-white/20">
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Live Popularity Leaderboard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Top Trending Celebrities
          </h1>
          <p className="mt-3 text-sm sm:text-base text-pink-100 font-medium">
            Explore the most searched and highly viewed celebrities across film, television, music, sports, and creator culture right now.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-200 pb-3">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          <h2 className="text-xl font-bold tracking-tight">Top 100 Most Popular Stars</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingStars.map((celeb, idx) => (
            <div key={celeb.id} className="relative group">
              <div className="absolute top-2 left-2 z-20 bg-slate-950/80 backdrop-blur-md text-amber-400 font-black text-xs px-2.5 py-1 rounded-lg border border-amber-400/30 shadow-md">
                #{idx + 1}
              </div>
              <CelebrityCard celebrity={celeb} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
