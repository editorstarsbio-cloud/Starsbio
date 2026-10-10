import type { Article } from '../types';

export const article: Article = {
  slug: 'how-mortgage-payments-are-calculated',
  title: 'How Mortgage Payments Are Calculated',
  description: 'Understand the math behind mortgage payments, including principal, interest, taxes, and insurance (PITI).',
  category: 'real-estate',
  author: 'Real Estate Team',
  published: '2026-10-10',
  status: 'published',
  relatedCalculators: ['mortgage-calculator'],
  tags: ['mortgage', 'housing', 'real-estate', 'interest'],
  body: [
    { type: 'p', text: 'A mortgage payment is not simply the loan amount divided by the number of months. It incorporates several distinct components that determine your total monthly cost. The standard mortgage calculation encompasses Principal, Interest, Taxes, and Insurance—collectively known as PITI. Understanding how each element is calculated provides clarity when evaluating housing affordability.' },
    { type: 'h2', text: 'Principal and Interest Calculation' },
    { type: 'p', text: 'The bulk of a mortgage payment consists of the principal (the actual loan balance) and the interest (the cost of borrowing the money). Most standard mortgages are amortized, meaning the monthly payment remains constant, but the proportion of principal and interest shifts over time.' },
    { type: 'p', text: 'The mathematical formula used to calculate the fixed monthly principal and interest payment is:' },
    { type: 'formula', text: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]' },
    { type: 'p', text: 'In this formula, M represents the monthly payment, P is the principal loan amount, i is the monthly interest rate (annual rate divided by 12), and n is the total number of payments (months). Early in the loan term, most of the payment goes toward interest. In the later years, the majority reduces the principal balance.' },
    { type: 'h2', text: 'Property Taxes' },
    { type: 'p', text: 'Local governments assess property taxes based on the assessed value of the home. Lenders typically divide your annual property tax bill by 12 and add it to your monthly mortgage payment. They hold this money in an escrow account and pay the tax authority on your behalf when the bill is due. Property taxes can fluctuate, which may cause your total monthly payment to change over time.' },
    { type: 'h2', text: 'Insurance Requirements' },
    { type: 'p', text: 'Homeowners insurance is required by lenders to protect the property against damage. Similar to taxes, the annual premium is divided by 12 and collected in escrow.' },
    { type: 'p', text: 'Additionally, if your down payment is less than 20% on a conventional loan, lenders usually require Private Mortgage Insurance (PMI). PMI protects the lender in case of default. This is an additional monthly cost until you build sufficient equity in the home. Use our [Mortgage Calculator](/mortgage-calculator/) to estimate your complete monthly obligations.' }
  ]
};
