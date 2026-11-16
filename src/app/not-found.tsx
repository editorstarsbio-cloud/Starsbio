import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Home, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | StarsBio',
  description: 'The requested celebrity biography, birthday, or profile could not be found on StarsBio.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black text-2xl">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500">
          The star profile, birthday date, or directory page you are looking for has been moved or does not exist.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/birthdays"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Birthday Calendar</span>
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search Celebrities</span>
        </Link>
      </div>
    </div>
  );
}
