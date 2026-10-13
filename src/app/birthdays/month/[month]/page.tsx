import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getMonthName, getDaysInMonth, SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Calendar, ChevronRight } from 'lucide-react';

interface MonthlyCalendarProps {
  params: Promise<{ month: string }>;
}

export async function generateMetadata({ params }: MonthlyCalendarProps): Promise<Metadata> {
  const { month: mStr } = await params;
  const month = parseInt(mStr, 10);

  if (month < 1 || month > 12) {
    return { title: 'Month Not Found', robots: { index: false } };
  }

  const monthName = getMonthName(month);
  const title = `${monthName} Celebrity Birthdays Calendar`;
  const description = `Daily birthday directory for the month of ${monthName}. Browse famous figures, actors, musicians, and historical icons by their exact day of birth.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/birthdays/month/${month}`,
    },
  };
}

export default async function MonthlyCalendarPage({ params }: MonthlyCalendarProps) {
  const { month: mStr } = await params;
  const month = parseInt(mStr, 10);

  if (month < 1 || month > 12) {
    notFound();
  }

  const monthName = getMonthName(month);
  const totalDays = getDaysInMonth(month, true); // Leap year 29 days support for February
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const breadcrumbs = [
    { label: 'Calendar', href: '/birthdays' },
    { label: `${monthName} Birthdays` },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Monthly Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {monthName} Celebrity Birthdays
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Select any date in {monthName} to view full profiles of notable personalities, influencers, and cultural icons celebrating their birthdays on that day.
        </p>
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daysArray.map((day) => (
          <Link
            key={day}
            href={`/birthdays/${month}/${day}`}
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                {day}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">{monthName}</span>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-indigo-600 font-semibold">
              <span>View Birthdays</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
