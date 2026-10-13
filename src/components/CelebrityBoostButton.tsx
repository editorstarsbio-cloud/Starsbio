'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Check, Sparkles } from 'lucide-react';

interface CelebrityBoostButtonProps {
  celebritySlug: string;
  celebrityName: string;
  initialBoosts?: number;
}

export function CelebrityBoostButton({
  celebritySlug,
  celebrityName,
  initialBoosts = 1420,
}: CelebrityBoostButtonProps) {
  const [boostCount, setBoostCount] = useState(initialBoosts);
  const [hasBoosted, setHasBoosted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Check local storage for persistent vote
    try {
      const boostedMap = JSON.parse(localStorage.getItem('starsbio_boosts') || '{}');
      if (boostedMap[celebritySlug]) {
        setHasBoosted(true);
        setBoostCount((prev) => prev + 1);
      }
    } catch {
      // ignore
    }
  }, [celebritySlug]);

  const handleBoost = () => {
    if (hasBoosted) return;

    setHasBoosted(true);
    setBoostCount((prev) => prev + 1);
    setShowAnimation(true);

    try {
      const boostedMap = JSON.parse(localStorage.getItem('starsbio_boosts') || '{}');
      boostedMap[celebritySlug] = true;
      localStorage.setItem('starsbio_boosts', JSON.stringify(boostedMap));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setShowAnimation(false);
    }, 2500);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        onClick={handleBoost}
        disabled={hasBoosted}
        className={`relative group inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 shadow-md ${
          hasBoosted
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300/80 cursor-default'
            : 'bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-pink-600/30 hover:scale-105 active:scale-95 cursor-pointer'
        }`}
        aria-label={`Boost popularity for ${celebrityName}`}
      >
        {hasBoosted ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Rank Boosted! ({boostCount.toLocaleString()})</span>
          </>
        ) : (
          <>
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
            <span>Boost Popularity</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
              {boostCount.toLocaleString()}
            </span>
          </>
        )}
      </button>

      {/* Floating Confetti / Sparkle Notification on click */}
      {showAnimation && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl flex items-center space-x-1 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>+1 Popularity Vote Added!</span>
        </div>
      )}
    </div>
  );
}
