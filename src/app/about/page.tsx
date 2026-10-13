import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.brandName}'s mission to provide verified celebrity birthdays, factual biographies, and age calculations.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">About {SITE_CONFIG.brandName}</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            {SITE_CONFIG.brandName} is an independent digital reference resource dedicated to chronicling birthdays, life milestones, careers, and factual biographies of global public figures, performers, artists, and creators.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Our Mission</h2>
          <p>
            Unlike automated scrapers or speculative fan wikis, our focus is grounded in accuracy, content rights, and dynamic chronological calculations. Every record published on {SITE_CONFIG.brandName} goes through verification to ensure that birth dates, names, and biographical narratives reflect verifiable facts.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Responsible Data Handling</h2>
          <p>
            We adhere strictly to privacy and content licensing standards. We do not publish speculative rumors regarding living people, and our editorial workflows prioritize reputable sources including public records, encyclopedias, and primary industry citations.
          </p>
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
            <strong>Contact & Operator:</strong> Operated by {SITE_CONFIG.legalEntity} ({SITE_CONFIG.registeredAddress}, {SITE_CONFIG.cityPostalCountry}). Inquiries can be submitted via our <a href="/contact" className="text-indigo-600 underline">contact page</a> or directly at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-indigo-600 underline">{SITE_CONFIG.contactEmail}</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
