'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface CelebrityFAQSectionProps {
  celebrityName: string;
  faqs: FAQItem[];
}

export function CelebrityFAQSection({ celebrityName, faqs }: CelebrityFAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="space-y-4 pt-6 border-t border-slate-200">
      <div className="flex items-center space-x-2 text-slate-900">
        <div className="p-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-100">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions about {celebrityName}
          </h2>
          <p className="text-xs text-slate-500">
            Common questions answered with verified editorial facts & records
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);

          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-pink-600 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-pink-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
