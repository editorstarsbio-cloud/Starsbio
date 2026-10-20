import React from 'react';
import Link from 'next/link';

interface FormattedTextProps {
  content: string;
  className?: string;
}

export function FormattedText({ content, className = '' }: FormattedTextProps) {
  // Split content by paragraphs (\n\n)
  const paragraphs = content.split('\n\n');

  // Helper to parse bold (**text**), italics (*text*), markdown links [label](url), and lists (* bullet)
  const renderFormattedParagraph = (para: string, pIdx: number) => {
    const trimmed = para.trim();

    // Check if it's a bulleted list block
    if (trimmed.startsWith('* ') || trimmed.includes('\n* ')) {
      const items = trimmed
        .split('\n')
        .filter((line) => line.trim().startsWith('* '))
        .map((line) => line.trim().replace(/^\*\s+/, ''));

      return (
        <ul key={pIdx} className="space-y-2 my-3 list-disc list-inside pl-2">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="text-slate-700 leading-relaxed">
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Numbered list block (1. item)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .filter((line) => /^\d+\.\s+/.test(line.trim()))
        .map((line) => line.trim().replace(/^\d+\.\s+/, ''));

      return (
        <ol key={pIdx} className="space-y-2 my-3 list-decimal list-inside pl-2">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="text-slate-700 leading-relaxed">
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ol>
      );
    }

    return (
      <p key={pIdx} className="leading-relaxed">
        {parseInlineFormatting(para)}
      </p>
    );
  };

  const parseInlineFormatting = (text: string) => {
    // Regex matches markdown links: [label](url), bold: **bold**, italics: *italics*
    const tokenRegex = /(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, idx) => {
      // Check for Markdown Link [label](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith('/');
        if (isInternal) {
          return (
            <Link
              key={idx}
              href={href}
              className="text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-2 transition-colors decoration-pink-300 hover:decoration-pink-500"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-2 transition-colors"
          >
            {label}
          </a>
        );
      }

      // Check for Bold (**text**)
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Check for Italics (*text*)
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={idx} className="italic text-slate-800">
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((p, idx) => renderFormattedParagraph(p, idx))}
    </div>
  );
}
