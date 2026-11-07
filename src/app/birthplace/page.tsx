import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllBirthplaces } from '@/lib/repository';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { MapPin, Globe, ChevronRight } from 'lucide-react';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Celebrities by Birthplace & Country - Famous Birthdays Directory',
  description:
    'Explore celebrities, actors, singers, athletes, and creators organized by their birthplace country and state. Verified birthdays and biographies on StarsBio.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/birthplace`,
  },
};

export default async function BirthplacesIndexPage() {
  const birthplaces = await getAllBirthplaces(2);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Birthplaces' },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Birthplaces</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrities by Birthplace & Country
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Browse our comprehensive directory of famous people, actors, musicians, and creators sorted by their country and origin of birth.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {birthplaces.map((place) => (
          <Link
            key={place.slug}
            href={`/birthplace/${place.slug}`}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-pink-500 hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div className="truncate pr-2">
              <span className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors block truncate">
                {place.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {place.count.toLocaleString()} stars
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
