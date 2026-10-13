import React from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, Sparkles, Flame } from 'lucide-react';
import { getCelebritiesBornOn, getFeaturedCelebrities } from '@/lib/repository';
import { CompactCelebrityCard } from '@/components/CompactCelebrityCard';
import { Metadata } from 'next';
import { getMonthName, SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'StarsBio - Celebrity Birthdays, Biographies & Facts',
  description:
    'Discover verified birthdays, real ages, and biographies of celebrities, movie actors, musicians, and influencers on StarsBio.',
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
};

export default async function HomePage() {
  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1;
  const currentDay = now.getUTCDate();

  // Calculate tomorrow
  const tomorrowDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const tomorrowMonth = tomorrowDate.getUTCMonth() + 1;
  const tomorrowDay = tomorrowDate.getUTCDate();

  // Fetch birthdays
  // 7 cards + 1 "MORE" card = 8 slots (or 4 per row on desktop)
  const bornTodayList = await getCelebritiesBornOn(currentMonth, currentDay, 7);
  const bornTomorrowList = await getCelebritiesBornOn(tomorrowMonth, tomorrowDay, 3);
  const trendingList = await getFeaturedCelebrities(8);

  const popularCategories = [
    { name: 'Pop Singer', slug: 'pop-singer', count: '1.2k+' },
    { name: 'Movie Actor', slug: 'movie-actor', count: '2.5k+' },
    { name: 'TV Actress', slug: 'tv-actress', count: '1.8k+' },
    { name: 'Rapper', slug: 'rapper', count: '900+' },
    { name: 'YouTuber', slug: 'youtuber', count: '750+' },
    { name: 'Soccer Player', slug: 'soccer-player', count: '1.1k+' },
    { name: 'Basketball Player', slug: 'basketball-player', count: '600+' },
    { name: 'TikTok Star', slug: 'tiktok-star', count: '500+' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pt-2 pb-12">
      {/* Primary Semantic H1 Header (Accessible & Clean for SEO) */}
      <div className="sr-only">
        <h1>StarsBio — Celebrity Birthdays, Ages, Biographies & Milestones Directory</h1>
      </div>

      {/* 1. TODAY'S BIRTHDAYS */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
              Today&apos;s Birthdays
            </h2>
          </div>
          <Link
            href={`/birthdays/${currentMonth}/${currentDay}`}
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>{getMonthName(currentMonth)} {currentDay}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {bornTodayList.map((celeb, idx) => (
            <CompactCelebrityCard key={celeb.id} celebrity={celeb} priority={idx < 2} />
          ))}

          {/* MORE BIRTHDAYS CARD */}
          <Link
            href={`/birthdays/${currentMonth}/${currentDay}`}
            className="group block text-center focus:outline-none"
          >
            <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border-2 border-dashed border-pink-200 group-hover:border-pink-400 group-hover:bg-pink-100/70 transition-all flex flex-col items-center justify-center p-4">
              <span className="text-xs font-black uppercase tracking-wider text-pink-500 mb-1">
                More
              </span>
              <span className="text-lg font-black text-pink-700 group-hover:scale-105 transition-transform">
                Birthdays
              </span>
              <span className="text-[11px] font-semibold text-pink-500/90 mt-1">
                {getMonthName(currentMonth)} {currentDay} &rarr;
              </span>
            </div>
            <div className="mt-2 text-center opacity-0">
              <span className="text-sm font-bold">More</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. TOMORROW'S BIRTHDAYS */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-2.5">
          <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
            Tomorrow&apos;s Birthdays
          </h2>
          <Link
            href={`/birthdays/${tomorrowMonth}/${tomorrowDay}`}
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>{getMonthName(tomorrowMonth)} {tomorrowDay}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {bornTomorrowList.map((celeb) => (
            <CompactCelebrityCard key={celeb.id} celebrity={celeb} />
          ))}

          {/* MORE TOMORROW CARD */}
          <Link
            href={`/birthdays/${tomorrowMonth}/${tomorrowDay}`}
            className="group block text-center focus:outline-none"
          >
            <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/50 border-2 border-dashed border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50/60 transition-all flex flex-col items-center justify-center p-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                More
              </span>
              <span className="text-lg font-black text-indigo-700 group-hover:scale-105 transition-transform">
                Birthdays
              </span>
              <span className="text-[11px] font-semibold text-slate-500 mt-1">
                {getMonthName(tomorrowMonth)} {tomorrowDay} &rarr;
              </span>
            </div>
            <div className="mt-2 text-center opacity-0">
              <span className="text-sm font-bold">More</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. TRENDING CELEBRITIES LIST (FamousBirthdays Style) */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-2.5">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
              Trending Celebrities
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {trendingList.map((celeb, idx) => {
            const fakeBoost = ((idx * 179 + 423) % 4000) + 120;
            return (
              <Link
                key={celeb.id}
                href={`/people/${celeb.slug}`}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-pink-50/50 border border-slate-200/80 hover:border-pink-200 transition-all shadow-sm hover:shadow"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    {celeb.image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={celeb.image_url}
                        alt={celeb.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                        {celeb.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate">
                      {celeb.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {celeb.primary_profession || 'Public Figure'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
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
      </section>

      {/* 4. POPULAR PROFESSIONS (Clean & Light Pill Grid) */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-2.5">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
              Popular Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>All 192 Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {popularCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="p-3 rounded-xl bg-white hover:bg-pink-500 hover:text-white border border-slate-200/80 shadow-sm transition-all group flex items-center justify-between"
            >
              <span className="text-xs font-bold text-slate-800 group-hover:text-white truncate">
                {cat.name}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-pink-100">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
