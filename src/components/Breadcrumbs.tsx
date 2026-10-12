import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.siteUrl,
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.label,
        item: item.href ? `${SITE_CONFIG.siteUrl}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 py-3">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-indigo-600 transition-colors truncate max-w-[200px]">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-800 font-medium truncate max-w-[250px]" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
