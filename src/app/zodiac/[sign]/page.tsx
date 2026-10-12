import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCelebritiesByZodiac } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ZODIAC_SIGNS, SITE_CONFIG } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface ZodiacPageProps {
  params: Promise<{ sign: string }>;
}

export async function generateMetadata({ params }: ZodiacPageProps): Promise<Metadata> {
  const { sign: rawSign } = await params;
  const formattedKey = rawSign.charAt(0).toUpperCase() + rawSign.slice(1).toLowerCase();
  const signInfo = ZODIAC_SIGNS[formattedKey];

  if (!signInfo) {
    return { title: 'Zodiac Sign Not Found', robots: { index: false } };
  }

  const title = `Famous ${signInfo.sign} Celebrities & Birthdays | ${SITE_CONFIG.brandName}`;
  const description = `Explore public figures, musicians, and actors born under the ${signInfo.sign} sign (${signInfo.dateRange}). Discover dynamic ages and biographies.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/zodiac/${rawSign.toLowerCase()}`,
    },
  };
}

export default async function ZodiacDetailPage({ params }: ZodiacPageProps) {
  const { sign: rawSign } = await params;
  const formattedKey = rawSign.charAt(0).toUpperCase() + rawSign.slice(1).toLowerCase();
  const signInfo = ZODIAC_SIGNS[formattedKey];

  if (!signInfo) {
    notFound();
  }

  const celebrities = await getCelebritiesByZodiac(signInfo.sign, 100);

  const breadcrumbs = [
    { label: 'Zodiac Directory', href: '/zodiac' },
    { label: `${signInfo.sign}` },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">{signInfo.symbol}</span>
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{signInfo.element} Sign • {signInfo.dateRange}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Famous {signInfo.sign} Celebrities
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          {signInfo.description} Note: Astrological signs are organized based on verified calendar date thresholds rather than empirical personality claims.
        </p>
      </div>

      {celebrities.length > 0 ? (
        <section className="space-y-4">
          <div className="text-xs text-slate-500 px-1">
            <span>Showing {celebrities.length} published profiles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {celebrities.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          <p>No verified profiles for {signInfo.sign} published yet.</p>
        </div>
      )}
    </div>
  );
}
