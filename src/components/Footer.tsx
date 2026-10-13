'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, ZODIAC_SIGNS } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const topProfessions = [
    { name: 'Pop Singers', slug: 'pop-singer' },
    { name: 'Movie Actors', slug: 'movie-actor' },
    { name: 'TV Actresses', slug: 'tv-actress' },
    { name: 'Rappers', slug: 'rapper' },
    { name: 'TikTok Stars', slug: 'tiktok-star' },
    { name: 'YouTube Stars', slug: 'youtube-star' },
    { name: 'Soccer Players', slug: 'soccer-player' },
    { name: 'Basketball Players', slug: 'basketball-player' },
  ];

  const zodiacList = Object.keys(ZODIAC_SIGNS).map((z) => ({
    name: z,
    slug: z.toLowerCase(),
  }));

  const months = [
    { name: 'January', m: 1 },
    { name: 'February', m: 2 },
    { name: 'March', m: 3 },
    { name: 'April', m: 4 },
    { name: 'May', m: 5 },
    { name: 'June', m: 6 },
    { name: 'July', m: 7 },
    { name: 'August', m: 8 },
    { name: 'September', m: 9 },
    { name: 'October', m: 10 },
    { name: 'November', m: 11 },
    { name: 'December', m: 12 },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main 4 Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group hover:opacity-95 transition-opacity">
              <Logo size="md" />
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
                  Birthday Calendar (365 Days)
                </Link>
              </li>
              <li>
                <Link href="/category" className="hover:text-white transition-colors">
                  Browse All 192 Professions
                </Link>
              </li>
              <li>
                <Link href="/zodiac" className="hover:text-white transition-colors">
                  Zodiac Astrology Signs
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Celebrity Search Directory
                </Link>
              </li>
              <li>
                <Link href="/in-memoriam" className="hover:text-rose-400 transition-colors">
                  In Memoriam Tribute
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

        {/* SEO Deep Crawl Hub: Top Professions */}
        <div className="pt-6 border-t border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Popular Professions Directory
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {topProfessions.map((p) => (
              <Link
                key={p.slug}
                href={`/category/${p.slug}`}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/category"
              className="px-2.5 py-1 rounded-md bg-pink-900/40 text-pink-300 hover:bg-pink-900/60 transition-colors font-semibold"
            >
              + All 192 Categories &rarr;
            </Link>
          </div>
        </div>

        {/* SEO Deep Crawl Hub: Zodiac Astrological Signs */}
        <div className="pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Birthdays by Zodiac Sign
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {zodiacList.map((z) => (
              <Link
                key={z.slug}
                href={`/zodiac/${z.slug}`}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {z.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Deep Crawl Hub: 12 Birthday Calendar Months */}
        <div className="pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Browse Birthdays by Month
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {months.map((m) => (
              <Link
                key={m.m}
                href={`/birthdays/${m.m}/1`}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {m.name} Birthdays
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
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
