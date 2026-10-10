import type { CalculatorDef } from '@/lib/calc/types';
import { assert, money, num, round } from '@/lib/calc/helpers';

export const everydayCalculators: CalculatorDef[] = [
  {
    id: 'tip',
    name: 'Tip Calculator',
    slug: 'tip-calculator',
    category: 'everyday',
    short: 'Work out the tip, total bill, and amount per person for any tip percentage.',
    aliases: ['gratuity calculator', 'restaurant tip', 'how much to tip'],
    tags: ['restaurant', 'gratuity', 'bill'],
    inputs: [
      { key: 'bill', label: 'Bill amount', type: 'number', default: 80, min: 0, max: 1e9, step: 'any' },
      { key: 'tip', label: 'Tip percentage', type: 'number', default: 15, min: 0, max: 100, step: 'any', unit: '%' },
      { key: 'people', label: 'Number of people', type: 'number', default: 1, min: 1, max: 1000, integer: true },
    ],
    compute: (v) => {
      const bill = num(v.bill);
      const tip = money.cents(money.mul(bill, num(v.tip) / 100));
      const total = money.add(bill, tip);
      const people = num(v.people);
      return {
        results: [
          { label: 'Tip amount', value: tip, money: true, primary: true },
          { label: 'Total bill', value: total, money: true },
          { label: 'Tip per person', value: money.cents(tip / people), money: true },
          { label: 'Total per person', value: money.cents(total / people), money: true },
        ],
        notes: people > 1 ? ['Per-person amounts are rounded to the nearest cent, so the shares may differ from the total by a cent.'] : undefined,
      };
    },
    formula: 'Tip = Bill × (Tip % ÷ 100); Total = Bill + Tip; Per person = Total ÷ People',
    intro: [
      'Enter the bill, the tip rate you want to leave, and how many people are sharing. The calculator returns the tip, the total, and each person\'s share.',
      'Tipping customs differ by country. In the United States, 15% to 20% at sit-down restaurants is common, while in Japan tipping is generally not expected. Check local norms before you pay.',
    ],
    howTo: ['Type the bill amount before tip.', 'Set the tip percentage.', 'Enter the number of people splitting the bill.', 'Press Calculate.'],
    example: 'A bill of 80.00 with a 15% tip gives a tip of 12.00 and a total of 92.00. Split between 4 people, each pays 23.00.',
    assumptions: ['The tip is calculated on the amount you enter. If you want to tip on the pre-tax amount, enter the subtotal before tax.'],
    faqs: [
      { q: 'Should I tip on the amount before or after tax?', a: 'Many people tip on the pre-tax subtotal. Enter whichever amount you prefer to tip on.' },
      { q: 'How do I split a tip unevenly?', a: 'Use the bill split calculator to split by individual amounts, then apply the tip rate to each share.' },
    ],
    related: ['bill-split-calculator', 'discount-calculator', 'sales-tax-calculator', 'percentage-calculator'],
    articles: ['how-to-calculate-a-tip'],
    status: 'published',
    popular: true,
    tests: [
      { name: '15% on 80', inputs: { bill: 80, tip: 15, people: 1 }, expect: { 'Tip amount': 12, 'Total bill': 92 } },
      { name: 'split 4', inputs: { bill: 80, tip: 15, people: 4 }, expect: { 'Total per person': 23 } },
      { name: 'zero tip', inputs: { bill: 50, tip: 0, people: 2 }, expect: { 'Tip amount': 0, 'Total per person': 25 } },
      { name: 'rounding', inputs: { bill: 33.33, tip: 18, people: 1 }, expect: { 'Tip amount': 6 } },
    ],
  },
  {
    id: 'bill-split',
    name: 'Bill Split Calculator',
    slug: 'bill-split-calculator',
    category: 'everyday',
    short: 'Split a bill evenly between people, including tax and tip.',
    aliases: ['split the check', 'divide bill', 'share bill'],
    tags: ['restaurant', 'group', 'share'],
    inputs: [
      { key: 'bill', label: 'Bill subtotal', type: 'number', default: 120, min: 0, max: 1e9, step: 'any' },
      { key: 'tax', label: 'Tax rate', type: 'number', default: 0, min: 0, max: 100, step: 'any', unit: '%' },
      { key: 'tip', label: 'Tip rate', type: 'number', default: 18, min: 0, max: 100, step: 'any', unit: '%' },
      { key: 'people', label: 'Number of people', type: 'number', default: 4, min: 1, max: 1000, integer: true },
    ],
    compute: (v) => {
      const bill = num(v.bill);
      const tax = money.cents(money.mul(bill, num(v.tax) / 100));
      const tip = money.cents(money.mul(bill, num(v.tip) / 100));
      const total = money.add(bill, tax, tip);
      const people = num(v.people);
      const each = Math.ceil(money.div(total, people) * 100 - 1e-9) / 100;
      return {
        results: [
          { label: 'Each person pays', value: round(total / people, 2), money: true, primary: true },
          { label: 'Rounded up per person', value: each, money: true },
          { label: 'Tax', value: tax, money: true },
          { label: 'Tip', value: tip, money: true },
          { label: 'Grand total', value: total, money: true },
        ],
      };
    },
    formula: 'Total = Subtotal + Subtotal × Tax% + Subtotal × Tip%; Share = Total ÷ People',
    intro: [
      'Use this when a group wants to share one bill equally. Tax and tip are both applied to the subtotal, then the total is divided by the number of people.',
      'The rounded-up figure shows the smallest per-person amount, to the cent, that covers the full bill.',
    ],
    example: 'A 120.00 subtotal with no tax and an 18% tip comes to 141.60. Four people each pay 35.40.',
    related: ['tip-calculator', 'sales-tax-calculator', 'percentage-calculator'],
    articles: ['how-to-calculate-a-tip'],
    status: 'published',
    tests: [
      { name: 'basic', inputs: { bill: 120, tax: 0, tip: 18, people: 4 }, expect: { 'Each person pays': 35.4, 'Grand total': 141.6 } },
      { name: 'round up', inputs: { bill: 100, tax: 0, tip: 0, people: 3 }, expect: { 'Each person pays': 33.33, 'Rounded up per person': 33.34 } },
    ],
  },
  {
    id: 'discount',
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category: 'everyday',
    short: 'Find the sale price and the amount saved after a percentage or fixed discount.',
    aliases: ['sale price calculator', 'percent off calculator', 'price after discount'],
    tags: ['shopping', 'sale', 'percent off'],
    inputs: [
      { key: 'price', label: 'Original price', type: 'number', default: 60, min: 0, max: 1e12, step: 'any' },
      {
        key: 'mode',
        label: 'Discount type',
        type: 'select',
        default: 'percent',
        options: [
          { value: 'percent', label: 'Percentage off' },
          { value: 'fixed', label: 'Fixed amount off' },
        ],
      },
      { key: 'pct', label: 'Discount', type: 'number', default: 25, min: 0, max: 100, step: 'any', unit: '%', showIf: { key: 'mode', equals: ['percent'] } },
      { key: 'amount', label: 'Amount off', type: 'number', default: 10, min: 0, step: 'any', showIf: { key: 'mode', equals: ['fixed'] } },
    ],
    compute: (v) => {
      const price = num(v.price);
      const off = v.mode === 'percent' ? money.cents(money.mul(price, num(v.pct) / 100)) : num(v.amount);
      assert(off <= price, 'The discount cannot be larger than the original price.');
      const final = money.sub(price, off);
      return {
        results: [
          { label: 'Sale price', value: final, money: true, primary: true },
          { label: 'You save', value: off, money: true },
          { label: 'Discount rate', value: price > 0 ? round((off / price) * 100, 2) : 0, unit: '%' },
        ],
      };
    },
    formula: 'Sale price = Price × (1 − Discount% ÷ 100), or Price − Amount off',
    intro: [
      'Enter the original price and either a percentage or a fixed amount off. You get the price you pay and the effective discount rate.',
      'For stacked discounts such as "20% off, then an extra 10%", run the calculator twice: the second discount applies to the already reduced price, so the combined saving is 28%, not 30%.',
    ],
    example: 'A 60.00 item at 25% off saves 15.00 and costs 45.00.',
    related: ['percentage-calculator', 'sales-tax-calculator', 'percentage-change-calculator', 'markup-calculator'],
    articles: ['how-to-calculate-percentages'],
    status: 'published',
    popular: true,
    tests: [
      { name: '25% off 60', inputs: { price: 60, mode: 'percent', pct: 25 }, expect: { 'Sale price': 45, 'You save': 15 } },
      { name: 'fixed', inputs: { price: 50, mode: 'fixed', amount: 10 }, expect: { 'Sale price': 40, 'Discount rate': 20 } },
      { name: 'too big', inputs: { price: 5, mode: 'fixed', amount: 10 }, throws: true },
    ],
  },
  {
    id: 'sales-tax',
    name: 'Sales Tax Calculator',
    slug: 'sales-tax-calculator',
    category: 'everyday',
    short: 'Add sales tax or VAT to a price, or work back from a tax-inclusive total.',
    aliases: ['vat calculator', 'gst calculator', 'tax inclusive price', 'reverse sales tax'],
    tags: ['tax', 'vat', 'gst', 'shopping'],
    inputs: [
      {
        key: 'mode',
        label: 'What do you have?',
        type: 'select',
        default: 'add',
        options: [
          { value: 'add', label: 'Price before tax' },
          { value: 'remove', label: 'Price including tax' },
        ],
      },
      { key: 'amount', label: 'Amount', type: 'number', default: 100, min: 0, max: 1e12, step: 'any' },
      { key: 'rate', label: 'Tax rate', type: 'number', default: 8, min: 0, max: 100, step: 'any', unit: '%' },
    ],
    compute: (v) => {
      const a = num(v.amount);
      const r = num(v.rate) / 100;
      let net: number, tax: number, gross: number;
      if (v.mode === 'add') {
        net = a;
        tax = money.cents(money.mul(a, r));
        gross = money.add(a, tax);
      } else {
        gross = a;
        net = money.cents(money.div(a, 1 + r));
        tax = money.sub(gross, net);
      }
      return {
        results: [
          { label: 'Total including tax', value: gross, money: true, primary: v.mode === 'add' },
          { label: 'Price before tax', value: net, money: true, primary: v.mode === 'remove' },
          { label: 'Tax amount', value: tax, money: true },
        ],
      };
    },
    formula: 'Tax = Net × Rate; Gross = Net × (1 + Rate); Net = Gross ÷ (1 + Rate)',
    intro: [
      'This works for US sales tax, VAT, GST, and any other single-rate tax charged on a price. Choose whether your amount already includes tax.',
      'A common mistake when removing tax is to subtract the rate from the total. With a 20% VAT, a 120.00 total contains 20.00 of tax, not 24.00, because the tax was charged on 100.00.',
    ],
    example: 'A 100.00 item with 8% sales tax costs 108.00. A 120.00 price that includes 20% VAT has a net price of 100.00.',
    limitations: ['Rates vary by country, state, county, and city, and some goods are exempt or taxed at reduced rates. Confirm the rate that applies to your purchase with the local tax authority.'],
    related: ['discount-calculator', 'tip-calculator', 'percentage-calculator', 'income-tax-calculator'],
    articles: ['how-to-calculate-percentages'],
    status: 'published',
    popular: true,
    tests: [
      { name: 'add 8%', inputs: { mode: 'add', amount: 100, rate: 8 }, expect: { 'Total including tax': 108, 'Tax amount': 8 } },
      { name: 'remove 20%', inputs: { mode: 'remove', amount: 120, rate: 20 }, expect: { 'Price before tax': 100, 'Tax amount': 20 } },
      { name: 'zero rate', inputs: { mode: 'add', amount: 50, rate: 0 }, expect: { 'Total including tax': 50 } },
    ],
  },
  {
    id: 'savings-goal',
    name: 'Savings Goal Calculator',
    slug: 'savings-goal-calculator',
    category: 'everyday',
    short: 'Find how much to save each month to reach a target by a chosen date.',
    aliases: ['how much to save per month', 'saving target', 'monthly savings needed'],
    tags: ['savings', 'goal', 'budget'],
    inputs: [
      { key: 'goal', label: 'Savings goal', type: 'number', default: 10000, min: 0, max: 1e12, step: 'any' },
      { key: 'current', label: 'Already saved', type: 'number', default: 1000, min: 0, max: 1e12, step: 'any' },
      { key: 'months', label: 'Months to reach goal', type: 'number', default: 24, min: 1, max: 1200, integer: true },
      { key: 'rate', label: 'Annual interest rate', type: 'number', default: 3, min: 0, max: 50, step: 'any', unit: '%', help: 'Interest compounded monthly. Enter 0 for a plain savings jar.' },
    ],
    compute: (v) => {
      const goal = num(v.goal);
      const pv = num(v.current);
      const n = num(v.months);
      const r = num(v.rate) / 100 / 12;
      const fvCurrent = pv * Math.pow(1 + r, n);
      const remaining = goal - fvCurrent;
      const pmt = remaining <= 0 ? 0 : r === 0 ? remaining / n : (remaining * r) / (Math.pow(1 + r, n) - 1);
      const deposits = pmt * n;
      return {
        results: [
          { label: 'Monthly saving needed', value: round(pmt, 2), money: true, primary: true },
          { label: 'Total deposits', value: round(deposits, 2), money: true },
          { label: 'Interest earned', value: round(Math.max(goal, fvCurrent) - pv - deposits, 2), money: true },
        ],
        notes: remaining <= 0 ? ['Your current savings will reach the goal through interest alone.'] : undefined,
      };
    },
    formula: 'PMT = (Goal − PV(1+r)^n) × r ÷ ((1+r)^n − 1), with r = annual rate ÷ 12',
    intro: [
      'Set a target, the amount you already have, and a deadline in months. The calculator finds the fixed monthly deposit that gets you there, assuming deposits at the end of each month.',
    ],
    example: 'To grow 1,000 into 10,000 over 24 months at 3% a year, you need to save about 361.83 per month.',
    assumptions: ['Deposits are made at the end of each month.', 'The interest rate stays the same for the whole period.'],
    related: ['savings-calculator', 'compound-interest-calculator', 'budget-calculator'],
    articles: ['compound-interest-explained'],
    status: 'published',
    tests: [
      { name: 'no interest', inputs: { goal: 1200, current: 0, months: 12, rate: 0 }, expect: { 'Monthly saving needed': 100 } },
      { name: '3%', inputs: { goal: 10000, current: 1000, months: 24, rate: 3 }, expect: { 'Monthly saving needed': 361.83 }, tolerance: 0.001 },
      { name: 'already there', inputs: { goal: 500, current: 1000, months: 12, rate: 0 }, expect: { 'Monthly saving needed': 0 } },
    ],
  },
  {
    id: 'budget',
    name: 'Budget Calculator (50/30/20)',
    slug: 'budget-calculator',
    category: 'everyday',
    short: 'Split take-home pay into needs, wants, and savings using the 50/30/20 rule or your own split.',
    aliases: ['50 30 20 rule', 'household budget', 'monthly budget planner'],
    tags: ['budget', 'household', 'income'],
    inputs: [
      { key: 'income', label: 'Monthly take-home pay', type: 'number', default: 4000, min: 0, max: 1e10, step: 'any' },
      { key: 'needs', label: 'Needs share', type: 'number', default: 50, min: 0, max: 100, step: 'any', unit: '%' },
      { key: 'wants', label: 'Wants share', type: 'number', default: 30, min: 0, max: 100, step: 'any', unit: '%' },
      { key: 'savings', label: 'Savings and debt share', type: 'number', default: 20, min: 0, max: 100, step: 'any', unit: '%' },
    ],
    compute: (v) => {
      const inc = num(v.income);
      const total = num(v.needs) + num(v.wants) + num(v.savings);
      assert(Math.abs(total - 100) < 1e-9, `The three shares add up to ${round(total, 2)}%. They must total 100%.`);
      return {
        results: [
          { label: 'Needs', value: round((inc * num(v.needs)) / 100, 2), money: true },
          { label: 'Wants', value: round((inc * num(v.wants)) / 100, 2), money: true },
          { label: 'Savings and debt repayment', value: round((inc * num(v.savings)) / 100, 2), money: true, primary: true },
          { label: 'Yearly savings', value: round((inc * num(v.savings) * 12) / 100, 2), money: true },
        ],
      };
    },
    formula: 'Category amount = Monthly income × Share ÷ 100',
    intro: [
      'The 50/30/20 rule is a simple starting point: half of after-tax income goes to needs such as rent, groceries, and insurance, 30% to wants, and 20% to savings and extra debt payments.',
      'It is a guideline, not a law. In high-cost cities, needs often take more than half, so adjust the shares to match your situation.',
    ],
    example: 'With 4,000 of monthly take-home pay, the 50/30/20 split gives 2,000 for needs, 1,200 for wants, and 800 for savings.',
    related: ['savings-goal-calculator', 'debt-payoff-calculator', 'savings-calculator'],
    articles: ['the-50-30-20-budget-rule'],
    status: 'published',
    tests: [
      { name: 'default', inputs: { income: 4000, needs: 50, wants: 30, savings: 20 }, expect: { Needs: 2000, Wants: 1200, 'Savings and debt repayment': 800 } },
      { name: 'bad total', inputs: { income: 4000, needs: 50, wants: 30, savings: 30 }, throws: true },
    ],
  },
  {
    id: 'unit-price',
    name: 'Unit Price Calculator',
    slug: 'unit-price-calculator',
    category: 'everyday',
    short: 'Compare two products by price per unit to see which is the better deal.',
    aliases: ['price per unit', 'better buy calculator', 'compare prices'],
    tags: ['shopping', 'grocery', 'compare'],
    inputs: [
      { key: 'p1', label: 'Product A price', type: 'number', default: 3.49, min: 0, step: 'any' },
      { key: 'q1', label: 'Product A quantity', type: 'number', default: 500, min: 0, step: 'any', help: 'Any unit (grams, ounces, items), as long as both products use the same one.' },
      { key: 'p2', label: 'Product B price', type: 'number', default: 5.99, min: 0, step: 'any' },
      { key: 'q2', label: 'Product B quantity', type: 'number', default: 1000, min: 0, step: 'any' },
    ],
    compute: (v) => {
      const q1 = num(v.q1), q2 = num(v.q2);
      assert(q1 > 0 && q2 > 0, 'Quantities must be greater than zero.');
      const u1 = num(v.p1) / q1, u2 = num(v.p2) / q2;
      const better = u1 === u2 ? 'Same unit price' : u1 < u2 ? 'Product A' : 'Product B';
      const saving = u1 === u2 ? 0 : (Math.abs(u1 - u2) / Math.max(u1, u2)) * 100;
      return {
        results: [
          { label: 'Better value', value: better, primary: true },
          { label: 'Product A per unit', value: u1, decimals: 4 },
          { label: 'Product B per unit', value: u2, decimals: 4 },
          { label: 'Cheaper per unit by', value: round(saving, 2), unit: '%' },
        ],
      };
    },
    formula: 'Unit price = Price ÷ Quantity',
    intro: ['Stores often price larger packs as if they were cheaper. Dividing price by quantity shows the real cost per gram, ounce, or item so you can compare fairly.'],
    example: 'A 500 g pack at 3.49 costs 0.0070 per gram. A 1000 g pack at 5.99 costs 0.0060 per gram, so the larger pack is about 14% cheaper per gram.',
    related: ['discount-calculator', 'percentage-calculator', 'budget-calculator'],
    status: 'published',
    tests: [
      { name: 'B cheaper', inputs: { p1: 3.49, q1: 500, p2: 5.99, q2: 1000 }, expect: { 'Better value': 'Product B', 'Product A per unit': 0.00698 }, tolerance: 0.00001 },
      { name: 'zero qty', inputs: { p1: 1, q1: 0, p2: 1, q2: 1 }, throws: true },
    ],
  },
];
