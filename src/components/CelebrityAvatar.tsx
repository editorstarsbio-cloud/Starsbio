import React from 'react';
import { Sparkles, User, Video, Music, Camera, Tv, Trophy } from 'lucide-react';

interface CelebrityAvatarProps {
  name: string;
  profession?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CelebrityAvatar({
  name,
  profession = 'Creator',
  imageUrl,
  imageAlt,
  className = '',
  size = 'md',
}: CelebrityAvatarProps) {
  if (imageUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-100 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt || `${name} portrait`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Generate initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // Deterministic palette based on name
  const palettes = [
    {
      bg: 'from-pink-500 via-rose-500 to-amber-500',
      badgeBg: 'bg-rose-400/30 text-rose-100 border-rose-300/40',
      tag: 'Creator',
    },
    {
      bg: 'from-purple-600 via-indigo-600 to-blue-500',
      badgeBg: 'bg-indigo-400/30 text-indigo-100 border-indigo-300/40',
      tag: 'Star',
    },
    {
      bg: 'from-emerald-500 via-teal-600 to-cyan-600',
      badgeBg: 'bg-teal-400/30 text-teal-100 border-teal-300/40',
      tag: 'Talent',
    },
    {
      bg: 'from-amber-500 via-orange-500 to-red-600',
      badgeBg: 'bg-orange-400/30 text-orange-100 border-orange-300/40',
      tag: 'Artist',
    },
    {
      bg: 'from-blue-600 via-indigo-700 to-violet-800',
      badgeBg: 'bg-blue-400/30 text-blue-100 border-blue-300/40',
      tag: 'Icon',
    },
  ];

  const palette = palettes[name.length % palettes.length];
  const pLower = (profession || '').toLowerCase();

  // Determine icon based on profession
  const renderIcon = () => {
    if (pLower.includes('tik') || pLower.includes('you') || pLower.includes('twitch')) {
      return <Video className="w-3.5 h-3.5 opacity-90" />;
    }
    if (pLower.includes('sing') || pLower.includes('rap') || pLower.includes('music')) {
      return <Music className="w-3.5 h-3.5 opacity-90" />;
    }
    if (pLower.includes('insta') || pLower.includes('model')) {
      return <Camera className="w-3.5 h-3.5 opacity-90" />;
    }
    if (pLower.includes('actor') || pLower.includes('actress') || pLower.includes('tv')) {
      return <Tv className="w-3.5 h-3.5 opacity-90" />;
    }
    if (pLower.includes('player') || pLower.includes('sport') || pLower.includes('boxer')) {
      return <Trophy className="w-3.5 h-3.5 opacity-90" />;
    }
    return <Sparkles className="w-3.5 h-3.5 opacity-90" />;
  };

  const isLarge = size === 'lg' || size === 'xl';

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-tr ${palette.bg} flex flex-col items-center justify-center text-white overflow-hidden select-none p-3 ${className}`}
    >
      {/* Decorative background radial pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/10 blur-xl pointer-events-none" />

      {/* Main Stylized Avatar Initials */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span
          className={`font-black tracking-tight drop-shadow-md ${
            size === 'xl'
              ? 'text-5xl'
              : size === 'lg'
              ? 'text-3xl'
              : size === 'sm'
              ? 'text-base'
              : 'text-2xl'
          }`}
        >
          {initials}
        </span>

        {/* Profession / Role Pill Tag */}
        {isLarge ? (
          <div
            className={`mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${palette.badgeBg}`}
          >
            {renderIcon()}
            <span className="truncate max-w-[130px]">{profession || palette.tag}</span>
          </div>
        ) : size === 'md' ? (
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-90 mt-1 truncate max-w-[90px] drop-shadow-sm">
            {profession || palette.tag}
          </span>
        ) : null}
      </div>
    </div>
  );
}
