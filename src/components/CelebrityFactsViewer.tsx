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

  // 1. About section with substantive biographical narrative
  const professionText = celebrity.primary_profession || 'celebrity and cultural personality';
  const bioExcerpt = sentences.slice(0, 2).join('').trim();
  const aboutText = (
    <span>
      {bioExcerpt ? `${bioExcerpt} ` : ''}
      As a prominent{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {professionText}
      </Link>
      , {celebrity.name} has garnered widespread acclaim for their dedication, artistic distinctions, and consistent contribution to modern media. Their body of work continues to resonate across international audiences and inspiring industry newcomers.
    </span>
  );

  // 2. Before Fame
  const beforeFameExcerpt = sentences.length > 2 ? sentences.slice(2, 4).join('').trim() : '';
  const beforeFameText = (
    <span>
      {beforeFameExcerpt ? `${beforeFameExcerpt} ` : ''}
      Before rising to mainstream prominence as a recognized{' '}
      <Link href={professionLink} className="text-pink-600 hover:underline font-semibold">
        {professionText}
      </Link>
      , {celebrity.name} spent formative years developing practical mastery and establishing personal resilience
      {celebrity.birthplace ? ` in ${celebrity.birthplace}` : ''}.
      Early experiences, foundational mentors, and grassroots determination paved the way for breakthrough industry opportunities.
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
      . Astrological lore often attributes traits such as driven focus, expressive creativity, and natural dynamism to those born on this date. In addition to career accolades, they share this calendar anniversary with distinguished historical figures and international pioneers.
    </span>
  );

  // 4. Family Life
  const familyLifeText = celebrity.birthplace
    ? `${celebrity.name} was born and raised in ${celebrity.birthplace}. Throughout their career, they have credited their upbringing, regional heritage, and familial support system as steadying influences amidst public attention, maintaining a deep appreciation for their origins while navigating demanding professional commitments.`
    : `${celebrity.name} maintains a grounded personal life surrounded by longtime friends and family. While prioritizing privacy around personal matters, their journey reflects enduring loyalty to early supporters and a commitment to balancing career momentum with family time.`;

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
      . Both figures exemplify the lasting impact of creative discipline within contemporary entertainment.
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
      icons in modern entertainment, contributing to a vibrant legacy of public achievement.
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
