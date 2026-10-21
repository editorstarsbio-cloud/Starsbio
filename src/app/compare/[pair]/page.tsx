import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCelebrityBySlug } from '@/lib/repository';
import { calculateAge, getMonthName, SITE_CONFIG } from '@/lib/utils';
import { CelebrityAvatar } from '@/components/CelebrityAvatar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArrowLeftRight, Calendar, Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface ComparePageProps {
  params: Promise<{ pair: string }>;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { pair } = await params;
  const parts = pair.split('-vs-');
  if (parts.length !== 2) return { title: 'Comparison Not Found', robots: { index: false } };

  const [slug1, slug2] = parts;
  const celeb1 = await getCelebrityBySlug(slug1);
  const celeb2 = await getCelebrityBySlug(slug2);

  if (!celeb1 || !celeb2) {
    return { title: 'Celebrities Not Found', robots: { index: false } };
  }

  const title = `${celeb1.name} vs ${celeb2.name} — Age Difference, Height & Birthday Comparison`;
  const description = `Compare ${celeb1.name} and ${celeb2.name}. Discover their exact age difference, birthdays, zodiac signs, careers, birthplace, and achievements on StarsBio.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/compare/${pair}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_CONFIG.siteUrl}/compare/${pair}`,
    },
  };
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const { pair } = await params;
  const parts = pair.split('-vs-');
  if (parts.length !== 2) notFound();

  const [slug1, slug2] = parts;
  const celeb1 = await getCelebrityBySlug(slug1);
  const celeb2 = await getCelebrityBySlug(slug2);

  if (!celeb1 || !celeb2) notFound();

  const age1 = calculateAge(celeb1.birth_date, celeb1.death_date);
  const age2 = calculateAge(celeb2.birth_date, celeb2.death_date);

  // Age difference calculation in days and years
  const date1 = new Date(celeb1.birth_date);
  const date2 = new Date(celeb2.birth_date);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = (diffDays / 365.25).toFixed(1);

  const olderCeleb = date1 < date2 ? celeb1 : celeb2;
  const youngerCeleb = date1 < date2 ? celeb2 : celeb1;

  const breadcrumbs = [
    { label: 'Compare Hub', href: '/compare' },
    { label: `${celeb1.name} vs ${celeb2.name}` },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-2 pb-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="text-center space-y-3 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200/60 uppercase tracking-wider">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Head-to-Head Celebrity Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {celeb1.name} <span className="text-pink-600">vs</span> {celeb2.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Comprehensive comparison of verified birthdays, exact age gap, zodiac astrology, and career milestones.
        </p>
      </div>

      {/* Age Gap Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-700 text-white shadow-xl text-center space-y-1">
        <span className="text-xs uppercase tracking-widest font-bold text-pink-200">
          Age Difference Breakdown
        </span>
        <h2 className="text-2xl sm:text-3xl font-black">
          {olderCeleb.name} is {diffYears} years older than {youngerCeleb.name}
        </h2>
        <p className="text-xs text-white/80 font-medium pt-1">
          Exact gap: {diffDays.toLocaleString()} calendar days
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Celebrity 1 Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-md">
              <CelebrityAvatar
                name={celeb1.name}
                profession={celeb1.primary_profession}
                imageUrl={celeb1.image_url}
                size="lg"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">{celeb1.name}</h3>
              <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mt-0.5">
                {celeb1.primary_profession || 'Star'}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Born</span>
                <span className="font-bold text-slate-900">{celeb1.birth_date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Age</span>
                <span className="font-bold text-slate-900">{age1?.age || 'N/A'} years old</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Zodiac Sign</span>
                <span className="font-bold text-indigo-600">{celeb1.zodiac_sign || 'Verified'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Birthplace</span>
                <span className="font-bold text-slate-900 truncate max-w-[180px]">{celeb1.birthplace || 'Global'}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/people/${celeb1.slug}`}
            className="w-full text-center py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
          >
            View Full {celeb1.name} Biography &rarr;
          </Link>
        </div>

        {/* Celebrity 2 Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-md">
              <CelebrityAvatar
                name={celeb2.name}
                profession={celeb2.primary_profession}
                imageUrl={celeb2.image_url}
                size="lg"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">{celeb2.name}</h3>
              <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mt-0.5">
                {celeb2.primary_profession || 'Star'}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Born</span>
                <span className="font-bold text-slate-900">{celeb2.birth_date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Age</span>
                <span className="font-bold text-slate-900">{age2?.age || 'N/A'} years old</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Zodiac Sign</span>
                <span className="font-bold text-indigo-600">{celeb2.zodiac_sign || 'Verified'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Birthplace</span>
                <span className="font-bold text-slate-900 truncate max-w-[180px]">{celeb2.birthplace || 'Global'}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/people/${celeb2.slug}`}
            className="w-full text-center py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
          >
            View Full {celeb2.name} Biography &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
