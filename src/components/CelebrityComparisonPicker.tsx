'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types/database';
import { ArrowLeftRight, Search, Check } from 'lucide-react';

interface CelebrityComparisonPickerProps {
  celebrities: Celebrity[];
}

export function CelebrityComparisonPicker({ celebrities }: CelebrityComparisonPickerProps) {
  const [star1, setStar1] = useState<Celebrity | null>(() => celebrities[0] || null); // e.g. Lionel Messi
  const [star2, setStar2] = useState<Celebrity | null>(() => celebrities[1] || null); // e.g. Cristiano Ronaldo

  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Search filtered lists
  const filteredList1 = celebrities
    .filter((c) => {
      const matchLetter = selectedLetter === 'ALL' || c.name.toUpperCase().startsWith(selectedLetter);
      const matchQuery = !query1.trim() || c.name.toLowerCase().includes(query1.toLowerCase());
      return matchLetter && matchQuery;
    })
    .slice(0, 10);

  const filteredList2 = celebrities
    .filter((c) => {
      const matchLetter = selectedLetter === 'ALL' || c.name.toUpperCase().startsWith(selectedLetter);
      const matchQuery = !query2.trim() || c.name.toLowerCase().includes(query2.toLowerCase());
      return matchLetter && matchQuery;
    })
    .slice(0, 10);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-pink-600" />
            <span>Custom A-to-Z Head-to-Head Comparison</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick any two celebrities from our 17,500+ database to compare their real age, birthdays, and records
          </p>
        </div>

        {/* Action Button */}
        {star1 && star2 && star1.slug !== star2.slug && (
          <Link
            href={`/compare/${star1.slug}-vs-${star2.slug}`}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center"
          >
            Compare Now &rarr;
          </Link>
        )}
      </div>

      {/* A to Z Filter Ticker */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Filter by First Letter (A to Z):
        </span>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setSelectedLetter('ALL')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              selectedLetter === 'ALL'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {letters.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => setSelectedLetter(char)}
              className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                selectedLetter === char
                  ? 'bg-pink-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Star 1 Picker */}
        <div className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select First Star
            </span>
            {star1 && (
              <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100 truncate max-w-[150px]">
                {star1.name}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={query1}
              onChange={(e) => setQuery1(e.target.value)}
              placeholder="Search first celebrity..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-pink-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Quick Select Options */}
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {filteredList1.map((c) => {
              const isSelected = star1?.slug === c.slug;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setStar1(c)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-pink-600 text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-pink-50 text-slate-800 border border-slate-100'
                  }`}
                >
                  <span className="truncate">{c.name} ({c.primary_profession || 'Star'})</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Star 2 Picker */}
        <div className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Second Star
            </span>
            {star2 && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 truncate max-w-[150px]">
                {star2.name}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={query2}
              onChange={(e) => setQuery2(e.target.value)}
              placeholder="Search second celebrity..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Quick Select Options */}
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {filteredList2.map((c) => {
              const isSelected = star2?.slug === c.slug;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setStar2(c)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-indigo-50 text-slate-800 border border-slate-100'
                  }`}
                >
                  <span className="truncate">{c.name} ({c.primary_profession || 'Star'})</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
