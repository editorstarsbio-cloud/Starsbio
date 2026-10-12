import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCelebritiesBornOn } from '@/lib/repository';
import { getMonthName, getDaysInMonth, isValidDateParts, SITE_CONFIG } from '@/lib/utils';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Calendar, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface DailyArchiveProps {
  params: Promise<{ month: string; day: string }>;
}

export async function generateMetadata({ params }: DailyArchiveProps): Promise<Metadata> {
  const { month: mStr, day: dStr } = await params;
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  if (!isValidDateParts(2024, month, day)) {
    return { title: 'Date Not Found', robots: { index: false } };
  }

  const monthName = getMonthName(month);
  const title = `Celebrities Born on ${monthName} ${day} — Famous Birthdays | ${SITE_CONFIG.brandName}`;
  const description = `Explore public figures, actors, musicians, and creators born on ${monthName} ${day}. Discover verified biographies, current ages, and zodiac details.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/birthdays/${month}/${day}`,
    },
  };
}

export default async function DailyBirthdayPage({ params }: DailyArchiveProps) {
  const { month: mStr, day: dStr } = await params;
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  if (!isValidDateParts(2024, month, day)) {
    notFound();
  }

  const monthName = getMonthName(month);
  const celebrities = await getCelebritiesBornOn(month, day, 100);

  // Compute previous and next calendar days safely
  const prevDate = new Date(Date.UTC(2024, month - 1, day - 1));
  const prevMonth = prevDate.getUTCMonth() + 1;
  const prevDay = prevDate.getUTCDate();

  const nextDate = new Date(Date.UTC(2024, month - 1, day + 1));
  const nextMonth = nextDate.getUTCMonth() + 1;
  const nextDay = nextDate.getUTCDate();

  const breadcrumbs = [
    { label: 'Calendar', href: '/birthdays' },
    { label: monthName, href: `/birthdays/month/${month}` },
    { label: `${monthName} ${day}` },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header & Day Navigation */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Celebrity Birthdays: {monthName} {day}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Explore notable actors, authors, scientists, and creators who celebrate their birthday on {monthName} {day}. Ages are computed dynamically based on genuine calendar milestones.
            </p>
          </div>

          {/* Quick Month Link */}
          <Link
            href={`/birthdays/month/${month}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-auto transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span>All {monthName} Days</span>
          </Link>
        </div>

        {/* Previous / Next Day Links */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <Link
            href={`/birthdays/${prevMonth}/${prevDay}`}
            className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{getMonthName(prevMonth)} {prevDay}</span>
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href={`/birthdays/${nextMonth}/${nextDay}`}
            className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-slate-50"
          >
            <span>{getMonthName(nextMonth)} {nextDay}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Profiles Grid */}
      {celebrities.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {celebrities.length} published profiles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {celebrities.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm space-y-3">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-semibold text-slate-700">No Approved Records for {monthName} {day}</h3>
          <p className="max-w-md mx-auto text-xs text-slate-400">
            Our editorial team publishes biographies following thorough verification. More profiles for this date will appear once fact-checking is concluded.
          </p>
        </div>
      )}
    </div>
  );
}
