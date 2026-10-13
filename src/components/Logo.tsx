import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textDimensions = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Visual Brand Mark */}
      <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-md shadow-pink-500/25 shrink-0 overflow-hidden`}>
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 drop-shadow"
        >
          {/* Five-point star */}
          <path
            d="M12 2.5L14.4 7.6L20 8.3L15.8 12.1L17 17.6L12 14.8L7 17.6L8.2 12.1L4 8.3L9.6 7.6L12 2.5Z"
            fill="#FFF8DC"
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />
          {/* Center heart / jewel dot */}
          <circle cx="12" cy="11" r="2.2" fill="#E11D48" />
          <circle cx="12" cy="11" r="1.1" fill="#FFFFFF" />
          {/* Mini sparkle top right */}
          <path
            d="M18.5 3.5C18.8 4.3 19.5 4.7 20.3 5C19.5 5.3 18.8 5.7 18.5 6.5C18.2 5.7 17.5 5.3 16.7 5C17.5 4.7 18.2 4.3 18.5 3.5Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <span className={`font-black tracking-tight leading-none ${textDimensions}`}>
          <span className="text-slate-900">Stars</span>
          <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Bio
          </span>
          <span className="text-pink-500 text-xs font-bold ml-0.5 tracking-normal">.co.uk</span>
        </span>
      )}
    </div>
  );
}
