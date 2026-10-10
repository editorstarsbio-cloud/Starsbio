import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, money } from '../lib/calc/helpers';

export const financeCalculators: CalculatorDef[] = [
  {
    id: 'compound_interest',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    category: 'finance',
    short: 'Calculate future value of investments with compound interest.',
    inputs: [
      { key: 'principal', label: 'Initial Investment', type: 'number', default: 1000, unit: '$' },
      { key: 'rate', label: 'Annual Interest Rate', type: 'number', default: 5, unit: '%' },
      { key: 'years', label: 'Years to Grow', type: 'number', default: 10 },
      { key: 'contribution', label: 'Monthly Contribution', type: 'number', default: 100, unit: '$', optional: true }
    ],
    compute: (raw) => {
      const p = num(raw.principal);
      const r = num(raw.rate) / 100;
      const t = num(raw.years);
      const c = Number(raw.contribution) || 0;
      
      assert(p >= 0, 'Principal cannot be negative');
      assert(t >= 0, 'Years cannot be negative');
      
      const months = t * 12;
      const monthlyRate = r / 12;
      
      let balance = p;
      let totalContribs = p;
      
      for (let i = 0; i < months; i++) {
        balance += c;
        totalContribs += c;
        balance *= (1 + monthlyRate);
      }
      
      const interest = balance - totalContribs;
      
      return {
        results: [
          { label: 'Total Balance', value: round(balance, 2), money: true, primary: true },
          { label: 'Total Principal & Contributions', value: round(totalContribs, 2), money: true },
          { label: 'Total Interest Earned', value: round(interest, 2), money: true }
        ]
      };
    },
    formula: 'A = P(1 + r/n)^(nt) + PMT × {[(1 + r/n)^(nt) - 1] / (r/n)}',
    intro: ['Find out how your money can grow over time with the power of compound interest.'],
    status: 'published',
    tests: [
      { name: 'Basic', inputs: { principal: 1000, rate: 5, years: 10, contribution: 0 }, expect: { 'Total Balance': 1647.01 } },
      { name: 'Zero years', inputs: { principal: 1000, rate: 5, years: 0, contribution: 0 }, expect: { 'Total Balance': 1000 } }
    ]
  }
];
