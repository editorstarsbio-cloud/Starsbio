import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Mail, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: `Contact Editorial Team | ${SITE_CONFIG.brandName}`,
  description: `Contact the editorial desk at ${SITE_CONFIG.brandName} for corrections, profile inquiries, or rights verification.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Contact Editorial Team</h1>
          <p className="text-slate-500 text-sm mt-2">
            Reach out to our researchers, fact-checkers, or data rights administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
            <div>
              <Mail className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-sm">General Editorial</h3>
              <p className="text-xs text-slate-500 mt-1">Direct inquiries, biographical feedback, and general notes.</p>
            </div>
            <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="mt-4 text-xs font-bold text-indigo-600 truncate underline">
              {SITE_CONFIG.contactEmail}
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-sm">Corrections & Rights</h3>
              <p className="text-xs text-slate-500 mt-1">Factual date disputes, image clearance, and verification notices.</p>
            </div>
            <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="mt-4 text-xs font-bold text-emerald-600 truncate underline">
              {SITE_CONFIG.contactEmail}
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <Clock className="w-6 h-6 text-slate-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-sm">Response Time</h3>
              <p className="text-xs text-slate-500 mt-1">Editorial correction inquiries are typically resolved within 2-3 business days.</p>
            </div>
            <span className="mt-4 text-xs text-slate-400 font-medium">Standard Hours: Mon-Fri</span>
          </div>
        </div>

        <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 text-xs text-slate-500 space-y-1.5">
          <h4 className="font-bold text-slate-700 text-sm">Editorial Office & Physical Inquiries</h4>
          <p className="font-semibold text-slate-800">{SITE_CONFIG.legalEntity}</p>
          <p>{SITE_CONFIG.registeredAddress}</p>
          <p>{SITE_CONFIG.cityPostalCountry}</p>
          <p className="pt-1 text-slate-400">Jurisdiction: {SITE_CONFIG.governingLaw}</p>
        </div>
      </div>
    </div>
  );
}
