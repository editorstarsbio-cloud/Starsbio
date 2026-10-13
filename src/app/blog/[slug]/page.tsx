import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blogRepository';
import { getCelebrityBySlug } from '@/lib/repository';
import { SITE_CONFIG } from '@/lib/utils';
import { FormattedText } from '@/components/FormattedText';
import { Calendar, Clock, User, ArrowLeft, ExternalLink, Sparkles, Award, DollarSign, Heart, Users, MapPin, Briefcase } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: false },
    };
  }

  // Strict SEO Constraint: Title 55-58 characters, Meta Description <= 140 characters
  const rawTitle = post.seoTitle || post.title;
  const title = rawTitle.length > 58 ? rawTitle.slice(0, 58).trim() : rawTitle;

  const rawDesc = post.metaDescription || post.summary;
  const description = rawDesc.length > 140 ? rawDesc.slice(0, 137).trim() + '...' : rawDesc;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const celebrity = await getCelebrityBySlug(post.celebritySlug);

  // Schema.org BlogPosting Structured Data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <article className="max-w-4xl mx-auto space-y-10 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200/60 font-bold">
            Celebrity Spotlight
          </span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-pink-500" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center space-x-3 pt-2 border-t border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{post.author.name}</p>
            <p className="text-[11px] text-slate-500">{post.author.role} • Fact-Checked Editorial</p>
          </div>
        </div>
      </header>

      {/* Featured Cover Image - Ultra Crisp High-Res Display */}
      <div className="relative w-full max-h-[520px] aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          className="w-full h-full object-cover object-[center_20%] filter contrast-[1.02]"
          fetchPriority="high"
        />
      </div>

      {/* Quick Facts Card (FamousBirthdays Style) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Quick Biographical Dossier: {post.celebrityName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Born</span>
            <span className="font-bold text-white text-sm">{post.quickFacts.born} (Age {post.quickFacts.age})</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Birthplace</span>
            <span className="font-bold text-white text-sm">{post.quickFacts.birthplace}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Estimated Net Worth</span>
            <span className="font-bold text-emerald-400 text-sm">{post.quickFacts.netWorth}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Spouse</span>
            <span className="font-bold text-white text-sm">{post.quickFacts.spouse}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block font-medium">Children</span>
            <span className="font-bold text-white text-sm">{post.quickFacts.children}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block font-medium">Key Works</span>
            <span className="font-bold text-white text-sm">{post.quickFacts.famousFor}</span>
          </div>
        </div>

        {/* Official Profile Link Banner */}
        {celebrity && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-300">
              Explore full timeline, zodiac, and facts for {celebrity.name}:
            </span>
            <Link
              href={`/people/${celebrity.slug}`}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center space-x-1"
            >
              <span>View Verified Profile</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        )}
      </div>

      {/* Article Body Sections */}
      <div className="space-y-8 text-slate-800">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-2">
              {section.title}
            </h2>
            <FormattedText
              content={section.content}
              className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal"
            />
          </section>
        ))}
      </div>

      {/* Two-Way Link: Bottom Profile Card */}
      {celebrity && (
        <div className="bg-pink-50/60 rounded-3xl border border-pink-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-pink-300 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={celebrity.image_url || post.coverImage} alt={celebrity.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{celebrity.name} Official Profile</h3>
              <p className="text-xs text-slate-600">
                Born {celebrity.birth_date} • {celebrity.primary_profession || 'Star'} • {celebrity.zodiac_sign}
              </p>
            </div>
          </div>

          <Link
            href={`/people/${celebrity.slug}`}
            className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            Visit {celebrity.name}&apos;s Profile &rarr;
          </Link>
        </div>
      )}
    </article>
  );
}
