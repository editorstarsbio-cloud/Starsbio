import type { Article } from '../types';

export const article: Article = {
  slug: 'compound-interest-explained',
  title: 'Compound Interest Explained',
  description: 'Learn how compound interest works and why it is often called the eighth wonder of the world.',
  category: 'finance-guides',
  author: 'Financial Team',
  published: '2025-01-10T00:00:00Z',
  status: 'published',
  featured: true,
  relatedCalculators: ['compound-interest-calculator'],
  tags: ['finance', 'investing', 'interest'],
  body: [
    { type: 'p', text: 'Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods.' },
    { type: 'h2', text: 'How it works' },
    { type: 'p', text: 'Unlike simple interest, which only pays interest on the principal, compound interest pays you interest on your interest. Over long periods of time, this creates exponential growth.' },
    { type: 'formula', text: 'A = P(1 + r/n)^(nt)' },
    { type: 'p', text: 'Try it out using our [Compound Interest Calculator](/compound-interest-calculator/).' }
  ]
};
