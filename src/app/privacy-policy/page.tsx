import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy explaining how data is handled on ${SITE_CONFIG.brandName}.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <div className="prose prose-slate text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            Last Updated: October 2026. This Privacy Policy outlines our practices regarding data collection and usage on {SITE_CONFIG.brandName}.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Visitor Information</h2>
          <p>
            We do not require user accounts or personal registration to browse celebrity biographies, birthday archives, or zodiac profiles. We collect standard server logs (IP address, browser type, referral URLs) solely to ensure site performance, security, and uptime.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Cookies</h2>
          <p>
            Our website uses minimal necessary cookies to manage session caching and prevent denial-of-service abuse. We do not employ third-party behavioral profiling trackers.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Data Subject Rights & Removal</h2>
          <p>
            Public figures or their legal representatives who wish to inquire regarding biographical entries can contact our data team at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-indigo-600 underline">{SITE_CONFIG.contactEmail}</a>.
          </p>
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
            <strong>Jurisdiction Notice:</strong> Governed by the {SITE_CONFIG.governingLaw}. Site Operator: {SITE_CONFIG.legalEntity}, {SITE_CONFIG.registeredAddress}, {SITE_CONFIG.cityPostalCountry}. Official privacy & compliance queries: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-indigo-600 underline">{SITE_CONFIG.contactEmail}</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
