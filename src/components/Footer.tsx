'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/utils';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">{SITE_CONFIG.brandName}</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              An independent, editorial discovery platform for verified celebrity birthdays, dynamic age calculations, zodiac profiles, and biographies.
            </p>
          </div>

          {/* Quick Discovery */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Discovery</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/birthdays" className="hover:text-white transition-colors">
                  Birthday Calendar
                </Link>
              </li>
              <li>
                <Link href="/category" className="hover:text-white transition-colors">
                  Browse Professions
                </Link>
              </li>
              <li>
                <Link href="/zodiac" className="hover:text-white transition-colors">
                  Zodiac Signs
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Celebrity Search
                </Link>
              </li>
              <li>
                <Link href="/in-memoriam" className="hover:text-rose-400 transition-colors">
                  In Memoriam
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Standards */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Editorial Standards</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/editorial-policy" className="hover:text-white transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/corrections-policy" className="hover:text-white transition-colors">
                  Corrections Policy
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="hover:text-white transition-colors">
                  Data Sources & Rights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Legal & Terms</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Editorial Team
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built for accuracy & discovery</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
