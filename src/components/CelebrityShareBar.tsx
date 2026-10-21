'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Share2, PartyPopper, Check, Copy } from 'lucide-react';

interface CelebrityShareBarProps {
  celebrityName: string;
  birthDate: string;
  profession?: string | null;
  slug: string;
}

export function CelebrityShareBar({
  celebrityName,
  birthDate,
  profession,
  slug,
}: CelebrityShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [wishesCount, setWishesCount] = useState<number>(() => {
    // Deterministic base seed + local counter
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash << 5) - hash + slug.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 340) + 120;
  });
  const [hasWished, setHasWished] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://starsbio.co.uk/people/${slug}`;
  const shareText = `Discover ${celebrityName}'s verified Birthday, Age, Bio & Facts on StarsBio:`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out ${celebrityName}'s verified Birthday & Biography on @StarsBio:`
    )}&url=${encodeURIComponent(currentUrl)}&hashtags=StarsBio,${celebrityName.replace(/\s+/g, '')}`;
    window.open(twUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWishBirthday = () => {
    if (!hasWished) {
      setWishesCount((prev) => prev + 1);
      setHasWished(true);
    }

    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'],
    });
  };

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
      {/* Birthday Wish Confetti Button */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleWishBirthday}
          className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 shadow-xs active:scale-95 ${
            hasWished
              ? 'bg-rose-100 text-rose-700 border border-rose-200'
              : 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white shadow-pink-500/20'
          }`}
        >
          <PartyPopper className="w-3.5 h-3.5 animate-bounce" />
          <span>{hasWished ? 'Wished!' : `Wish ${celebrityName.split(' ')[0]} Happy Birthday`}</span>
        </button>

        <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
          ❤️ {wishesCount.toLocaleString()} wishes sent
        </span>
      </div>

      {/* Social Sharing Triggers */}
      <div className="flex items-center space-x-1.5 ml-auto">
        <span className="text-xs font-semibold text-slate-500 mr-1 hidden md:inline flex items-center gap-1">
          <Share2 className="w-3 h-3 text-slate-400" /> Share:
        </span>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          title="Share on WhatsApp"
          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors inline-flex items-center space-x-1"
        >
          <span>WhatsApp</span>
        </button>

        {/* X / Twitter */}
        <button
          type="button"
          onClick={handleTwitterShare}
          title="Share on X (Twitter)"
          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1"
        >
          <span>X / Tweet</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy Link to Clipboard"
          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors inline-flex items-center space-x-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
