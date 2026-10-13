import React from 'react';
import Link from 'next/link';

interface BioSection {
  title: string;
  content: string;
}

export function parseBiographySections(bio: string, celebrityName: string): BioSection[] {
  if (!bio) return [];

  // 1. Check if the text explicitly contains subheaders like "Before Fame", "Trivia", etc.
  const headerRegex = /(Before Fame|Family Life|Associated With|Trivia):/i;
  if (headerRegex.test(bio)) {
    const rawParts = bio.split(/(Before Fame|Family Life|Associated With|Trivia):/i);
    const sections: BioSection[] = [];
    if (rawParts[0]?.trim()) {
      sections.push({ title: 'About', content: rawParts[0].trim() });
    }
    for (let i = 1; i < rawParts.length; i += 2) {
      const title = rawParts[i]?.trim();
      const content = rawParts[i + 1]?.trim();
      if (title && content) {
        sections.push({ title, content });
      }
    }
    return sections;
  }

  // 2. Otherwise split sentences into natural editorial sections
  // Split roughly into sentences
  const sentences = bio.match(/[^.!?]+[.!?]+(\s+|$)/g) || [bio];
  if (sentences.length <= 1) {
    return [{ title: 'About', content: bio }];
  }

  const sections: BioSection[] = [];
  sections.push({ title: 'About', content: sentences.slice(0, 2).join('').trim() });

  if (sentences.length > 2) {
    sections.push({ title: 'Before Fame & Career', content: sentences.slice(2, 4).join('').trim() });
  }

  if (sentences.length > 4) {
    sections.push({ title: 'Trivia & Life Highlights', content: sentences.slice(4).join('').trim() });
  }

  return sections;
}

interface BiographyViewerProps {
  bio: string;
  celebrityName: string;
}

export function BiographyViewer({ bio, celebrityName }: BiographyViewerProps) {
  const sections = parseBiographySections(bio, celebrityName);

  return (
    <div className="space-y-6 pt-2">
      {sections.map((sec, idx) => (
        <div key={idx} className="space-y-1.5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>{sec.title}</span>
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
            {sec.content}
          </p>
        </div>
      ))}
    </div>
  );
}
