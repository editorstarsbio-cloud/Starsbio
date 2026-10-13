import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories } from '@/lib/repository';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Bookmark, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Browse Celebrities by Category",
  description: 'Browse celebrities by their primary category, occupation, and artistic field.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/category`,
  },
};

export default async function CategoryIndexPage() {
  const categories = await getAllCategories();
  const breadcrumbs = [{ label: 'Categories' }];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Category Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Browse Celebrities by Profession
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          From screen actors and pop vocalists to pioneering scientists and creators, explore verified biographies across every profession.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {cat.description || `Explore famous ${cat.name} profiles, biographies, and birthday records.`}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>View Directory</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
