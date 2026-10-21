'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Hourglass } from 'lucide-react';

interface BirthdayCountdownWidgetProps {
  birthDate: string; // YYYY-MM-DD
  celebrityName: string;
  isDeceased?: boolean;
}

function calculateValues(birthDate: string, isDeceased: boolean) {
  const [bYear, bMonth, bDay] = birthDate.split('-').map(Number);
  const now = new Date();

  // Exact age calculation
  let years = now.getFullYear() - bYear;
  let months = now.getMonth() + 1 - bMonth;
  let days = now.getDate() - bDay;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const exactAge = { years, months, days };

  if (isDeceased) {
    return { exactAge, timeLeft: null };
  }

  // Next birthday countdown
  let nextBirthday = new Date(now.getFullYear(), bMonth - 1, bDay, 0, 0, 0);
  if (nextBirthday.getTime() < now.getTime() - 86400000) {
    nextBirthday = new Date(now.getFullYear() + 1, bMonth - 1, bDay, 0, 0, 0);
  }

  const diffMs = nextBirthday.getTime() - now.getTime();
  const isToday = now.getMonth() + 1 === bMonth && now.getDate() === bDay;

  if (isToday) {
    return {
      exactAge,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true },
    };
  }

  const totalSec = Math.max(0, Math.floor(diffMs / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return {
    exactAge,
    timeLeft: { days: d, hours: h, minutes: m, seconds: s, isToday: false },
  };
}

export function BirthdayCountdownWidget({
  birthDate,
  celebrityName,
  isDeceased = false,
}: BirthdayCountdownWidgetProps) {
  // Initialize with calculated values immediately so SSR & Initial Render displays it!
  const [data, setData] = useState(() => calculateValues(birthDate, isDeceased));

  useEffect(() => {
    const timer = setInterval(() => {
      setData(calculateValues(birthDate, isDeceased));
    }, 1000);
    return () => clearInterval(timer);
  }, [birthDate, isDeceased]);

  const { exactAge, timeLeft } = data;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-indigo-950/60 flex flex-col md:flex-row items-center justify-between gap-5 my-2">
      {/* Exact Age breakdown */}
      <div className="space-y-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-1.5 text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Hourglass className="w-3.5 h-3.5" />
          <span>Real-Time Age</span>
        </div>
        <p className="text-xl sm:text-2xl font-black text-white">
          {exactAge.years} <span className="text-xs sm:text-sm font-medium text-slate-400">Years</span>{' '}
          {exactAge.months} <span className="text-xs sm:text-sm font-medium text-slate-400">Months</span>{' '}
          {exactAge.days} <span className="text-xs sm:text-sm font-medium text-slate-400">Days</span>
        </p>
        <p className="text-[11px] text-slate-400">
          Precision calendar calculation updated live
        </p>
      </div>

      {/* Countdown to Next Birthday */}
      {!isDeceased && timeLeft && (
        <div className="flex flex-col items-center md:items-end space-y-1.5">
          <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Next Birthday Countdown</span>
          </div>

          {timeLeft.isToday ? (
            <div className="px-4 py-2 bg-pink-600 text-white font-extrabold rounded-xl animate-pulse text-sm">
              🎉 Celebrating Birthday Today!
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1 min-w-[50px]">
                <span className="block text-base sm:text-lg font-black text-white">{timeLeft.days}</span>
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Days</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1 min-w-[50px]">
                <span className="block text-base sm:text-lg font-black text-white">{timeLeft.hours}</span>
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Hours</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1 min-w-[50px]">
                <span className="block text-base sm:text-lg font-black text-white">{timeLeft.minutes}</span>
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Mins</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1 min-w-[50px]">
                <span className="block text-base sm:text-lg font-black text-pink-400">{timeLeft.seconds}</span>
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Secs</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
