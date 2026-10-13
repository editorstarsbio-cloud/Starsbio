'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { CelebrityAvatar } from '@/components/CelebrityAvatar';
import { Swords, CheckCircle2, ChevronRight } from 'lucide-react';

interface CelebrityBattleWidgetProps {
  currentCelebrity: Celebrity;
  competitors: Celebrity[];
}

export function CelebrityBattleWidget({
  currentCelebrity,
  competitors,
}: CelebrityBattleWidgetProps) {
  const competitor = competitors[0] || null;
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  if (!competitor) return null;

  // Mock initial votes for realistic drama
  const currentVotes = 64;
  const competitorVotes = 36;

  const handleVote = (slug: string) => {
    if (hasVoted) return;
    setSelectedSlug(slug);
    setHasVoted(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-indigo-800/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-800/80 pb-4">
        <div className="flex items-center space-x-2 text-pink-400 text-xs font-black uppercase tracking-wider">
          <Swords className="w-4 h-4 text-pink-400" />
          <span>Celebrity Face-Off: Who is More Popular?</span>
        </div>
        <span className="text-xs text-indigo-300 font-medium">
          Cast your vote to see live fan standings
        </span>
      </div>

      {/* 2 Contenders Side by Side */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
        {/* VS Badge in Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-slate-900">
          VS
        </div>

        {/* Card 1: Current Celebrity */}
        <div
          onClick={() => handleVote(currentCelebrity.slug)}
          className={`group cursor-pointer rounded-2xl p-4 sm:p-5 transition-all text-center flex flex-col items-center justify-between ${
            selectedSlug === currentCelebrity.slug
              ? 'bg-pink-900/60 border-2 border-pink-400'
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
          }`}
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md mb-3 border border-white/20">
            <CelebrityAvatar
              name={currentCelebrity.name}
              profession={currentCelebrity.primary_profession}
              imageUrl={currentCelebrity.image_url}
              size="lg"
            />
          </div>

          <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-pink-300 transition-colors truncate max-w-full">
            {currentCelebrity.name}
          </h4>
          <p className="text-[11px] text-indigo-200/80 truncate max-w-full mb-3">
            {currentCelebrity.primary_profession || 'Star'}
          </p>

          {hasVoted ? (
            <div className="w-full">
              <span className="text-xl font-black text-pink-400">{currentVotes}%</span>
              <div className="w-full h-2 rounded-full bg-white/10 mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-700"
                  style={{ width: `${currentVotes}%` }}
                />
              </div>
            </div>
          ) : (
            <button className="w-full py-2 rounded-xl bg-pink-600 group-hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-md">
              Vote {currentCelebrity.name.split(' ')[0]}
            </button>
          )}
        </div>

        {/* Card 2: Competitor */}
        <div
          onClick={() => handleVote(competitor.slug)}
          className={`group cursor-pointer rounded-2xl p-4 sm:p-5 transition-all text-center flex flex-col items-center justify-between ${
            selectedSlug === competitor.slug
              ? 'bg-indigo-900/60 border-2 border-indigo-400'
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
          }`}
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md mb-3 border border-white/20">
            <CelebrityAvatar
              name={competitor.name}
              profession={competitor.primary_profession}
              imageUrl={competitor.image_url}
              size="lg"
            />
          </div>

          <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors truncate max-w-full">
            {competitor.name}
          </h4>
          <p className="text-[11px] text-indigo-200/80 truncate max-w-full mb-3">
            {competitor.primary_profession || 'Star'}
          </p>

          {hasVoted ? (
            <div className="w-full">
              <span className="text-xl font-black text-indigo-400">{competitorVotes}%</span>
              <div className="w-full h-2 rounded-full bg-white/10 mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-700"
                  style={{ width: `${competitorVotes}%` }}
                />
              </div>
            </div>
          ) : (
            <button className="w-full py-2 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md">
              Vote {competitor.name.split(' ')[0]}
            </button>
          )}
        </div>
      </div>

      {/* Post-vote loop link */}
      {hasVoted && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200">
              Thanks for voting! Want to explore {competitor.name}&apos;s milestones?
            </span>
          </div>
          <Link
            href={`/people/${competitor.slug}`}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all inline-flex items-center space-x-1 shrink-0"
          >
            <span>View {competitor.name} Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
