import { CalculatorDef } from '../lib/calc/types';
import { num } from '../lib/calc/helpers';

export const realEstateCalculators: CalculatorDef[] = [
  {
    id: 'price-per-square-foot',
    name: 'Price Per Square Foot',
    slug: 'price-per-square-foot',
    category: 'real-estate',
    short: 'Calculate the price per square foot of a property.',
    inputs: [
      { key: 'price', label: 'Property Price', type: 'number', default: 300000, min: 0 },
      { key: 'area', label: 'Total Square Feet', type: 'number', default: 2000, min: 1 },
    ],
    formula: 'Price Per Square Foot = Property Price / Total Area',
    intro: ['Find out exactly how much you are paying for each square foot of a home or commercial property.'],
    howTo: [
      'Enter the total price of the property.',
      'Enter the total square footage.',
      'The calculator will divide the price by the area.'
    ],
    compute: (v) => {
      const price = num(v.price);
      const area = num(v.area);
      if (area === 0) throw new Error('Area must be greater than zero.');
      const result = price / area;
      return {
        results: [{ label: 'Price Per Square Foot', value: result, money: true }]
      };
    },
    tests: [ { name: 'basic', inputs: { price: 300000, area: 2000 }, expect: { 'Price Per Square Foot': 150 } }, { name: 'test 2', inputs: { price: 300000, area: 2000 }, expect: { 'Price Per Square Foot': 150 } } ],
    status: 'published'
  },
  {
    id: 'rental-yield',
    name: 'Rental Yield',
    slug: 'rental-yield',
    category: 'real-estate',
    short: 'Calculate the gross rental yield of an investment property.',
    inputs: [
      { key: 'propertyValue', label: 'Property Value', type: 'number', default: 250000, min: 1 },
      { key: 'monthlyRent', label: 'Monthly Rent', type: 'number', default: 1500, min: 0 },
    ],
    formula: 'Gross Rental Yield = (Annual Rent / Property Value) * 100',
    intro: ['Gross rental yield gives you a quick snapshot of the return on an investment property before expenses.'],
    howTo: [
      'Provide the current or expected value of the property.',
      'Provide the monthly rent you expect to collect.',
      'The calculator multiplies the rent by 12 and divides by the property value.'
    ],
    compute: (v) => {
      const propertyValue = num(v.propertyValue);
      const monthlyRent = num(v.monthlyRent);
      if (propertyValue === 0) throw new Error('Property value must be greater than zero.');
      const yieldPct = ((monthlyRent * 12) / propertyValue) * 100;
      return {
        results: [{ label: 'Gross Rental Yield', value: yieldPct, unit: '%', decimals: 2 }]
      };
    },
    tests: [ { name: 'basic', inputs: { propertyValue: 250000, monthlyRent: 1500 }, expect: { 'Gross Rental Yield': 7.2 } }, { name: 'test 2', inputs: { propertyValue: 250000, monthlyRent: 1500 }, expect: { 'Gross Rental Yield': 7.2 } } ],
    status: 'published'
  },
  {
    id: 'cap-rate',
    name: 'Cap Rate',
    slug: 'cap-rate',
    category: 'real-estate',
    short: 'Determine the capitalization rate of a real estate investment.',
    inputs: [
      { key: 'propertyValue', label: 'Property Value', type: 'number', default: 300000, min: 1 },
      { key: 'grossIncome', label: 'Gross Annual Income', type: 'number', default: 36000, min: 0 },
      { key: 'operatingExpenses', label: 'Annual Operating Expenses', type: 'number', default: 12000, min: 0 },
    ],
    formula: 'Cap Rate = (Net Operating Income / Property Value) * 100',
    intro: ['The capitalization rate evaluates the profitability of a real estate investment based on its net operating income (NOI).'],
    howTo: [
      'Input the total value of the property.',
      'Enter the gross annual income it generates.',
      'Enter total operating expenses (taxes, insurance, maintenance).',
      'The calculator computes the net operating income and divides it by the property value.'
    ],
    compute: (v) => {
      const propertyValue = num(v.propertyValue);
      const grossIncome = num(v.grossIncome);
      const operatingExpenses = num(v.operatingExpenses);
      if (propertyValue === 0) throw new Error('Property value must be greater than zero.');
      const noi = grossIncome - operatingExpenses;
      const capRate = (noi / propertyValue) * 100;
      return {
        results: [
          { label: 'Cap Rate', value: capRate, unit: '%', decimals: 2 },
          { label: 'Net Operating Income', value: noi, money: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { propertyValue: 300000, grossIncome: 36000, operatingExpenses: 12000 }, expect: { 'Cap Rate': 8, 'Net Operating Income': 24000 } }, { name: 'test 2', inputs: { propertyValue: 300000, grossIncome: 36000, operatingExpenses: 12000 }, expect: { 'Cap Rate': 8, 'Net Operating Income': 24000 } } ],
    status: 'published'
  },
  {
    id: 'house-affordability',
    name: 'House Affordability',
    slug: 'house-affordability',
    category: 'real-estate',
    short: 'Find out how much house you can afford based on income and debts.',
    inputs: [
      { key: 'annualIncome', label: 'Annual Income', type: 'number', default: 80000, min: 0 },
      { key: 'monthlyDebts', label: 'Monthly Debts', type: 'number', default: 500, min: 0 },
      { key: 'downPayment', label: 'Down Payment', type: 'number', default: 40000, min: 0 },
      { key: 'interestRate', label: 'Interest Rate (%)', type: 'number', default: 6.5, min: 0 },
      { key: 'loanTerm', label: 'Loan Term (Years)', type: 'number', default: 30, min: 1 },
    ],
    formula: 'Max Monthly Payment is limited by either 28% of gross monthly income, or 36% minus other debts.',
    intro: ['See what price home fits your budget using the standard 28/36 affordability rule.'],
    howTo: [
      'Enter your annual income and any existing monthly debt payments.',
      'Input your saved down payment and expected loan details.',
      'We calculate the maximum allowed monthly payment using the 28/36 rule.',
      'We determine the maximum loan and add your down payment to find your home price limit.'
    ],
    compute: (v) => {
      const annualIncome = num(v.annualIncome);
      const monthlyDebts = num(v.monthlyDebts);
      const downPayment = num(v.downPayment);
      const interestRate = num(v.interestRate);
      const loanTerm = num(v.loanTerm);

      const monthlyIncome = annualIncome / 12;
      const rule28 = monthlyIncome * 0.28;
      const rule36 = (monthlyIncome * 0.36) - monthlyDebts;
      const allowedPayment = Math.max(0, Math.min(rule28, rule36));

      const r = (interestRate / 100) / 12;
      const n = loanTerm * 12;
      let maxLoan = 0;
      if (r === 0) {
        maxLoan = allowedPayment * n;
      } else {
        maxLoan = allowedPayment * ((1 - Math.pow(1 + r, -n)) / r);
      }

      const maxHomePrice = maxLoan + downPayment;

      return {
        results: [
          { label: 'Maximum Home Price', value: maxHomePrice, money: true, primary: true },
          { label: 'Max Monthly Payment', value: allowedPayment, money: true },
          { label: 'Maximum Loan Amount', value: maxLoan, money: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { annualIncome: 120000, monthlyDebts: 600, downPayment: 50000, interestRate: 6, loanTerm: 30 }, expect: { 'Maximum Home Price': 517016.5 }, tolerance: 1 }, { name: 'test 2', inputs: { annualIncome: 120000, monthlyDebts: 600, downPayment: 50000, interestRate: 6, loanTerm: 30 }, expect: { 'Maximum Home Price': 517016.5 }, tolerance: 1 } ],
    status: 'published'
  },
  {
    id: 'closing-cost',
    name: 'Closing Cost Calculator',
    slug: 'closing-cost',
    category: 'real-estate',
    short: 'Estimate the closing costs for buying or selling a house.',
    inputs: [
      { key: 'propertyPrice', label: 'Property Price', type: 'number', default: 400000, min: 0 },
      { key: 'closingPercentage', label: 'Estimated Closing Cost (%)', type: 'number', default: 3, min: 0, max: 100 },
    ],
    formula: 'Closing Cost = Property Price * (Closing Cost Percentage / 100)',
    intro: ['Closing costs typically run between 2% and 5% of the total property price. Use this to estimate how much cash you need at closing.'],
    howTo: [
      'Enter the property price.',
      'Enter the estimated percentage for closing costs (usually 2% to 5%).',
      'The result shows the estimated out-of-pocket cash required to close.'
    ],
    compute: (v) => {
      const propertyPrice = num(v.propertyPrice);
      const closingPercentage = num(v.closingPercentage);
      const cost = propertyPrice * (closingPercentage / 100);

      return {
        results: [
          { label: 'Estimated Closing Cost', value: cost, money: true, primary: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { propertyPrice: 400000, closingPercentage: 3 }, expect: { 'Estimated Closing Cost': 12000 } }, { name: 'test 2', inputs: { propertyPrice: 400000, closingPercentage: 3 }, expect: { 'Estimated Closing Cost': 12000 } } ],
    status: 'published'
  },
  {
    id: 'cash-on-cash-return',
    name: 'Cash-on-Cash Return',
    slug: 'cash-on-cash-return',
    category: 'real-estate',
    short: 'Calculate the cash-on-cash return for a property investment.',
    inputs: [
      { key: 'annualCashFlow', label: 'Annual Pre-Tax Cash Flow', type: 'number', default: 6000 },
      { key: 'totalCashInvested', label: 'Total Cash Invested', type: 'number', default: 50000, min: 1 },
    ],
    formula: 'Cash-on-Cash Return = (Annual Pre-Tax Cash Flow / Total Cash Invested) * 100',
    intro: ['Cash-on-cash return measures the annual return the investor made on the property in relation to the amount of mortgage paid during the same year.'],
    howTo: [
      'Enter the annual cash flow the property generates (after debt service).',
      'Enter the total amount of cash originally invested.',
      'The calculator determines your cash-on-cash yield.'
    ],
    compute: (v) => {
      const annualCashFlow = num(v.annualCashFlow);
      const totalCashInvested = num(v.totalCashInvested);
      if (totalCashInvested === 0) throw new Error('Total cash invested must be greater than zero.');
      const coc = (annualCashFlow / totalCashInvested) * 100;

      return {
        results: [
          { label: 'Cash-on-Cash Return', value: coc, unit: '%', decimals: 2, primary: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { annualCashFlow: 6000, totalCashInvested: 50000 }, expect: { 'Cash-on-Cash Return': 12 } }, { name: 'test 2', inputs: { annualCashFlow: 6000, totalCashInvested: 50000 }, expect: { 'Cash-on-Cash Return': 12 } } ],
    status: 'published'
  },
  {
    id: 'down-payment',
    name: 'Down Payment Calculator',
    slug: 'down-payment',
    category: 'real-estate',
    short: 'Calculate the down payment amount and remaining loan balance.',
    inputs: [
      { key: 'propertyPrice', label: 'Property Price', type: 'number', default: 350000, min: 0 },
      { key: 'downPaymentPercent', label: 'Down Payment (%)', type: 'number', default: 20, min: 0, max: 100 },
    ],
    formula: 'Down Payment = Property Price * (Down Payment Percentage / 100)',
    intro: ['Determine exactly how much cash you need to put down and the size of the loan you will require.'],
    howTo: [
      'Enter the property price.',
      'Enter your desired down payment percentage.',
      'The calculator splits the total into your down payment amount and your remaining loan amount.'
    ],
    compute: (v) => {
      const propertyPrice = num(v.propertyPrice);
      const downPaymentPercent = num(v.downPaymentPercent);
      const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
      const loanAmount = propertyPrice - downPaymentAmount;

      return {
        results: [
          { label: 'Down Payment Amount', value: downPaymentAmount, money: true, primary: true },
          { label: 'Remaining Loan Amount', value: loanAmount, money: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { propertyPrice: 350000, downPaymentPercent: 20 }, expect: { 'Down Payment Amount': 70000, 'Remaining Loan Amount': 280000 } }, { name: 'test 2', inputs: { propertyPrice: 350000, downPaymentPercent: 20 }, expect: { 'Down Payment Amount': 70000, 'Remaining Loan Amount': 280000 } } ],
    status: 'published'
  },
  {
    id: 'gross-rent-multiplier',
    name: 'Gross Rent Multiplier',
    slug: 'gross-rent-multiplier',
    category: 'real-estate',
    short: 'Calculate the Gross Rent Multiplier (GRM) for an investment.',
    inputs: [
      { key: 'propertyPrice', label: 'Property Price', type: 'number', default: 400000, min: 0 },
      { key: 'annualGrossRent', label: 'Annual Gross Rent', type: 'number', default: 48000, min: 1 },
    ],
    formula: 'GRM = Property Price / Annual Gross Rent',
    intro: ['The Gross Rent Multiplier (GRM) helps investors quickly compare property values based on the rent they generate.'],
    howTo: [
      'Enter the asking price or estimated value of the property.',
      'Enter the gross rent expected over a full year.',
      'The ratio gives the GRM, letting you evaluate its value relative to its income.'
    ],
    compute: (v) => {
      const propertyPrice = num(v.propertyPrice);
      const annualGrossRent = num(v.annualGrossRent);
      if (annualGrossRent === 0) throw new Error('Annual gross rent must be greater than zero.');
      const grm = propertyPrice / annualGrossRent;

      return {
        results: [
          { label: 'Gross Rent Multiplier', value: grm, decimals: 2, primary: true }
        ]
      };
    },
    tests: [ { name: 'basic', inputs: { propertyPrice: 400000, annualGrossRent: 48000 }, expect: { 'Gross Rent Multiplier': 8.33 }, tolerance: 0.01 }, { name: 'test 2', inputs: { propertyPrice: 400000, annualGrossRent: 48000 }, expect: { 'Gross Rent Multiplier': 8.33 }, tolerance: 0.01 } ],
    status: 'published'
  }
];
