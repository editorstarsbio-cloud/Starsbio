import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: `Read the editorial guidelines, fact-checking criteria, and verification procedures governing ${SITE_CONFIG.brandName}.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/editorial-policy` },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Editorial & Fact-Checking Policy</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            At {SITE_CONFIG.brandName}, our editorial standard requires verifiable integrity, impartiality, and respect for privacy across all published biographical profiles.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Multi-Source Fact Verification</h2>
          <p>
            All biographical facts, birth dates, death dates, and birthplace records are corroborated against credible public sources, official government records, verified publisher archives, and authoritative biographical repositories.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Living Figures & Privacy</h2>
          <p>
            We strictly decline to publish speculative rumors, uncorroborated relationship claims, or private non-public information concerning living individuals. Profiles highlight acknowledged professional accomplishments, confirmed birth dates, and public career history.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Original Editorial Content</h2>
          <p>
            Biographies on {SITE_CONFIG.brandName} are written originally from verified facts. We do not copy third-party proprietary databases or rely on automated paraphrasing.
          </p>
        </div>
      </div>
    </div>
  );
}
