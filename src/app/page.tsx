import React from 'react';
import Link from 'next/link';
import { Calendar, Sparkles, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import { getCelebritiesBornOn, getFeaturedCelebrities, getAllCategories } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { ZODIAC_SIGNS, getMonthName, SITE_CONFIG } from '@/lib/utils';

export default async function HomePage() {
  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1;
  const currentDay = now.getUTCDate();

  // Dynamic Born Today query
  const bornTodayList = await getCelebritiesBornOn(currentMonth, currentDay, 8);
  const featuredProfiles = await getFeaturedCelebrities(8);
  const categories = await getAllCategories();

  return (
    <div className="space-y-16">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 md:p-14 shadow-xl border border-indigo-900/50">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Celebrity Database</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Verified Celebrity Birthdays & Milestones
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Welcome to {SITE_CONFIG.brandName} — an independent, fact-checked directory of public figures, actors, musicians, and creators. Explore dynamic age timelines, verified zodiac connections, and biographical backgrounds.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href={`/birthdays/${currentMonth}/${currentDay}`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Born Today ({getMonthName(currentMonth)} {currentDay})</span>
            </Link>
            <Link
              href="/birthdays"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 backdrop-blur-md transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Full Birthday Calendar</span>
            </Link>
          </div>
        </div>

        {/* Decorative backdrop elements */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* Born Today Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Today&apos;s Highlights</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Born Today — {getMonthName(currentMonth)} {currentDay}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Celebrated public figures and icons born on this day throughout history.
            </p>
          </div>
          <Link
            href={`/birthdays/${currentMonth}/${currentDay}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View all birthdays today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {bornTodayList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bornTodayList.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-100 rounded-2xl p-8 text-center text-slate-500 text-sm">
            <p>No published birthdays recorded for today yet. Check back soon as new profiles are reviewed.</p>
          </div>
        )}
      </section>

      {/* Popular Categories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Directory</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Browse by Profession</h2>
          </div>
          <Link
            href="/category"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>All categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm text-center transition-all group"
            >
              <span className="font-semibold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors block">
                {cat.name}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">View Profiles</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Editorial Profiles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Editor&apos;s Selection</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Profiles</h2>
            <p className="text-sm text-slate-500 mt-1">
              Editorially verified biographies and milestones from our global database.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProfiles.map((celeb) => (
            <CelebrityCard key={celeb.id} celebrity={celeb} />
          ))}
        </div>
      </section>

      {/* Zodiac Discovery Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Astrological Dates</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Zodiac Signs</h2>
            <p className="text-sm text-slate-500 mt-1">
              Discover celebrities grouped by their astronomical birth window.
            </p>
          </div>
          <Link
            href="/zodiac"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>All signs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.values(ZODIAC_SIGNS).map((z) => (
            <Link
              key={z.sign}
              href={`/zodiac/${z.sign.toLowerCase()}`}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-sm text-center transition-all group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{z.symbol}</span>
              <span className="font-bold text-sm text-slate-800 group-hover:text-amber-600 transition-colors block">
                {z.sign}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">{z.dateRange}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
