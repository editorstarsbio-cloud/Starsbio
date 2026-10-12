'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Sparkles, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1;
  const currentDay = now.getUTCDate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {SITE_CONFIG.brandName}
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search celebrities, actors, singers, creators..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-indigo-500 rounded-full outline-none transition-all"
              aria-label="Search celebrity database"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <Link
              href={`/birthdays/${currentMonth}/${currentDay}`}
              className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors"
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Born Today</span>
            </Link>
            <Link href="/birthdays" className="hover:text-indigo-600 transition-colors">
              Calendar
            </Link>
            <Link href="/category" className="hover:text-indigo-600 transition-colors">
              Categories
            </Link>
            <Link href="/zodiac" className="hover:text-indigo-600 transition-colors">
              Zodiac Signs
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search celebrities..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-full outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </form>
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <Link
                href={`/birthdays/${currentMonth}/${currentDay}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Born Today</span>
              </Link>
              <Link
                href="/birthdays"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Birthday Calendar
              </Link>
              <Link
                href="/category"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Browse Categories
              </Link>
              <Link
                href="/zodiac"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Zodiac Directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
