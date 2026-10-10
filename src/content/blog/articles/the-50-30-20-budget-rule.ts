import type { Article } from '../types';

export const article: Article = {
  slug: 'the-50-30-20-budget-rule',
  title: 'The 50/30/20 Budget Rule',
  description: 'A practical breakdown of the 50/30/20 budgeting rule, explaining how to allocate income across needs, wants, and savings.',
  category: 'finance-guides',
  author: 'Finance Team',
  published: '2026-10-10',
  status: 'published',
  relatedCalculators: ['budget-calculator'],
  tags: ['budgeting', 'personal-finance', 'savings'],
  body: [
    { type: 'p', text: 'The 50/30/20 rule is a popular and straightforward budgeting strategy designed to help individuals manage their finances without complex tracking. Popularized by Senator Elizabeth Warren, it divides after-tax income into three distinct categories: needs, wants, and savings or debt repayment. This structure ensures financial stability while still allowing room for discretionary spending.' },
    { type: 'h2', text: '50% for Needs' },
    { type: 'p', text: 'Half of your after-tax income should cover your absolute necessities. These are expenses you must pay regardless of your situation. They form the foundation of your financial survival and obligations.' },
    { type: 'ul', items: [
      'Housing costs (rent or mortgage payments)',
      'Utility bills (electricity, water, heating)',
      'Basic groceries and essential food items',
      'Transportation (car payments, gas, public transit)',
      'Minimum required debt payments',
      'Insurance premiums (health, auto, home)'
    ] },
    { type: 'p', text: 'If your needs exceed 50% of your income, you may have to downsize your lifestyle or temporarily reduce your discretionary spending to maintain balance.' },
    { type: 'h2', text: '30% for Wants' },
    { type: 'p', text: 'Thirty percent of your income is allocated to discretionary spending. These are non-essential items and experiences that enhance your quality of life but are not strictly required for survival.' },
    { type: 'ul', items: [
      'Dining out and entertainment',
      'Hobbies, subscriptions, and memberships',
      'Vacations and travel',
      'Non-essential clothing and personal items'
    ] },
    { type: 'p', text: 'Maintaining a defined limit on wants prevents lifestyle creep and ensures you do not sacrifice your financial future for immediate gratification.' },
    { type: 'h2', text: '20% for Savings and Debt Reduction' },
    { type: 'p', text: 'The final 20% of your income is dedicated to financial growth and long-term security. This category focuses on building wealth and eliminating high-interest liabilities.' },
    { type: 'ul', items: [
      'Emergency fund contributions',
      'Retirement accounts (401k, IRA)',
      'Investments and brokerage accounts',
      'Extra payments on high-interest debt (credit cards, personal loans)'
    ] },
    { type: 'p', text: 'Consistently applying 20% of your income to these areas accelerates wealth accumulation and provides a buffer against unexpected financial shocks. For detailed planning, try our [Budget Calculator](/budget-calculator/).' }
  ]
};
