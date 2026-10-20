import React from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { generateSlug, getMonthName } from '@/lib/utils';
import { Sparkles, History, Heart, Users, HelpCircle } from 'lucide-react';

interface CelebrityFactsViewerProps {
  celebrity: Celebrity;
  associatedPeer?: Celebrity | null;
}

export function CelebrityFactsViewer({ celebrity, associatedPeer }: CelebrityFactsViewerProps) {
  const bio = celebrity.biography || '';
  const [bYear, bMonth, bDay] = celebrity.birth_date.split('-').map(Number);
  const monthName = getMonthName(bMonth);

  // Split bio into available sentences
  const sentences = bio.match(/[^.!?]+[.!?]+(\s+|$)/g) || (bio ? [bio] : []);

  // 1. About section with internal links
  const professionLink = celebrity.primary_profession
    ? `/category/${generateSlug(celebrity.primary_profession)}`
    : '/category';

  const professionText = celebrity.primary_profession || 'cultural personality';
  const isAthlete = /player|footballer|boxer|driver|runner|fighter|athlete|cricketer/i.test(professionText);
  const domainTerm = isAthlete ? 'athletic excellence and sporting achievements' : 'distinguished talent and dedication';
  const audienceTerm = isAthlete ? 'sports fans and international spectators' : 'global audiences and peers';

  const bioExcerpt = sentences.slice(0, 2).join('').trim();
  const aboutText = (
    <span>
      {bioExcerpt ? `${bioExcerpt} ` : ''}
      As a world-renowned{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {professionText}
      </Link>
      , {celebrity.name} has earned widespread acclaim for {domainTerm}. Their achievements continue to inspire {audienceTerm} worldwide.
    </span>
  );

  // 2. Before Fame
  const beforeFameExcerpt = sentences.length > 2 ? sentences.slice(2, 4).join('').trim() : '';
  const beforeFameText = (
    <span>
      {beforeFameExcerpt ? `${beforeFameExcerpt} ` : ''}
      Before achieving global recognition as an elite{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {professionText}
      </Link>
      , {celebrity.name} spent formative early years mastering their discipline
      {celebrity.birthplace ? ` in ${celebrity.birthplace}` : ''}.
      Relentless training, early competitive experiences, and perseverance laid the groundwork for their breakthrough success.
    </span>
  );

  // 3. Trivia (with links to Zodiac and Date)
  const zodiacLink = celebrity.zodiac_sign ? `/zodiac/${celebrity.zodiac_sign.toLowerCase()}` : '/zodiac';
  const birthdayLink = `/birthdays/${bMonth}/${bDay}`;
  const triviaExcerpt = sentences.length > 4 ? sentences.slice(4, 6).join('').trim() : '';

  const triviaText = (
    <span>
      {triviaExcerpt ? `${triviaExcerpt} ` : ''}
      Born on{' '}
      <Link href={birthdayLink} className="text-pink-600 hover:underline font-semibold">
        {monthName} {bDay}, {bYear}
      </Link>
      , {celebrity.name}&apos;s astrological sign is{' '}
      <Link href={zodiacLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.zodiac_sign || 'Aries'}
      </Link>
      . Astrological profiles highlight focus, natural dynamism, and competitive excellence among those born under this sign.
    </span>
  );

  // 4. Family Life
  const familyLifeText = celebrity.birthplace
    ? `${celebrity.name} was born in ${celebrity.birthplace}. Throughout their career, they have credited their family roots and early upbringing as fundamental pillars supporting their professional milestones.`
    : `${celebrity.name} maintains a grounded personal life surrounded by family and close confidants while balancing an elite international career.`;

  // 5. Associated With (Real Celebrity-to-Celebrity Direct Internal Link)
  const associatedWithText = associatedPeer ? (
    <span>
      Much like fellow acclaimed{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'star'}
      </Link>{' '}
      <Link
        href={`/people/${associatedPeer.slug}`}
        className="text-pink-600 hover:underline font-bold inline-flex items-center"
      >
        <span>{associatedPeer.name}</span>
      </Link>
      , {celebrity.name} has built a legacy celebrated across modern culture and international followers.
    </span>
  ) : (
    <span>
      {celebrity.name} collaborates and connects with leading pioneers and high-profile peers across the global{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'industry'}
      </Link>{' '}
      community.
    </span>
  );

  const sections = [
    {
      title: 'About',
      icon: Sparkles,
      content: aboutText,
      accent: 'text-amber-500',
    },
    {
      title: 'Before Fame',
      icon: History,
      content: beforeFameText,
      accent: 'text-blue-500',
    },
    {
      title: 'Trivia & Astrological Facts',
      icon: HelpCircle,
      content: triviaText,
      accent: 'text-purple-500',
    },
    {
      title: 'Family Life',
      icon: Heart,
      content: familyLifeText,
      accent: 'text-rose-500',
    },
    {
      title: 'Associated With',
      icon: Users,
      content: associatedWithText,
      accent: 'text-indigo-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <Sparkles className="w-5 h-5 text-pink-600" />
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Facts, Biography & Life Timeline
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const isFullWidth = idx === 0 || idx === sections.length - 1;

          return (
            <div
              key={section.title}
              className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-3 ${
                isFullWidth ? 'md:col-span-2' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-lg bg-slate-50 border border-slate-100 ${section.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {section.title}
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
