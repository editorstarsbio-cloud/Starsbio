import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCelebrityTriviaList } from '@/lib/repository';
import { CelebrityAvatar } from '@/components/CelebrityAvatar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { HelpCircle, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Celebrity Trivia & Fun Facts - Surprising Celebrity Biographies',
  description:
    'Discover surprising celebrity trivia, crazy facts, before-fame secrets, and milestone stories of famous actors, pop stars, athletes, and internet creators on StarsBio.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/trivia`,
  },
};

export default async function TriviaPage() {
  const triviaList = await getCelebrityTriviaList(60);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Celebrity Trivia' },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60 uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fascinating Secrets & Milestones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrity Trivia & Surprising Facts
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Dive into extraordinary facts, hidden talents, early beginnings, and life milestones from the world&apos;s most celebrated personalities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {triviaList.map(({ celebrity, triviaSnippet }) => (
          <div
            key={celebrity.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start space-x-4">
              <Link href={`/people/${celebrity.slug}`} className="shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                  <CelebrityAvatar
                    name={celebrity.name}
                    profession={celebrity.primary_profession}
                    imageUrl={celebrity.image_url}
                    size="md"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/people/${celebrity.slug}`}
                  className="font-bold text-slate-900 hover:text-purple-600 transition-colors text-base block truncate"
                >
                  {celebrity.name}
                </Link>
                <span className="text-xs text-purple-600 font-semibold uppercase tracking-wider block">
                  {celebrity.primary_profession || 'Star'}
                </span>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  💡 {triviaSnippet}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Verified Fact-Checked Fact
              </span>
              <Link
                href={`/people/${celebrity.slug}`}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center space-x-1"
              >
                <span>Full Biography</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
