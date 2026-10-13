import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogRepository';
import { SITE_CONFIG } from '@/lib/utils';
import { BookOpen, Calendar, Clock, ChevronRight, User, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: `Celebrity Biographies, Net Worth & Life Stories | ${SITE_CONFIG.brandName} Editorial Blog`,
  description:
    'In-depth celebrity life stories, career histories, net worth breakdowns, spouses, children, and lesser-known trivia written by the StarsBio editorial team.',
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-600 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Editorial Biographies & Features</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Celebrity In-Depth Stories & Life Chronicles
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Explore comprehensive, fact-checked deep dives into the lives, relationships, families, net worths, and untold stories of the world&apos;s most iconic stars.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                  {post.celebrityName}
                </div>
              </Link>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    <span>{post.publishedAt}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-pink-600 group-hover:text-pink-700 inline-flex items-center space-x-0.5"
              >
                <span>Read Full Story</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
