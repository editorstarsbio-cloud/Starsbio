import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeftRight, Flame, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Celebrity Head-to-Head Comparisons — Age Gap & Birthday Comparison | StarsBio',
  description:
    'Compare top celebrities, actors, footballers, and musicians side-by-side. Discover exact age differences, career milestones, and astrology facts.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/compare`,
  },
};

const POPULAR_COMPARISONS = [
  {
    name1: 'Lionel Messi',
    slug1: 'lionel-messi',
    name2: 'Cristiano Ronaldo',
    slug2: 'cristiano-ronaldo',
    badge: 'Football GOATs',
    tagline: 'Age difference, World Cup titles, and Ballon d\'Or stats comparison',
  },
  {
    name1: 'Shah Rukh Khan',
    slug1: 'shah-rukh-khan',
    name2: 'Salman Khan',
    slug2: 'salman-khan',
    badge: 'Bollywood Legends',
    tagline: 'Birthdays, age gap, box office dominance, and net worth comparison',
  },
  {
    name1: 'Zendaya',
    slug1: 'zendaya',
    name2: 'Tom Holland',
    slug2: 'tom-holland',
    badge: 'Hollywood Couple',
    tagline: 'Age gap, Marvel Spider-Man co-stars, and career trajectory',
  },
  {
    name1: 'Taylor Swift',
    slug1: 'taylor-swift',
    name2: 'Travis Kelce',
    slug2: 'travis-kelce',
    badge: 'Pop Star & NFL Champion',
    tagline: 'Birthdays, astrology zodiac compatibility, and age difference',
  },
  {
    name1: 'Virat Kohli',
    slug1: 'virat-kohli',
    name2: 'Babar Azam',
    slug2: 'babar-azam',
    badge: 'Cricket Icons',
    tagline: 'Batting records, birthdays, age comparison, and international centuries',
  },
  {
    name1: 'Kylian Mbappé',
    slug1: 'kylian-mbappe',
    name2: 'Erling Haaland',
    slug2: 'erling-haaland',
    badge: 'Next-Gen Footballers',
    tagline: 'Champions League goals, age difference, and market valuations',
  },
  {
    name1: 'Selena Gomez',
    slug1: 'selena-gomez',
    name2: 'Hailey Bieber',
    slug2: 'hailey-bieber',
    badge: 'Pop Culture Stars',
    tagline: 'Age gap, birthdays, beauty empires, and career timelines',
  },
  {
    name1: 'Fawad Khan',
    slug1: 'fawad-khan',
    name2: 'Atif Aslam',
    slug2: 'atif-aslam',
    badge: 'Pakistani Superstars',
    tagline: 'Birthdays, singing vs acting acclaim, and age difference',
  },
];

export default function CompareHubPage() {
  const breadcrumbs = [{ label: 'Compare Hub' }];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-2 pb-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200/60 uppercase tracking-wider">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Celebrity Comparison Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Compare Celebrities Side-by-Side
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Discover verified age gaps, birthdays, heights, zodiac astrology, and career milestones for the world&apos;s biggest stars.
        </p>
      </div>

      {/* Popular Comparison Grid */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide">
            Trending Head-to-Head Comparisons
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POPULAR_COMPARISONS.map((item, idx) => (
            <Link
              key={idx}
              href={`/compare/${item.slug1}-vs-${item.slug2}`}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider mb-2">
                  {item.badge}
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                  {item.name1} <span className="text-pink-500">vs</span> {item.name2}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  {item.tagline}
                </p>
              </div>

              <div className="text-xs font-bold text-pink-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                <span>View Full Comparison &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
