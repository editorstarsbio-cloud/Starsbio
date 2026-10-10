import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, money, loanPayment } from '../lib/calc/helpers';

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
    tests: [{ name: 'Basic', inputs: { principal: 1000, rate: 5, years: 10, contribution: 0 }, expect: { 'Total Balance': 1647.01 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 10, contribution: 0 }, expect: { 'Total Balance': 1647.01 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 10, contribution: 0 }, expect: { 'Total Balance': 1647.01 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 10, contribution: 0 }, expect: { 'Total Balance': 1647.01 } }]
  },
  {
    id: 'simple_interest',
    name: 'Simple Interest Calculator',
    slug: 'simple-interest-calculator',
    category: 'finance',
    short: 'Calculate interest without compounding.',
    inputs: [
      { key: 'principal', label: 'Principal', type: 'number', default: 1000, unit: '$' },
      { key: 'rate', label: 'Annual Rate', type: 'number', default: 5, unit: '%' },
      { key: 'years', label: 'Years', type: 'number', default: 5 },
    ],
    compute: (raw) => {
      const p = num(raw.principal);
      const r = num(raw.rate) / 100;
      const t = num(raw.years);
      const interest = p * r * t;
      return {
        results: [
          { label: 'Total Interest', value: round(interest, 2), money: true },
          { label: 'Total Value', value: round(p + interest, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'I = P * r * t',
    intro: ['Calculate simple interest for a loan or investment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { principal: 1000, rate: 5, years: 5 }, expect: { 'Total Value': 1250 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 5 }, expect: { 'Total Value': 1250 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 5 }, expect: { 'Total Value': 1250 } }, { name: 'Basic 2', inputs: { principal: 1000, rate: 5, years: 5 }, expect: { 'Total Value': 1250 } }]
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    slug: 'loan-calculator',
    category: 'finance',
    short: 'Estimate monthly loan payments.',
    inputs: [
      { key: 'principal', label: 'Loan Amount', type: 'number', default: 10000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 5, unit: '%' },
      { key: 'term', label: 'Loan Term (Years)', type: 'number', default: 5 },
    ],
    compute: (raw) => {
      const p = num(raw.principal);
      const rate = num(raw.rate);
      const months = num(raw.term) * 12;
      const pmt = loanPayment(p, rate, months);
      const total = pmt * months;
      return {
        results: [
          { label: 'Monthly Payment', value: round(pmt, 2), money: true, primary: true },
          { label: 'Total Interest', value: round(total - p, 2), money: true },
          { label: 'Total Paid', value: round(total, 2), money: true }
        ]
      };
    },
    formula: 'M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1]',
    intro: ['Calculate your monthly payment for any loan.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { principal: 10000, rate: 5, term: 5 }, expect: { 'Monthly Payment': 188.71 } }, { name: 'Basic 2', inputs: { principal: 10000, rate: 5, term: 5 }, expect: { 'Monthly Payment': 188.71 } }, { name: 'Basic 2', inputs: { principal: 10000, rate: 5, term: 5 }, expect: { 'Monthly Payment': 188.71 } }, { name: 'Basic 2', inputs: { principal: 10000, rate: 5, term: 5 }, expect: { 'Monthly Payment': 188.71 } }]
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    category: 'finance',
    short: 'Calculate home mortgage payments.',
    inputs: [
      { key: 'price', label: 'Home Price', type: 'number', default: 300000, unit: '$' },
      { key: 'down_payment', label: 'Down Payment', type: 'number', default: 60000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 6, unit: '%' },
      { key: 'term', label: 'Loan Term (Years)', type: 'number', default: 30 },
    ],
    compute: (raw) => {
      const p = num(raw.price);
      const dp = num(raw.down_payment);
      const rate = num(raw.rate);
      const months = num(raw.term) * 12;
      const principal = p - dp;
      const pmt = loanPayment(principal, rate, months);
      return {
        results: [
          { label: 'Monthly Payment (P&I)', value: round(pmt, 2), money: true, primary: true },
          { label: 'Loan Amount', value: round(principal, 2), money: true }
        ]
      };
    },
    formula: 'M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1]',
    intro: ['Estimate your monthly mortgage payments.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { price: 300000, down_payment: 60000, rate: 6, term: 30 }, expect: { 'Monthly Payment (P&I)': 1438.92 } }, { name: 'Basic 2', inputs: { price: 300000, down_payment: 60000, rate: 6, term: 30 }, expect: { 'Monthly Payment (P&I)': 1438.92 } }, { name: 'Basic 2', inputs: { price: 300000, down_payment: 60000, rate: 6, term: 30 }, expect: { 'Monthly Payment (P&I)': 1438.92 } }, { name: 'Basic 2', inputs: { price: 300000, down_payment: 60000, rate: 6, term: 30 }, expect: { 'Monthly Payment (P&I)': 1438.92 } }]
  },
  {
    id: 'amortization',
    name: 'Amortization Calculator',
    slug: 'amortization-calculator',
    category: 'finance',
    short: 'See the breakdown of your loan payoff.',
    inputs: [
      { key: 'principal', label: 'Loan Amount', type: 'number', default: 200000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 5, unit: '%' },
      { key: 'term', label: 'Loan Term (Years)', type: 'number', default: 15 },
    ],
    compute: (raw) => {
      const p = num(raw.principal);
      const rate = num(raw.rate);
      const months = num(raw.term) * 12;
      const pmt = loanPayment(p, rate, months);
      return {
        results: [
          { label: 'Monthly Payment', value: round(pmt, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'Amortization schedules show each payment.',
    intro: ['Determine how much goes to principal vs interest.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { principal: 200000, rate: 5, term: 15 }, expect: { 'Monthly Payment': 1581.59 } }, { name: 'Basic 2', inputs: { principal: 200000, rate: 5, term: 15 }, expect: { 'Monthly Payment': 1581.59 } }, { name: 'Basic 2', inputs: { principal: 200000, rate: 5, term: 15 }, expect: { 'Monthly Payment': 1581.59 } }, { name: 'Basic 2', inputs: { principal: 200000, rate: 5, term: 15 }, expect: { 'Monthly Payment': 1581.59 } }]
  },
  {
    id: 'savings',
    name: 'Savings Calculator',
    slug: 'savings-calculator',
    category: 'finance',
    short: 'Plan your savings goals.',
    inputs: [
      { key: 'initial', label: 'Initial Savings', type: 'number', default: 1000, unit: '$' },
      { key: 'monthly', label: 'Monthly Deposit', type: 'number', default: 200, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 3, unit: '%' },
      { key: 'years', label: 'Years', type: 'number', default: 5 },
    ],
    compute: (raw) => {
      const initial = num(raw.initial);
      const monthly = num(raw.monthly);
      const r = num(raw.rate) / 100 / 12;
      const months = num(raw.years) * 12;
      let balance = initial;
      for (let i = 0; i < months; i++) {
        balance += monthly;
        balance *= (1 + r);
      }
      return {
        results: [
          { label: 'Total Savings', value: round(balance, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'A = P(1+r)^n + PMT[ ((1+r)^n - 1)/r ]',
    intro: ['Find out how much you can save.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { initial: 1000, monthly: 200, rate: 3, years: 5 }, expect: { 'Total Savings': 14123.28 } }, { name: 'Basic 2', inputs: { initial: 1000, monthly: 200, rate: 3, years: 5 }, expect: { 'Total Savings': 14123.28 } }, { name: 'Basic 2', inputs: { initial: 1000, monthly: 200, rate: 3, years: 5 }, expect: { 'Total Savings': 14123.28 } }, { name: 'Basic 2', inputs: { initial: 1000, monthly: 200, rate: 3, years: 5 }, expect: { 'Total Savings': 14123.28 } }]
  },
  {
    id: 'retirement',
    name: 'Retirement Calculator',
    slug: 'retirement-calculator',
    category: 'finance',
    short: 'Plan for your retirement savings.',
    inputs: [
      { key: 'current', label: 'Current Savings', type: 'number', default: 50000, unit: '$' },
      { key: 'contribution', label: 'Monthly Contribution', type: 'number', default: 500, unit: '$' },
      { key: 'years', label: 'Years until Retirement', type: 'number', default: 25 },
      { key: 'rate', label: 'Expected Return', type: 'number', default: 7, unit: '%' },
    ],
    compute: (raw) => {
      const current = num(raw.current);
      const c = num(raw.contribution);
      const years = num(raw.years);
      const r = num(raw.rate) / 100 / 12;
      let balance = current;
      for (let i = 0; i < years * 12; i++) {
        balance += c;
        balance *= (1 + r);
      }
      return {
        results: [
          { label: 'Retirement Nest Egg', value: round(balance, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'FV of current savings + FV of annuity',
    intro: ['Estimate your retirement nest egg.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { current: 50000, contribution: 500, years: 25, rate: 7 }, expect: { 'Retirement Nest Egg': 693669.47 } }, { name: 'Basic 2', inputs: { current: 50000, contribution: 500, years: 25, rate: 7 }, expect: { 'Retirement Nest Egg': 693669.47 } }, { name: 'Basic 2', inputs: { current: 50000, contribution: 500, years: 25, rate: 7 }, expect: { 'Retirement Nest Egg': 693669.47 } }, { name: 'Basic 2', inputs: { current: 50000, contribution: 500, years: 25, rate: 7 }, expect: { 'Retirement Nest Egg': 693669.47 } }]
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    slug: 'investment-calculator',
    category: 'finance',
    short: 'Project your investment growth.',
    inputs: [
      { key: 'principal', label: 'Starting Amount', type: 'number', default: 5000, unit: '$' },
      { key: 'return_rate', label: 'Rate of Return', type: 'number', default: 8, unit: '%' },
      { key: 'years', label: 'Years to Invest', type: 'number', default: 10 },
    ],
    compute: (raw) => {
      const p = num(raw.principal);
      const r = num(raw.return_rate) / 100;
      const t = num(raw.years);
      const fv = p * Math.pow(1 + r, t);
      return {
        results: [
          { label: 'Final Value', value: round(fv, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'FV = PV * (1 + r)^t',
    intro: ['Calculate potential returns on investments.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { principal: 5000, return_rate: 8, years: 10 }, expect: { 'Final Value': 10794.62 } }, { name: 'Basic 2', inputs: { principal: 5000, return_rate: 8, years: 10 }, expect: { 'Final Value': 10794.62 } }, { name: 'Basic 2', inputs: { principal: 5000, return_rate: 8, years: 10 }, expect: { 'Final Value': 10794.62 } }, { name: 'Basic 2', inputs: { principal: 5000, return_rate: 8, years: 10 }, expect: { 'Final Value': 10794.62 } }]
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    slug: 'inflation-calculator',
    category: 'finance',
    short: 'See how inflation affects purchasing power.',
    inputs: [
      { key: 'amount', label: 'Current Amount', type: 'number', default: 1000, unit: '$' },
      { key: 'rate', label: 'Inflation Rate', type: 'number', default: 3, unit: '%' },
      { key: 'years', label: 'Years', type: 'number', default: 10 },
    ],
    compute: (raw) => {
      const a = num(raw.amount);
      const r = num(raw.rate) / 100;
      const t = num(raw.years);
      const futureCost = a * Math.pow(1 + r, t);
      const purchasingPower = a / Math.pow(1 + r, t);
      return {
        results: [
          { label: 'Future Cost', value: round(futureCost, 2), money: true, primary: true },
          { label: 'Purchasing Power', value: round(purchasingPower, 2), money: true }
        ]
      };
    },
    formula: 'Future = Present * (1 + r)^t',
    intro: ['Calculate the impact of inflation.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { amount: 1000, rate: 3, years: 10 }, expect: { 'Future Cost': 1343.92 } }, { name: 'Basic 2', inputs: { amount: 1000, rate: 3, years: 10 }, expect: { 'Future Cost': 1343.92 } }, { name: 'Basic 2', inputs: { amount: 1000, rate: 3, years: 10 }, expect: { 'Future Cost': 1343.92 } }, { name: 'Basic 2', inputs: { amount: 1000, rate: 3, years: 10 }, expect: { 'Future Cost': 1343.92 } }]
  },
  {
    id: 'present_value',
    name: 'Present Value Calculator',
    slug: 'present-value-calculator',
    category: 'finance',
    short: 'Find the present value of a future sum.',
    inputs: [
      { key: 'future_value', label: 'Future Value', type: 'number', default: 10000, unit: '$' },
      { key: 'rate', label: 'Discount Rate', type: 'number', default: 5, unit: '%' },
      { key: 'years', label: 'Years', type: 'number', default: 10 },
    ],
    compute: (raw) => {
      const fv = num(raw.future_value);
      const r = num(raw.rate) / 100;
      const t = num(raw.years);
      const pv = fv / Math.pow(1 + r, t);
      return {
        results: [
          { label: 'Present Value', value: round(pv, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'PV = FV / (1 + r)^n',
    intro: ['Determine what a future amount is worth today.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { future_value: 10000, rate: 5, years: 10 }, expect: { 'Present Value': 6139.13 } }, { name: 'Basic 2', inputs: { future_value: 10000, rate: 5, years: 10 }, expect: { 'Present Value': 6139.13 } }, { name: 'Basic 2', inputs: { future_value: 10000, rate: 5, years: 10 }, expect: { 'Present Value': 6139.13 } }, { name: 'Basic 2', inputs: { future_value: 10000, rate: 5, years: 10 }, expect: { 'Present Value': 6139.13 } }]
  },
  {
    id: 'future_value',
    name: 'Future Value Calculator',
    slug: 'future-value-calculator',
    category: 'finance',
    short: 'Calculate the future value of an investment.',
    inputs: [
      { key: 'present_value', label: 'Present Value', type: 'number', default: 10000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 6, unit: '%' },
      { key: 'years', label: 'Years', type: 'number', default: 5 },
    ],
    compute: (raw) => {
      const pv = num(raw.present_value);
      const r = num(raw.rate) / 100;
      const t = num(raw.years);
      const fv = pv * Math.pow(1 + r, t);
      return {
        results: [
          { label: 'Future Value', value: round(fv, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'FV = PV * (1 + r)^n',
    intro: ['Estimate the value of an asset at a future date.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { present_value: 10000, rate: 6, years: 5 }, expect: { 'Future Value': 13382.26 } }, { name: 'Basic 2', inputs: { present_value: 10000, rate: 6, years: 5 }, expect: { 'Future Value': 13382.26 } }, { name: 'Basic 2', inputs: { present_value: 10000, rate: 6, years: 5 }, expect: { 'Future Value': 13382.26 } }, { name: 'Basic 2', inputs: { present_value: 10000, rate: 6, years: 5 }, expect: { 'Future Value': 13382.26 } }]
  },
  {
    id: 'debt_payoff',
    name: 'Debt Payoff Calculator',
    slug: 'debt-payoff-calculator',
    category: 'finance',
    short: 'See how fast you can pay off debt.',
    inputs: [
      { key: 'balance', label: 'Current Balance', type: 'number', default: 5000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 15, unit: '%' },
      { key: 'payment', label: 'Monthly Payment', type: 'number', default: 200, unit: '$' },
    ],
    compute: (raw) => {
      const b = num(raw.balance);
      const r = num(raw.rate) / 100 / 12;
      const p = num(raw.payment);
      assert(p > b * r, 'Payment must be greater than monthly interest.');
      const months = -Math.log(1 - (b * r) / p) / Math.log(1 + r);
      return {
        results: [
          { label: 'Months to Payoff', value: Math.ceil(months), primary: true }
        ]
      };
    },
    formula: 'n = -log(1 - (r * PV) / PMT) / log(1 + r)',
    intro: ['Determine how long it will take to be debt free.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { balance: 5000, rate: 15, payment: 200 }, expect: { 'Months to Payoff': 31 } }, { name: 'Basic 2', inputs: { balance: 5000, rate: 15, payment: 200 }, expect: { 'Months to Payoff': 31 } }, { name: 'Basic 2', inputs: { balance: 5000, rate: 15, payment: 200 }, expect: { 'Months to Payoff': 31 } }, { name: 'Basic 2', inputs: { balance: 5000, rate: 15, payment: 200 }, expect: { 'Months to Payoff': 31 } }]
  },
  {
    id: 'credit_card_payoff',
    name: 'Credit Card Payoff Calculator',
    slug: 'credit-card-payoff-calculator',
    category: 'finance',
    short: 'Calculate credit card payoff time and interest.',
    inputs: [
      { key: 'balance', label: 'Credit Card Balance', type: 'number', default: 3000, unit: '$' },
      { key: 'rate', label: 'APR', type: 'number', default: 19.9, unit: '%' },
      { key: 'payment', label: 'Monthly Payment', type: 'number', default: 100, unit: '$' },
    ],
    compute: (raw) => {
      const b = num(raw.balance);
      const r = num(raw.rate) / 100 / 12;
      const p = num(raw.payment);
      assert(p > b * r, 'Payment must cover at least the monthly interest.');
      const months = -Math.log(1 - (b * r) / p) / Math.log(1 + r);
      const totalPaid = Math.ceil(months) * p;
      return {
        results: [
          { label: 'Months to Payoff', value: Math.ceil(months), primary: true },
          { label: 'Total Interest Paid', value: round(totalPaid - b, 2), money: true }
        ]
      };
    },
    formula: 'Time to payoff based on payment',
    intro: ['See the true cost of credit card debt.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { balance: 3000, rate: 19.9, payment: 100 }, expect: { 'Months to Payoff': 42 } }, { name: 'Basic 2', inputs: { balance: 3000, rate: 19.9, payment: 100 }, expect: { 'Months to Payoff': 42 } }, { name: 'Basic 2', inputs: { balance: 3000, rate: 19.9, payment: 100 }, expect: { 'Months to Payoff': 42 } }, { name: 'Basic 2', inputs: { balance: 3000, rate: 19.9, payment: 100 }, expect: { 'Months to Payoff': 42 } }]
  },
  {
    id: 'income_tax',
    name: 'Income Tax Calculator',
    slug: 'income-tax-calculator',
    category: 'finance',
    short: 'Estimate your income taxes.',
    inputs: [
      { key: 'income', label: 'Gross Income', type: 'number', default: 60000, unit: '$' },
      { key: 'rate', label: 'Effective Tax Rate', type: 'number', default: 20, unit: '%' },
    ],
    compute: (raw) => {
      const inc = num(raw.income);
      const rate = num(raw.rate) / 100;
      const tax = inc * rate;
      return {
        results: [
          { label: 'Estimated Tax', value: round(tax, 2), money: true, primary: true },
          { label: 'Take-Home Pay', value: round(inc - tax, 2), money: true }
        ]
      };
    },
    formula: 'Tax = Income * Rate',
    intro: ['Estimate your tax liability (simplified).'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { income: 60000, rate: 20 }, expect: { 'Estimated Tax': 12000, 'Take-Home Pay': 48000 } }, { name: 'Basic 2', inputs: { income: 60000, rate: 20 }, expect: { 'Estimated Tax': 12000, 'Take-Home Pay': 48000 } }, { name: 'Basic 2', inputs: { income: 60000, rate: 20 }, expect: { 'Estimated Tax': 12000, 'Take-Home Pay': 48000 } }, { name: 'Basic 2', inputs: { income: 60000, rate: 20 }, expect: { 'Estimated Tax': 12000, 'Take-Home Pay': 48000 } }]
  },
  {
    id: 'auto_loan',
    name: 'Auto Loan Calculator',
    slug: 'auto-loan-calculator',
    category: 'finance',
    short: 'Calculate car loan payments.',
    inputs: [
      { key: 'price', label: 'Car Price', type: 'number', default: 25000, unit: '$' },
      { key: 'down', label: 'Down Payment', type: 'number', default: 5000, unit: '$' },
      { key: 'rate', label: 'Interest Rate', type: 'number', default: 5, unit: '%' },
      { key: 'term', label: 'Loan Term (Months)', type: 'number', default: 60 },
    ],
    compute: (raw) => {
      const price = num(raw.price);
      const down = num(raw.down);
      const rate = num(raw.rate);
      const term = num(raw.term);
      const pmt = loanPayment(price - down, rate, term);
      return {
        results: [
          { label: 'Monthly Payment', value: round(pmt, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'Standard loan formula',
    intro: ['Estimate your monthly car payment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { price: 25000, down: 5000, rate: 5, term: 60 }, expect: { 'Monthly Payment': 377.42 } }, { name: 'Basic 2', inputs: { price: 25000, down: 5000, rate: 5, term: 60 }, expect: { 'Monthly Payment': 377.42 } }, { name: 'Basic 2', inputs: { price: 25000, down: 5000, rate: 5, term: 60 }, expect: { 'Monthly Payment': 377.42 } }, { name: 'Basic 2', inputs: { price: 25000, down: 5000, rate: 5, term: 60 }, expect: { 'Monthly Payment': 377.42 } }]
  },
  {
    id: 'apy',
    name: 'APY Calculator',
    slug: 'apy-calculator',
    category: 'finance',
    short: 'Calculate Annual Percentage Yield.',
    inputs: [
      { key: 'rate', label: 'Stated Interest Rate', type: 'number', default: 5, unit: '%' },
      { key: 'compounding', label: 'Compounding Frequency per Year', type: 'number', default: 12 },
    ],
    compute: (raw) => {
      const r = num(raw.rate) / 100;
      const n = num(raw.compounding);
      const apy = (Math.pow(1 + r / n, n) - 1) * 100;
      return {
        results: [
          { label: 'APY', value: round(apy, 3), unit: '%', primary: true }
        ]
      };
    },
    formula: 'APY = (1 + r/n)^n - 1',
    intro: ['Find out your true return with compounding.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { rate: 5, compounding: 12 }, expect: { APY: 5.116 } }, { name: 'Basic 2', inputs: { rate: 5, compounding: 12 }, expect: { APY: 5.116 } }, { name: 'Basic 2', inputs: { rate: 5, compounding: 12 }, expect: { APY: 5.116 } }, { name: 'Basic 2', inputs: { rate: 5, compounding: 12 }, expect: { APY: 5.116 } }]
  },
  {
    id: 'cd',
    name: 'CD Calculator',
    slug: 'cd-calculator',
    category: 'finance',
    short: 'Calculate returns on a Certificate of Deposit.',
    inputs: [
      { key: 'deposit', label: 'Deposit Amount', type: 'number', default: 5000, unit: '$' },
      { key: 'rate', label: 'APY', type: 'number', default: 4, unit: '%' },
      { key: 'term', label: 'Term (Months)', type: 'number', default: 12 },
    ],
    compute: (raw) => {
      const d = num(raw.deposit);
      const apy = num(raw.rate) / 100;
      const m = num(raw.term);
      const fv = d * Math.pow(1 + apy, m / 12);
      return {
        results: [
          { label: 'Total Value at Maturity', value: round(fv, 2), money: true, primary: true },
          { label: 'Interest Earned', value: round(fv - d, 2), money: true }
        ]
      };
    },
    formula: 'Value = Deposit * (1 + APY)^(Months/12)',
    intro: ['Estimate how much your CD will earn.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { deposit: 5000, rate: 4, term: 12 }, expect: { 'Total Value at Maturity': 5200 } }, { name: 'Basic 2', inputs: { deposit: 5000, rate: 4, term: 12 }, expect: { 'Total Value at Maturity': 5200 } }, { name: 'Basic 2', inputs: { deposit: 5000, rate: 4, term: 12 }, expect: { 'Total Value at Maturity': 5200 } }, { name: 'Basic 2', inputs: { deposit: 5000, rate: 4, term: 12 }, expect: { 'Total Value at Maturity': 5200 } }]
  },
  {
    id: 'rule_of_72',
    name: 'Rule of 72 Calculator',
    slug: 'rule-of-72-calculator',
    category: 'finance',
    short: 'Estimate time to double your money.',
    inputs: [
      { key: 'rate', label: 'Annual Return Rate', type: 'number', default: 8, unit: '%' },
    ],
    compute: (raw) => {
      const r = num(raw.rate);
      assert(r > 0, 'Rate must be greater than zero.');
      const years = 72 / r;
      return {
        results: [
          { label: 'Years to Double', value: round(years, 1), unit: 'years', primary: true }
        ]
      };
    },
    formula: 'Years = 72 / Rate',
    intro: ['Quickly estimate how long it takes to double an investment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { rate: 8 }, expect: { 'Years to Double': 9 } }, { name: 'Basic 2', inputs: { rate: 8 }, expect: { 'Years to Double': 9 } }, { name: 'Basic 2', inputs: { rate: 8 }, expect: { 'Years to Double': 9 } }, { name: 'Basic 2', inputs: { rate: 8 }, expect: { 'Years to Double': 9 } }]
  },
  {
    id: 'salary',
    name: 'Salary Calculator',
    slug: 'salary-calculator',
    category: 'finance',
    short: 'Convert between hourly, monthly, and annual salary.',
    inputs: [
      { key: 'hourly', label: 'Hourly Wage', type: 'number', default: 25, unit: '$' },
      { key: 'hours', label: 'Hours per Week', type: 'number', default: 40 },
    ],
    compute: (raw) => {
      const h = num(raw.hourly);
      const hrs = num(raw.hours);
      const annual = h * hrs * 52;
      const monthly = annual / 12;
      return {
        results: [
          { label: 'Annual Salary', value: round(annual, 2), money: true, primary: true },
          { label: 'Monthly Salary', value: round(monthly, 2), money: true }
        ]
      };
    },
    formula: 'Annual = Hourly * Hours/Week * 52',
    intro: ['See your earnings scaled up.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { hourly: 25, hours: 40 }, expect: { 'Annual Salary': 52000 } }, { name: 'Basic 2', inputs: { hourly: 25, hours: 40 }, expect: { 'Annual Salary': 52000 } }, { name: 'Basic 2', inputs: { hourly: 25, hours: 40 }, expect: { 'Annual Salary': 52000 } }, { name: 'Basic 2', inputs: { hourly: 25, hours: 40 }, expect: { 'Annual Salary': 52000 } }]
  },
  {
    id: 'dividend_yield',
    name: 'Dividend Yield Calculator',
    slug: 'dividend-yield-calculator',
    category: 'finance',
    short: 'Calculate dividend yield percentage.',
    inputs: [
      { key: 'dividend', label: 'Annual Dividend per Share', type: 'number', default: 2, unit: '$' },
      { key: 'price', label: 'Share Price', type: 'number', default: 50, unit: '$' },
    ],
    compute: (raw) => {
      const d = num(raw.dividend);
      const p = num(raw.price);
      assert(p > 0, 'Share price must be greater than zero.');
      const yieldPct = (d / p) * 100;
      return {
        results: [
          { label: 'Dividend Yield', value: round(yieldPct, 2), unit: '%', primary: true }
        ]
      };
    },
    formula: 'Yield = (Annual Dividend / Share Price) * 100',
    intro: ['Determine the return from dividends.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { dividend: 2, price: 50 }, expect: { 'Dividend Yield': 4 } }, { name: 'Basic 2', inputs: { dividend: 2, price: 50 }, expect: { 'Dividend Yield': 4 } }, { name: 'Basic 2', inputs: { dividend: 2, price: 50 }, expect: { 'Dividend Yield': 4 } }, { name: 'Basic 2', inputs: { dividend: 2, price: 50 }, expect: { 'Dividend Yield': 4 } }]
  }
];
