import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Terms of Use | ${SITE_CONFIG.brandName}`,
  description: `Terms and conditions governing the use of ${SITE_CONFIG.brandName}.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Use</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            By accessing or using {SITE_CONFIG.brandName}, you agree to be bound by these Terms of Use.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Use of Content</h2>
          <p>
            The biographical summaries, compilation formats, and site architecture of {SITE_CONFIG.brandName} are protected by copyright. Content is provided solely for personal, educational, and informational discovery.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Scraping and Automated Extraction</h2>
          <p>
            Automated harvesting, mass scraping, or unauthorized mirror copying of our compiled dataset without explicit written permission is strictly prohibited.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Limitation of Liability</h2>
          <p>
            While every effort is made to guarantee date accuracy, {SITE_CONFIG.brandName} makes no warranties regarding absolute completeness and shall not be held liable for discrepancies.
          </p>
        </div>
      </div>
    </div>
  );
}
