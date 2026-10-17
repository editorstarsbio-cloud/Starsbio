'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Search, Sparkles, Users, ArrowRight } from 'lucide-react';
import { getMonthName } from '@/lib/utils';

interface CelebritySummary {
  id: string;
  name: string;
  slug: string;
  birth_date: string;
  primary_profession: string | null;
  image_url: string | null;
  zodiac_sign?: string | null;
}

interface BirthdayTwinFinderProps {
  initialCelebrities?: CelebritySummary[];
}

export function BirthdayTwinFinder({ initialCelebrities = [] }: BirthdayTwinFinderProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getUTCMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getUTCDate());
  const [twins, setTwins] = useState<CelebritySummary[]>(initialCelebrities);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const months = [
    { num: 1, name: 'January', days: 31 },
    { num: 2, name: 'February', days: 29 },
    { num: 3, name: 'March', days: 31 },
    { num: 4, name: 'April', days: 30 },
    { num: 5, name: 'May', days: 31 },
    { num: 6, name: 'June', days: 30 },
    { num: 7, name: 'July', days: 31 },
    { num: 8, name: 'August', days: 31 },
    { num: 9, name: 'September', days: 30 },
    { num: 10, name: 'October', days: 31 },
    { num: 11, name: 'November', days: 30 },
    { num: 12, name: 'December', days: 31 },
  ];

  const maxDays = months.find((m) => m.num === selectedMonth)?.days || 31;

  const handleFindTwins = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      // In Next.js client component, we can fetch via birthday page or internal quick API
      const res = await fetch(`/birthdays/${selectedMonth}/${selectedDay}`);
      if (res.ok) {
        // Redirect or let user explore the full date directly
        window.location.href = `/birthdays/${selectedMonth}/${selectedDay}`;
        return;
      }
    } catch {
      window.location.href = `/birthdays/${selectedMonth}/${selectedDay}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-pink-950 p-6 sm:p-10 text-white shadow-xl border border-indigo-900/40">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive Discovery Tool</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Find Your Celebrity Birthday Twin 🎂
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Select your birth date below to see which world-famous actors, music icons, viral creators, and sports superstars share your exact calendar birthday!
        </p>

        {/* Input Form */}
        <form onSubmit={handleFindTwins} className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 grid grid-cols-2 gap-2">
            {/* Month Select */}
            <div className="relative">
              <select
                aria-label="Select Birth Month"
                value={selectedMonth}
                onChange={(e) => {
                  const m = parseInt(e.target.value, 10);
                  setSelectedMonth(m);
                  if (selectedDay > (months[m - 1]?.days || 31)) {
                    setSelectedDay(months[m - 1]?.days || 31);
                  }
                }}
                className="w-full bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
              >
                {months.map((m) => (
                  <option key={m.num} value={m.num} className="bg-slate-900 text-white">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Select */}
            <div className="relative">
              <select
                aria-label="Select Birth Day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
                className="w-full bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
              >
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-white">
                    Day {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-sm font-black shadow-lg shadow-pink-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>{loading ? 'Finding Twins...' : 'Find My Twins'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Link Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">Popular dates:</span>
          {[
            { m: 12, d: 13, name: 'Taylor Swift (Dec 13)' },
            { m: 2, d: 5, name: 'Cristiano Ronaldo (Feb 5)' },
            { m: 11, d: 2, name: 'Shah Rukh Khan (Nov 2)' },
            { m: 9, d: 1, name: 'Zendaya (Sep 1)' },
          ].map((item) => (
            <Link
              key={item.name}
              href={`/birthdays/${item.m}/${item.d}`}
              className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-pink-500/20 hover:text-pink-300 border border-slate-700 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
