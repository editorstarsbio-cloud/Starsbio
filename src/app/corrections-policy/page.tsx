import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Corrections Policy | ${SITE_CONFIG.brandName}`,
  description: `Our transparent procedure for handling factual corrections and profile update requests.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/corrections-policy` },
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Corrections Policy' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Corrections Policy</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            {SITE_CONFIG.brandName} is dedicated to maintaining an accurate, transparent record. When an error regarding a birth date, name, profession, or biographical detail is identified, we act promptly to investigate and rectify it.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Submitting a Correction Request</h2>
          <p>
            Public figures, representatives, or readers who observe an inaccurate date or factual mistake can submit a correction notice by contacting <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-indigo-600 underline font-medium">{SITE_CONFIG.contactEmail}</a>.
          </p>
          <p>
            Please include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The full URL of the profile in question</li>
            <li>The specific claim or date that requires amendment</li>
            <li>Corroborating documentary evidence (e.g., official records, primary sources, public registers)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
