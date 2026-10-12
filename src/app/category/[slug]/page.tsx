import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCelebritiesByCategory } from '@/lib/repository';
import { CelebrityCard } from '@/components/CelebrityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCelebritiesByCategory(slug);

  if (!category) {
    return { title: 'Category Not Found', robots: { index: false } };
  }

  const title = `${category.name} Celebrities & Biographies | ${SITE_CONFIG.brandName}`;
  const description = `Explore famous ${category.name} personalities, actors, creators, and public figures. Discover birthdays, career milestones, and ages.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/category/${category.slug}`,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, celebrities } = await getCelebritiesByCategory(slug, 100);

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Categories', href: '/category' },
    { label: category.name },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Category Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Famous {category.name} Personalities
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          {category.description || `Verified profiles of renowned individuals whose primary profession is ${category.name}.`}
        </p>
      </div>

      {celebrities.length > 0 ? (
        <section className="space-y-4">
          <div className="text-xs text-slate-500 px-1">
            <span>Showing {celebrities.length} published profiles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {celebrities.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          <p>No verified {category.name} profiles published yet.</p>
        </div>
      )}
    </div>
  );
}
