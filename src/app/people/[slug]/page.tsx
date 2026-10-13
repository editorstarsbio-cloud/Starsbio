import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCelebrityBySlug, getRelatedCelebrities, getCelebritiesBornOn } from '@/lib/repository';
import { calculateAge, generateSlug, getMonthName, SITE_CONFIG } from '@/lib/utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CelebrityCard } from '@/components/CelebrityCard';
import { CelebrityAvatar } from '@/components/CelebrityAvatar';
import { CelebrityFactsViewer } from '@/components/CelebrityFactsViewer';
import { CelebrityBoostButton } from '@/components/CelebrityBoostButton';
import { CelebrityBattleWidget } from '@/components/CelebrityBattleWidget';
import { FloatingNextStarBar } from '@/components/FloatingNextStarBar';
import { Calendar, Sparkles, ShieldCheck, ExternalLink, Bookmark, TrendingUp, Award, Users } from 'lucide-react';

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

  const professionStr = celebrity.primary_profession ? ` (${celebrity.primary_profession})` : '';
  const ageStr = ageInfo ? (ageInfo.isDeceased ? ` (19xx-${ageInfo.age})` : ` - Age ${ageInfo.age}`) : '';
  
  const title = `${celebrity.name}${professionStr} Birthday, Real Age${ageStr} & Biography`;
  const description =
    `Who is ${celebrity.name}? Born on ${celebrity.birth_date}, ${ageDescription}. Discover real height, relationships, net worth insights, family life, zodiac secrets, and career trivia on StarsBio.`;

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
  const relatedProfiles = await getRelatedCelebrities(celebrity, 8);
  const associatedPeer = relatedProfiles.length > 0 ? relatedProfiles[0] : null;

  const [bYear, bMonth, bDay] = celebrity.birth_date.split('-').map(Number);
  const monthName = getMonthName(bMonth);

  // Fetch more celebrities born on same date
  const sameBirthdayList = (await getCelebritiesBornOn(bMonth, bDay, 8)).filter((c) => c.slug !== celebrity.slug).slice(0, 4);

  // Deterministic Rank badge numbers based on slug hash for fun engagement
  let hash = 0;
  for (let i = 0; i < celebrity.slug.length; i++) {
    hash = (hash << 5) - hash + celebrity.slug.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const overallRank = (positiveHash % 900) + 100;
  const ageRank = ((positiveHash >> 2) % 45) + 1;
  const signRank = ((positiveHash >> 3) % 70) + 1;
  const birthDayRank = ((positiveHash >> 4) % 15) + 1;

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
          <div className="w-full md:w-64 sm:w-52 aspect-square rounded-2xl shrink-0 overflow-hidden shadow-md">
            <CelebrityAvatar
              name={celebrity.name}
              profession={celebrity.primary_profession}
              imageUrl={celebrity.image_url}
              imageAlt={celebrity.image_alt || celebrity.name}
              size="xl"
              priority={true}
            />
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {celebrity.name}
              </h1>

              <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
                {/* Popularity Ranking Pill */}
                <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-200/70 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-pink-700">
                  <TrendingUp className="w-4 h-4 text-pink-600" />
                  <span>#{overallRank} Popular</span>
                </div>

                {/* High-CTR Interactive Boost Button */}
                <CelebrityBoostButton
                  celebritySlug={celebrity.slug}
                  celebrityName={celebrity.name}
                  initialBoosts={positiveHash % 4000 + 1200}
                />
              </div>
            </div>

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
                  <span className="text-slate-400 block uppercase font-medium">Birth Sign</span>
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

            {/* Comprehensive 5-Section Editorial Facts (About, Before Fame, Trivia, Family Life, Associated With) */}
            <CelebrityFactsViewer celebrity={celebrity} associatedPeer={associatedPeer} />

            {/* In-depth Editorial Deep Dive Story Link (if available) */}
            {celebrity.slug === 'shah-rukh-khan' && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-indigo-50 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      In-Depth Biography: Who is Shah Rukh Khan?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Read full breakdown of SRK&apos;s family background, children, spouse, net worth, and historic awards.
                    </p>
                  </div>
                </div>
                <Link
                  href="/blog/who-is-shah-rukh-khan-biography-net-worth-family-awards"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shrink-0 transition-all shadow-sm"
                >
                  Read Full Story &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popularity Rankings Grid (Inspired by FamousBirthdays) */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Award className="w-4 h-4 text-indigo-500" />
          <span>Popularity & Rankings</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-pink-50/70 rounded-2xl border border-pink-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Most Popular</span>
            <span className="text-lg font-black text-pink-700">#{overallRank}</span>
          </div>
          {ageInfo && (
            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{ageInfo.age} Year Old</span>
              <span className="text-lg font-black text-purple-700">#{ageRank}</span>
            </div>
          )}
          {celebrity.zodiac_sign && (
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{celebrity.zodiac_sign}</span>
              <span className="text-lg font-black text-amber-700">#{signRank}</span>
            </div>
          )}
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Born on {monthName} {bDay}</span>
            <span className="text-lg font-black text-indigo-700">#{birthDayRank}</span>
          </div>
        </div>
      </section>

      {/* High-CTR Celebrity Battle Face-Off Widget */}
      {relatedProfiles.length > 0 && (
        <CelebrityBattleWidget
          currentCelebrity={celebrity}
          competitors={relatedProfiles}
        />
      )}

      {/* Fans Also Viewed / Related Profiles */}
      {relatedProfiles.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-slate-900">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold tracking-tight">
              {celebrity.name} Fans Also Viewed
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProfiles.map((rel) => (
              <CelebrityCard key={rel.id} celebrity={rel} />
            ))}
          </div>
        </section>
      )}

      {/* More Born on This Date */}
      {sameBirthdayList.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold tracking-tight">
                More {monthName} {bDay} Birthdays
              </h2>
            </div>
            <Link
              href={`/birthdays/${bMonth}/${bDay}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View all</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sameBirthdayList.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        </section>
      )}

      {/* Internal Linking and Contextual Hubs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
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

      {/* Sticky Floating Next Trending Star Bar (Mobile & Desktop Scroll CTR Booster) */}
      {relatedProfiles.length > 0 && (
        <FloatingNextStarBar candidates={relatedProfiles} />
      )}
    </article>
  );
}
