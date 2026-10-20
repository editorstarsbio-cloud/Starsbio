'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { Flame, ChevronRight, X } from 'lucide-react';

interface FloatingNextStarBarProps {
  candidates: Celebrity[];
}

export function FloatingNextStarBar({ candidates }: FloatingNextStarBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    // Show after scrolling 300px
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const targetStar = candidates[targetIndex] || null;
  if (!targetStar || !isVisible) return null;

  return (
    <aside
      aria-label="Trending Celebrity Recommendation"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 animate-slide-up"
    >
      <Link
        href={`/people/${targetStar.slug}`}
        className="flex items-center space-x-3 min-w-0 flex-1 group"
      >
        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-pink-600 flex-shrink-0 border border-white/20">
          {targetStar.image_url ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={targetStar.image_url}
                alt={targetStar.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0.5 right-0.5 pointer-events-none z-10 flex items-center bg-slate-950/70 px-0.5 rounded shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/starsbio-watermark.png" alt="StarsBio" className="h-1.5 w-auto object-contain brightness-110" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs">
              {targetStar.name[0]}
            </div>
          )}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-slate-900" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center space-x-1 text-[10px] text-pink-400 font-bold uppercase tracking-wider">
            <Flame className="w-3 h-3 text-pink-400 fill-pink-400" />
            <span>Trending Next</span>
          </div>
          <p className="text-xs font-black text-white group-hover:text-pink-300 transition-colors truncate">
            {targetStar.name}
          </p>
        </div>
      </Link>

      <div className="flex items-center space-x-2 shrink-0">
        <Link
          href={`/people/${targetStar.slug}`}
          className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center space-x-0.5"
        >
          <span>View</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close suggestion"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
