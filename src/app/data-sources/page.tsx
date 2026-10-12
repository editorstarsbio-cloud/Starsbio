import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Data Sources & Content Rights | ${SITE_CONFIG.brandName}`,
  description: `How ${SITE_CONFIG.brandName} verifies information, attributes sources, and respects intellectual property rights.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/data-sources` },
};

export default function DataSourcesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Data Sources' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Data Sources & Content Standards</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            The information published on {SITE_CONFIG.brandName} is curated from reliable public records, authoritative biographical archives, encyclopedic databases, and direct editorial research.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Respect for Copyright & Image Rights</h2>
          <p>
            We strictly respect intellectual property. We do not hotlink copyrighted images or scrape proprietary databases without authorization. Until licensed or verified public domain photographic assets are assigned, profiles display attractive initials-based graphical placeholders.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Internal Review Statuses</h2>
          <p>
            Imported database records remain in internal review until verified by our staff. Only profiles that meet our rigorous accuracy and rights guidelines are published to the public index.
          </p>
        </div>
      </div>
    </div>
  );
}
