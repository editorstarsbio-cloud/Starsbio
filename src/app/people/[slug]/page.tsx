import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCelebrityBySlug, getRelatedCelebrities } from '@/lib/repository';
import { calculateAge, generateSlug, getMonthName, SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Calendar, MapPin, Sparkles, ShieldCheck, ExternalLink, Bookmark } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const celebrity = await getCelebrityBySlug(slug);

  if (!celebrity) {
    return {
      title: 'Profile Not Found',
      robots: { index: false, follow: false },
    };
  }

  const ageInfo = calculateAge(celebrity.birth_date, celebrity.death_date);
  const ageDescription = ageInfo ? (ageInfo.isDeceased ? `passed away at age ${ageInfo.age}` : `currently ${ageInfo.age} years old`) : '';

  const title = celebrity.seo_title || `${celebrity.name} — Birthday, Age, Bio & Facts | ${SITE_CONFIG.brandName}`;
  const description =
    celebrity.meta_description ||
    `Read ${celebrity.name}'s verified biography, birthday (${celebrity.birth_date}), ${ageDescription}, zodiac sign (${celebrity.zodiac_sign || ''}), and career milestones.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/people/${celebrity.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${SITE_CONFIG.siteUrl}/people/${celebrity.slug}`,
      images: celebrity.image_url ? [{ url: celebrity.image_url, alt: celebrity.name }] : [],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const celebrity = await getCelebrityBySlug(slug);

  if (!celebrity) {
    notFound();
  }

  const ageInfo = calculateAge(celebrity.birth_date, celebrity.death_date);
  const relatedProfiles = await getRelatedCelebrities(celebrity, 4);

  const [bYear, bMonth, bDay] = celebrity.birth_date.split('-').map(Number);
  const monthName = getMonthName(bMonth);

  // Structured Data (Schema.org Person & ProfilePage)
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: celebrity.name,
    birthDate: celebrity.birth_date,
    deathDate: celebrity.death_date || undefined,
    birthPlace: celebrity.birthplace ? { '@type': 'Place', name: celebrity.birthplace } : undefined,
    jobTitle: celebrity.primary_profession || undefined,
    description: celebrity.biography || undefined,
    image: celebrity.image_url || undefined,
    url: `${SITE_CONFIG.siteUrl}/people/${celebrity.slug}`,
  };

  const breadcrumbs = [
    { label: 'People', href: '/search' },
    celebrity.primary_profession
      ? { label: celebrity.primary_profession, href: `/category/${generateSlug(celebrity.primary_profession)}` }
      : { label: 'Profiles', href: '/' },
    { label: celebrity.name },
  ];

  const initials = celebrity.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Main Profile Header & Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar / Portrait */}
          <div className="w-full md:w-56 sm:w-48 aspect-square rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-amber-600 flex flex-col items-center justify-center text-white shrink-0 overflow-hidden shadow-md">
            {celebrity.image_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={celebrity.image_url}
                alt={celebrity.image_alt || celebrity.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span className="text-5xl font-black tracking-wider">{initials}</span>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-2">
                  {celebrity.primary_profession || 'Verified Profile'}
                </span>
              </>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {celebrity.primary_profession && (
                <Link
                  href={`/category/${generateSlug(celebrity.primary_profession)}`}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors uppercase tracking-wider"
                >
                  {celebrity.primary_profession}
                </Link>
              )}
              {celebrity.fact_check_status === 'verified' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fact-Checked Editorial</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {celebrity.name}
            </h1>

            {/* Quick Fact Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-y border-slate-100 py-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-medium">Born</span>
                <Link
                  href={`/birthdays/${bMonth}/${bDay}`}
                  className="font-bold text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  {monthName} {bDay}, {bYear}
                </Link>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-medium">
                  {ageInfo?.isDeceased ? 'Passed At' : 'Current Age'}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {ageInfo ? `${ageInfo.age} years old` : 'Unknown'}
                </span>
              </div>

              {celebrity.zodiac_sign && (
                <div>
                  <span className="text-slate-400 block uppercase font-medium">Sun Sign</span>
                  <Link
                    href={`/zodiac/${celebrity.zodiac_sign.toLowerCase()}`}
                    className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {celebrity.zodiac_sign}
                  </Link>
                </div>
              )}

              {celebrity.birthplace && (
                <div>
                  <span className="text-slate-400 block uppercase font-medium">Birthplace</span>
                  <span className="font-bold text-slate-800 truncate block">{celebrity.birthplace}</span>
                </div>
              )}
            </div>

            {/* Verified Bio */}
            {celebrity.biography && (
              <div className="pt-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">About & Biography</h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {celebrity.biography}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Internal Linking and Contextual Hubs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Birthday Link Box */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <Calendar className="w-5 h-5" />
              <h3 className="font-bold text-slate-900">Born on {monthName} {bDay}</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore other famous historical and modern public figures who celebrate their birthday on {monthName} {bDay}.
            </p>
          </div>
          <Link
            href={`/birthdays/${bMonth}/${bDay}`}
            className="mt-4 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            <span>View all {monthName} {bDay} birthdays</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Zodiac Sign Box */}
        {celebrity.zodiac_sign && (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-amber-600 mb-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-slate-900">{celebrity.zodiac_sign} Profiles</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Discover celebrities, musicians, and innovators born under the sign of {celebrity.zodiac_sign}.
              </p>
            </div>
            <Link
              href={`/zodiac/${celebrity.zodiac_sign.toLowerCase()}`}
              className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-800"
            >
              <span>Explore {celebrity.zodiac_sign} celebrities</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        )}

        {/* Category Box */}
        {celebrity.primary_profession && (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                <Bookmark className="w-5 h-5" />
                <h3 className="font-bold text-slate-900">{celebrity.primary_profession} Directory</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse our curated directory of top creators and leaders working in the {celebrity.primary_profession} industry.
              </p>
            </div>
            <Link
              href={`/category/${generateSlug(celebrity.primary_profession)}`}
              className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-800"
            >
              <span>Explore {celebrity.primary_profession} category</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </section>

      {/* Related Profiles */}
      {relatedProfiles.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Related {celebrity.primary_profession} Profiles
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Other notable figures in the same profession.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProfiles.map((rel) => (
              <CelebrityCard key={rel.id} celebrity={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
