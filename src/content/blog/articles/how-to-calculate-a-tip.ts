import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-calculate-a-tip',
  title: 'How to Calculate a Tip',
  description: 'Learn simple and effective methods for calculating tips at restaurants, salons, and other service establishments.',
  category: 'everyday-calculations',
  author: 'Everyday Math Team',
  published: '2026-10-10',
  status: 'published',
  relatedCalculators: ['tip-calculator'],
  tags: ['tipping', 'gratuity', 'dining'],
  body: [
    { type: 'p', text: 'Tipping is a customary practice in many service industries. Standard tipping rates generally range from 15% to 20% depending on the region and the quality of service. Calculating the right tip ensures service workers are compensated appropriately without overcomplicating your billing process at the end of a meal.' },
    { type: 'h2', text: 'The Standard Tipping Formula' },
    { type: 'p', text: 'The simplest way to calculate a tip is to multiply your total bill by the decimal equivalent of your desired tip percentage. The formula is:' },
    { type: 'formula', text: 'Tip Amount = Bill Total x (Tip Percentage / 100)' },
    { type: 'p', text: 'If your bill is $45 and you wish to leave a 20% tip, convert 20% to 0.20. Multiply 45 by 0.20 to get 9. Your tip is $9, making the total amount $54. Ensure you know whether you are calculating the tip before or after taxes, as conventions vary by location, though pre-tax calculation is widely accepted.' },
    { type: 'h2', text: 'Mental Math Tipping Strategies' },
    { type: 'p', text: 'When a calculator is not readily available, mental math strategies provide quick estimates. The most common technique is the "10% method".' },
    { type: 'h3', text: 'The 20% Tip' },
    { type: 'p', text: 'To find a 20% tip quickly, first find 10% of your bill by moving the decimal point one place to the left. For a $62.50 bill, 10% is $6.25. Double that amount to get 20%, which equals $12.50.' },
    { type: 'h3', text: 'The 15% Tip' },
    { type: 'p', text: 'To calculate a 15% tip, start by finding 10% of the bill. Using the same $62.50 example, 10% is $6.25. Next, find 5% by halving the 10% amount, giving you $3.12 (rounded). Add the 10% and 5% amounts together ($6.25 + $3.12) to get a total tip of $9.37.' },
    { type: 'h2', text: 'Splitting the Bill' },
    { type: 'p', text: 'When dining with a group, you must also divide the final amount. First, calculate the total including the tip. Then, divide by the number of people. If the total including tip is $150 and there are 4 people, dividing 150 by 4 yields $37.50 per person. You can also use our [Tip Calculator](/tip-calculator/) to simplify split bills.' }
  ]
};
