import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MONTH_NAMES, SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Celebrity Birthdays Calendar",
  description:
    'Browse our complete calendar year of celebrity birthdays. Select any month or date to explore verified profiles and biographies.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/birthdays`,
  },
};

export default function BirthdaysIndexPage() {
  const breadcrumbs = [{ label: 'Birthday Calendar' }];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Year-Round Calendar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrity Birthday Calendar Directory
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Explore birthdays for all 12 months. Choose a month to browse every day of the year and discover which public figures share your birth date.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MONTH_NAMES.map((name, idx) => {
          const monthNum = idx + 1;
          return (
            <Link
              key={name}
              href={`/birthdays/month/${monthNum}`}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Month {monthNum}</span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                  {name}
                </h3>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600">
                <span>View {name} Days</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
