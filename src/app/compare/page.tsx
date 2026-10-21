import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeftRight, Flame, Sparkles, Layers } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getAllCelebrities } from '@/lib/repository';
import { CelebrityComparisonPicker } from '@/components/CelebrityComparisonPicker';
import atozDataRaw from '@/data/atozComparisons.json';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Celebrity Head-to-Head Comparisons A-Z — Age Difference Directory | StarsBio',
  description:
    'Compare celebrities from A to Z side-by-side. Discover exact age differences, birthdays, heights, zodiac astrology, and career milestones for all letters A-Z.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/compare`,
  },
};

const atozData: Record<string, Array<{ slug1: string; name1: string; prof1: string; slug2: string; name2: string; prof2: string }>> =
  atozDataRaw as unknown as Record<string, Array<{ slug1: string; name1: string; prof1: string; slug2: string; name2: string; prof2: string }>>;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default async function CompareHubPage() {
  const breadcrumbs = [{ label: 'Compare Hub' }];
  const allCelebrities = await getAllCelebrities();
  // Pass a lightweight top-500 slice to the client picker so page HTML is super-fast (~50KB instead of 23MB)
  const pickerCelebrities = allCelebrities.slice(0, 500).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    profession: c.profession,
    image: c.image,
    birthDate: c.birthDate,
    birthYear: c.birthYear,
  } as unknown as typeof allCelebrities[0]));

  return (
    <div className="max-w-5xl mx-auto space-y-10 pt-2 pb-16">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200/60 uppercase tracking-wider">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Complete A-to-Z Comparison Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Compare Celebrities from A to Z
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive head-to-head directory covering famous personalities across all 26 letters of the alphabet. Compare real-time age differences, birthdays, and life milestones.
        </p>

        {/* Quick Letter Jump Navigation */}
        <div className="pt-3 flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {letters.map((char) => (
            <a
              key={char}
              href={`#letter-${char}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center transition-all shadow-xs"
            >
              {char}
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Picker Tool for Any Custom 2 Stars */}
      <CelebrityComparisonPicker celebrities={pickerCelebrities} />

      {/* Full A to Z Categorized Comparison Sections */}
      <div className="space-y-12">
        {letters.map((char) => {
          const pairs = atozData[char] || [];
          if (pairs.length === 0) return null;

          return (
            <section key={char} id={`letter-${char}`} className="space-y-4 scroll-mt-24">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                <div className="flex items-center space-x-3">
                  <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shadow-xs">
                    {char}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Letter {char} Celebrity Comparisons
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {pairs.length} Head-to-Head Battles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {pairs.map((p, pIdx) => (
                  <Link
                    key={pIdx}
                    href={`/compare/${p.slug1}-vs-${p.slug2}`}
                    className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-pink-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-900 group-hover:text-pink-600 transition-colors leading-snug">
                        {p.name1} <span className="text-pink-500 font-bold">vs</span> {p.name2}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                        <span className="truncate max-w-[45%]">{p.prof1}</span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate max-w-[45%] text-right">{p.prof2}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-pink-600">
                      <span>Compare Age &amp; Facts</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
