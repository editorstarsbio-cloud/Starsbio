import React from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { calculateAge } from '@/lib/utils';

interface CompactCelebrityCardProps {
  celebrity: Celebrity;
}

export function CompactCelebrityCard({ celebrity }: CompactCelebrityCardProps) {
  const ageInfo = calculateAge(celebrity.birth_date, celebrity.death_date);

  const initials = celebrity.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const colors = [
    'from-rose-500 to-pink-600',
    'from-indigo-600 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-purple-600 to-violet-700',
  ];
  const bgGradient = colors[celebrity.name.length % colors.length];

  return (
    <Link
      href={`/people/${celebrity.slug}`}
      className="group block text-center focus:outline-none"
    >
      {/* Square Rounded Photo Card */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/70 group-hover:shadow-md group-hover:border-pink-300 transition-all duration-200">
        {celebrity.image_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={celebrity.image_url}
            alt={celebrity.image_alt || celebrity.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-tr ${bgGradient} flex items-center justify-center text-white`}>
            <span className="text-2xl font-black tracking-tight">{initials}</span>
          </div>
        )}
      </div>

      {/* Name, Age & Profession */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate">
          {celebrity.name}
          {ageInfo ? (
            <span className="font-semibold text-slate-700">, {ageInfo.age}</span>
          ) : null}
        </h3>
        <p className="text-xs text-slate-500 truncate font-medium mt-0.5">
          {celebrity.primary_profession || 'Public Figure'}
        </p>
      </div>
    </Link>
  );
}
