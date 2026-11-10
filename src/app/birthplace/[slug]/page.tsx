import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCelebritiesByBirthplace, getAllBirthplaces } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { MapPin, Globe } from 'lucide-react';

export const revalidate = 86400; // Daily cache

interface BirthplacePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BirthplacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { birthplace } = await getCelebritiesByBirthplace(slug);

  if (!birthplace) {
    return { title: 'Birthplace Not Found', robots: { index: false } };
  }

  const title = `Celebrities Born in ${birthplace.name} | StarsBio Biographies`;
  const description = `Discover famous actors, singers, athletes, and public figures born in ${birthplace.name}. Explore verified birthdays, real ages, and life milestones on StarsBio.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/birthplace/${birthplace.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_CONFIG.siteUrl}/birthplace/${birthplace.slug}`,
      images: [{ url: `${SITE_CONFIG.siteUrl}/og-image.png`, width: 1200, height: 630, alt: `${birthplace.name} Celebrities` }],
    },
  };
}

export default async function BirthplaceDetailPage({ params }: BirthplacePageProps) {
  const { slug } = await params;
  const { birthplace, celebrities } = await getCelebritiesByBirthplace(slug, 100);

  if (!birthplace) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Birthplaces', href: '/birthplace' },
    { label: birthplace.name },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Country & Region Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Celebrities Born in {birthplace.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Browse through famous creators, actors, singers, and influential figures born in {birthplace.name}. Discover their verified birthdays, ages, and life stories.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-2xl flex items-center space-x-3 shrink-0">
          <Globe className="w-5 h-5 text-indigo-600" />
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Total Celebrities</span>
            <span className="text-lg font-black text-slate-900">{birthplace.count.toLocaleString()} Profiles</span>
          </div>
        </div>
      </div>

      {/* Celebrities Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Most Famous People from {birthplace.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {celebrities.map((celeb) => (
            <CelebrityCard key={celeb.id} celebrity={celeb} />
          ))}
        </div>
      </section>
    </div>
  );
}
