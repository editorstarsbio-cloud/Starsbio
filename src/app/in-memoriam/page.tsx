import React from 'react';
import type { Metadata } from 'next';
import { getDeceasedCelebrities } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Heart, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: `In Memoriam — Celebrated Figures & Historical Icons | ${SITE_CONFIG.brandName}`,
  description:
    'Honor and discover iconic public figures, historic leaders, pioneering artists, and celebrities who have passed away. Explore life milestones, birth dates, and ages.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/in-memoriam`,
  },
};

export default async function InMemoriamPage() {
  const deceasedCelebrities = await getDeceasedCelebrities(150);
  const breadcrumbs = [{ label: 'In Memoriam' }];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4 border border-slate-800">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>In Memoriam</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Remembering Famous Figures & Legends
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          A dedicated retrospective directory honoring celebrated actors, visionary scientists, world leaders, and musical icons who left an indelible legacy on culture and history.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {deceasedCelebrities.length} historical figures</span>
          <span className="flex items-center space-x-1 text-slate-400">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Honoring lasting legacies</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {deceasedCelebrities.map((celeb) => (
            <CelebrityCard key={celeb.id} celebrity={celeb} />
          ))}
        </div>
      </section>
    </div>
  );
}
