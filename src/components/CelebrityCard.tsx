import React from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { calculateAge, generateSlug } from '@/lib/utils';
import { CelebrityAvatar } from '@/components/CelebrityAvatar';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

interface CelebrityCardProps {
  celebrity: Celebrity;
}

export function CelebrityCard({ celebrity }: CelebrityCardProps) {
  const ageInfo = calculateAge(celebrity.birth_date, celebrity.death_date);

  // Generate initials for avatar placeholder
  const initials = celebrity.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // Pick deterministic aesthetic background color based on name length
  const colors = [
    'from-blue-600 to-indigo-700',
    'from-amber-500 to-rose-600',
    'from-emerald-600 to-teal-700',
    'from-purple-600 to-violet-800',
    'from-cyan-600 to-blue-700',
  ];
  const bgGradient = colors[celebrity.name.length % colors.length];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
      <Link href={`/people/${celebrity.slug}`} className="block relative aspect-square bg-slate-100 overflow-hidden">
        <CelebrityAvatar
          name={celebrity.name}
          profession={celebrity.primary_profession}
          imageUrl={celebrity.image_url}
          imageAlt={celebrity.image_alt || `${celebrity.name} portrait`}
          size="lg"
        />

        {/* Dynamic age badge */}
        {ageInfo && (
          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white shadow-sm flex items-center space-x-1">
            <span>{ageInfo.isDeceased ? `Passed at ${ageInfo.age}` : `Age ${ageInfo.age}`}</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {celebrity.primary_profession && (
            <Link
              href={`/category/${generateSlug(celebrity.primary_profession)}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider block mb-1"
            >
              {celebrity.primary_profession}
            </Link>
          )}

          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            <Link href={`/people/${celebrity.slug}`}>{celebrity.name}</Link>
          </h3>

          <div className="mt-2 text-xs text-slate-500 space-y-1">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{celebrity.birth_date}</span>
            </div>

            {celebrity.birthplace && (
              <div className="flex items-center space-x-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{celebrity.birthplace}</span>
              </div>
            )}
          </div>
        </div>

        {celebrity.zodiac_sign && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <Link
              href={`/zodiac/${celebrity.zodiac_sign.toLowerCase()}`}
              className="hover:text-indigo-600 font-medium flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{celebrity.zodiac_sign}</span>
            </Link>
            <span className="text-[11px] text-slate-400">Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}
