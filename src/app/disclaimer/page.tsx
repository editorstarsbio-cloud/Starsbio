import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_CONFIG.brandName}`,
  description: `General informational and astrological disclaimer for ${SITE_CONFIG.brandName}.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Disclaimer</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">1. Informational & Biographical Reference</h2>
          <p>
            {SITE_CONFIG.brandName} is an editorial directory compiled for entertainment, cultural, and informational purposes. All biographical statements and birthday dates represent verifiable facts drawn from public records.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Astrological Classifications</h2>
          <p>
            Zodiac signs displayed throughout this platform represent conventional date-based astrological classifications. {SITE_CONFIG.brandName} makes no scientific claims regarding personality forecasting, destiny, or empirical influence of zodiac signs.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">3. No Commercial Affiliation</h2>
          <p>
            Unless explicitly stated, {SITE_CONFIG.brandName} is not sponsored, endorsed by, or affiliated with the celebrities, artists, or public figures profiled on this site.
          </p>
        </div>
      </div>
    </div>
  );
}
