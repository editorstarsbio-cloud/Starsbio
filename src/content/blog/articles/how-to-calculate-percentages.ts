import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-calculate-percentages',
  title: 'How to Calculate Percentages',
  description: 'A clear, straightforward guide on calculating percentages in everyday scenarios, from basic formulas to percent change.',
  category: 'everyday-calculations',
  author: 'Math Team',
  published: '2026-10-10',
  status: 'published',
  relatedCalculators: ['percentage-calculator'],
  tags: ['math', 'percentages', 'guide'],
  body: [
    { type: 'p', text: 'A percentage is a number or ratio expressed as a fraction of 100. It is a mathematical way of comparing quantities and understanding proportions. Whether calculating a discount at a store or determining your score on an exam, understanding percentages is an essential daily skill.' },
    { type: 'h2', text: 'The Basic Percentage Formula' },
    { type: 'p', text: 'To find a percentage, you need the part and the whole. The fundamental formula is:' },
    { type: 'formula', text: 'Percentage = (Part / Whole) x 100' },
    { type: 'p', text: 'For example, if you answered 40 questions correctly on a 50-question test, the part is 40 and the whole is 50. Divide 40 by 50 to get 0.8, then multiply by 100 to get 80%. Your score is 80%.' },
    { type: 'h2', text: 'Finding the Value from a Percentage' },
    { type: 'p', text: 'Sometimes you know the percentage and the whole, but need to find the specific part. The formula rearranges to:' },
    { type: 'formula', text: 'Part = (Percentage / 100) x Whole' },
    { type: 'p', text: 'If a $120 jacket is on sale for 25% off, you want to know the exact dollar amount of the discount. Divide 25 by 100 to get 0.25, then multiply by 120. The discount is $30.' },
    { type: 'h2', text: 'Calculating Percentage Change' },
    { type: 'p', text: 'Percentage change shows how much a value has grown or shrunk over time. This is useful for tracking price increases or population changes.' },
    { type: 'formula', text: 'Percentage Change = ((New Value - Old Value) / |Old Value|) x 100' },
    { type: 'p', text: 'If your monthly electricity bill increases from $80 to $96, first subtract 80 from 96 to find the difference ($16). Divide 16 by the old value (80) to get 0.2. Multiply by 100 to find a 20% increase.' },
    { type: 'h2', text: 'Quick Mental Math Tips' },
    { type: 'p', text: 'You can often compute percentages quickly without a calculator. To find 10% of any number, move the decimal point one place to the left (10% of 45 is 4.5). To find 1%, move the decimal point two places left (1% of 45 is 0.45). To find 5%, calculate 10% and divide by two. These mental shortcuts make everyday calculations faster and easier.' }
  ]
};
