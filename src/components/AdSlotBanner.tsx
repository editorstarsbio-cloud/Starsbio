import React from 'react';

interface AdSlotBannerProps {
  slot: 'top-leaderboard' | 'in-content' | 'bottom-sticky';
  className?: string;
}

export function AdSlotBanner({ slot, className = '' }: AdSlotBannerProps) {
  // Flag to enable live ads once AdSense client ID is configured
  const showLiveAds = false;

  if (showLiveAds) {
    return (
      <div className={`ad-container ${className}`}>
        {/* Live AdSense Script code goes here */}
      </div>
    );
  }

  // Pre-allocated non-shifting placeholder layout (CLS-Shield)
  if (slot === 'top-leaderboard') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
        <div className="w-full max-w-[728px] h-[90px] rounded-2xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span>Sponsored Advertisement Slot</span>
        </div>
      </div>
    );
  }

  if (slot === 'in-content') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-6 ${className}`}>
        <div className="w-full max-w-[336px] sm:max-w-[728px] h-[280px] sm:h-[90px] rounded-2xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span>Sponsored Placement</span>
        </div>
      </div>
    );
  }

  return null;
}
