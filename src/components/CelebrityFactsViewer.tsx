import React from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { generateSlug, getMonthName } from '@/lib/utils';
import { Sparkles, History, Heart, Users, HelpCircle, Compass } from 'lucide-react';

interface CelebrityFactsViewerProps {
  celebrity: Celebrity;
}

export function CelebrityFactsViewer({ celebrity }: CelebrityFactsViewerProps) {
  const bio = celebrity.biography || '';
  const [bYear, bMonth, bDay] = celebrity.birth_date.split('-').map(Number);
  const monthName = getMonthName(bMonth);

  // Split bio into available sentences
  const sentences = bio.match(/[^.!?]+[.!?]+(\s+|$)/g) || (bio ? [bio] : []);

  // 1. About section
  const aboutText = sentences.slice(0, 2).join('').trim() ||
    `${celebrity.name} is a celebrated ${celebrity.primary_profession || 'public figure'} recognized worldwide for their contributions to the industry and cultural influence.`;

  // 2. Before Fame
  const beforeFameText = sentences.length > 2
    ? sentences.slice(2, 4).join('').trim()
    : `Before rising to global prominence as a ${celebrity.primary_profession || 'celebrity'}, ${celebrity.name} spent formative years developing their craft and pursuing early creative endeavors${celebrity.birthplace ? ` in ${celebrity.birthplace}` : ''}.`;

  // 3. Trivia
  const triviaText = sentences.length > 4
    ? sentences.slice(4, 6).join('').trim()
    : `${celebrity.name} was born on ${monthName} ${bDay}, ${bYear}. Under the astrological sun sign of ${celebrity.zodiac_sign || 'the zodiac'}, they have garnered a dedicated following across international audiences and media outlets.`;

  // 4. Family Life
  const familyLifeText = celebrity.birthplace
    ? `${celebrity.name} was born and raised in ${celebrity.birthplace}. Throughout their career, they have maintained strong connections to their heritage and personal roots while balancing public stardom.`
    : `${celebrity.name} celebrates their personal life with close friends and family, keeping details of their personal relationships focused on mutual support and creative encouragement.`;

  // 5. Associated With
  const professionLink = celebrity.primary_profession
    ? `/category/${generateSlug(celebrity.primary_profession)}`
    : '/category';

  const associatedWithText = (
    <span>
      As a prominent{' '}
      <Link href={professionLink} className="text-indigo-600 hover:underline font-semibold">
        {celebrity.primary_profession || 'personality'}
      </Link>
      , {celebrity.name} shares artistic and creative acclaim alongside other renowned peers born on{' '}
      <Link href={`/birthdays/${bMonth}/${bDay}`} className="text-indigo-600 hover:underline font-semibold">
        {monthName} {bDay}
      </Link>{' '}
      and fellow {celebrity.zodiac_sign || ''} stars in modern entertainment.
    </span>
  );

  return (
    <div className="space-y-6 pt-4 border-t border-slate-100">
      {/* 1. About */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-900">
          <Sparkles className="w-4 h-4 text-indigo-600" />
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
