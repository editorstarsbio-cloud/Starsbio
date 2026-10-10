'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, X } from 'lucide-react';
import type { CalculatorDef } from '@/lib/calc/types';

// We fetch the basic directory info to index client-side
export default function Search({ items }: { items: { slug: string, name: string, short: string, category: string, aliases?: string[], tags?: string[] }[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    
    return items
      .map(item => {
        let score = 0;
        
        // Exact name match gets highest score
        if (item.name.toLowerCase() === lowerQuery) score += 100;
        else if (item.name.toLowerCase().includes(lowerQuery)) score += 50;
        
        // Slug match
        if (item.slug.includes(lowerQuery.replace(/\s+/g, '-'))) score += 40;
        
        // Aliases match
        if (item.aliases?.some(a => a.toLowerCase() === lowerQuery)) score += 30;
        else if (item.aliases?.some(a => a.toLowerCase().includes(lowerQuery))) score += 20;
        
        // Tags
        if (item.tags?.some(t => t.toLowerCase() === lowerQuery)) score += 15;
        
        // Category
        if (item.category.toLowerCase().includes(lowerQuery)) score += 10;
        
        // Description
        if (item.short.toLowerCase().includes(lowerQuery)) score += 5;
        
        return { item, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Top 8 results
  }, [query, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-2xl mx-auto relative w-full z-20">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search calculators (e.g., 'compound interest' or 'BMI')..."
          className="w-full px-6 py-4 rounded-full border border-slate-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-14"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query ? (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2">
          <SearchIcon className="h-6 w-6 text-primary" />
        </div>
      </div>

      {isOpen && query && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          {results.length > 0 ? (
            <ul className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {results.map(({ item }) => (
                <li key={item.slug}>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/${item.slug}/`);
                    }}
                    className="w-full text-left px-6 py-4 hover:bg-slate-50 flex flex-col focus:outline-none focus:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-sm text-slate-500 truncate">{item.short}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-slate-500">
              No calculators found matching "{query}". Try a different term.
            </div>
          )}
        </div>
      )}
      
      {/* Backdrop for closing when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
