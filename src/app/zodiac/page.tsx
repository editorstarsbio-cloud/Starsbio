import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ZODIAC_SIGNS, SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Sparkles, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Celebrity Zodiac Signs",
  description: 'Explore famous public figures, actors, and creators grouped by their 12 astrological sun signs.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/zodiac`,
  },
};

export default function ZodiacIndexPage() {
  const breadcrumbs = [{ label: 'Zodiac Directory' }];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Astrological Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrity Zodiac Signs
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Discover which prominent personalities share your astrological sign. Each sign corresponds to verified calendar windows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.values(ZODIAC_SIGNS).map((z) => (
          <Link
            key={z.sign}
            href={`/zodiac/${z.sign.toLowerCase()}`}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl group-hover:scale-110 transition-transform">{z.symbol}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{z.element}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-3">
                {z.sign}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{z.dateRange}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>View Celebrities</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
