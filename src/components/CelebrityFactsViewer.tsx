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

  const aboutText = sentences.slice(0, 2).join('').trim() || (
    <span>
      {celebrity.name} is a renowned{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'public figure'}
      </Link>{' '}
      recognized worldwide for their creative accomplishments, public milestones, and cultural influence across the entertainment landscape.
    </span>
  );

  // 2. Before Fame
  const beforeFameText = sentences.length > 2
    ? sentences.slice(2, 4).join('').trim()
    : (
      <span>
        Before gaining international recognition as a leading{' '}
        <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
          {celebrity.primary_profession || 'personality'}
        </Link>
        , {celebrity.name} spent formative years honing their craft and building creative foundations
        {celebrity.birthplace ? ` in ${celebrity.birthplace}` : ''}.
      </span>
    );

  // 3. Trivia (with links to Zodiac and Date)
  const zodiacLink = celebrity.zodiac_sign ? `/zodiac/${celebrity.zodiac_sign.toLowerCase()}` : '/zodiac';
  const birthdayLink = `/birthdays/${bMonth}/${bDay}`;

  const triviaText = sentences.length > 4
    ? sentences.slice(4, 6).join('').trim()
    : (
      <span>
        {celebrity.name} was born on{' '}
        <Link href={birthdayLink} className="text-pink-600 hover:underline font-semibold">
          {monthName} {bDay}, {bYear}
        </Link>
        . Their astrological sun sign is{' '}
        <Link href={zodiacLink} className="text-pink-600 hover:underline font-semibold">
          {celebrity.zodiac_sign || 'Aries'}
        </Link>
        , connecting them to an iconic roster of creators and pioneers sharing celestial traits.
      </span>
    );

  // 4. Family Life
  const familyLifeText = celebrity.birthplace
    ? `${celebrity.name} was born and raised in ${celebrity.birthplace}. Throughout their career, they have maintained strong connections to their heritage and personal roots while balancing public stardom.`
    : `${celebrity.name} celebrates their personal journey with close friends and family, keeping details of their personal relationships focused on mutual support and creative encouragement.`;

  // 5. Associated With (Real Celebrity-to-Celebrity Direct Internal Link)
  const associatedWithText = associatedPeer ? (
    <span>
      Much like fellow acclaimed{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'star'}
      </Link>{' '}
      <Link href={`/people/${associatedPeer.slug}`} className="text-pink-600 hover:underline font-bold">
        {associatedPeer.name}
      </Link>
      , {celebrity.name} has shaped modern popular culture and shares creative acclaim among peers born under{' '}
      <Link href={zodiacLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.zodiac_sign || 'the zodiac'}
      </Link>{' '}
      and stars celebrating birthdays on{' '}
      <Link href={birthdayLink} className="text-pink-600 hover:underline font-semibold">
        {monthName} {bDay}
      </Link>
      .
    </span>
  ) : (
    <span>
      As a prominent{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'personality'}
      </Link>
      , {celebrity.name} shares artistic and creative acclaim alongside other renowned peers born on{' '}
      <Link href={birthdayLink} className="text-pink-600 hover:underline font-semibold">
        {monthName} {bDay}
      </Link>{' '}
      and fellow{' '}
      <Link href={zodiacLink} className="text-pink-600 hover:underline font-semibold">
        {celebrity.zodiac_sign || 'zodiac'}
      </Link>{' '}
      icons in modern entertainment.
    </span>
  );

  return (
    <div className="space-y-6 pt-4 border-t border-slate-100">
      {/* 1. About */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <Sparkles className="w-4 h-4 text-pink-600" />
          <h3 className="text-base font-bold tracking-tight">About</h3>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal pl-6">
          {aboutText}
        </p>
      </div>

      {/* 2. Before Fame */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <History className="w-4 h-4 text-amber-500" />
          <h3 className="text-base font-bold tracking-tight">Before Fame</h3>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal pl-6">
          {beforeFameText}
        </p>
      </div>

      {/* 3. Trivia */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <HelpCircle className="w-4 h-4 text-emerald-500" />
          <h3 className="text-base font-bold tracking-tight">Trivia</h3>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal pl-6">
          {triviaText}
        </p>
      </div>

      {/* 4. Family Life */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <Heart className="w-4 h-4 text-rose-500" />
          <h3 className="text-base font-bold tracking-tight">Family Life</h3>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal pl-6">
          {familyLifeText}
        </p>
      </div>

      {/* 5. Associated With */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <Users className="w-4 h-4 text-purple-600" />
          <h3 className="text-base font-bold tracking-tight">Associated With</h3>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal pl-6">
          {associatedWithText}
        </p>
      </div>
    </div>
  );
}
