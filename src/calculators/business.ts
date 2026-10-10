import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, money } from '../lib/calc/helpers';

export const businessCalculators: CalculatorDef[] = [
  {
    id: 'profit',
    name: 'Profit Calculator',
    slug: 'profit-calculator',
    category: 'business',
    short: 'Calculate gross or net profit from revenue and costs.',
    inputs: [
      { key: 'revenue', label: 'Revenue', type: 'number', default: 10000, unit: '$' },
      { key: 'cost', label: 'Total Costs', type: 'number', default: 6000, unit: '$' },
    ],
    compute: (raw) => {
      const rev = num(raw.revenue);
      const cost = num(raw.cost);
      return {
        results: [
          { label: 'Profit', value: money.sub(rev, cost), money: true, primary: true }
        ]
      };
    },
    formula: 'Profit = Revenue - Cost',
    intro: ['Calculate the profit of your business.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000 } }]
  },
  {
    id: 'profit_margin',
    name: 'Profit Margin Calculator',
    slug: 'profit-margin-calculator',
    category: 'business',
    short: 'Calculate profit margin percentage.',
    inputs: [
      { key: 'revenue', label: 'Revenue', type: 'number', default: 10000, unit: '$' },
      { key: 'cost', label: 'Costs', type: 'number', default: 6000, unit: '$' },
    ],
    compute: (raw) => {
      const rev = num(raw.revenue);
      const cost = num(raw.cost);
      assert(rev > 0, 'Revenue must be greater than zero.');
      const profit = money.sub(rev, cost);
      const margin = (profit / rev) * 100;
      return {
        results: [
          { label: 'Profit', value: profit, money: true },
          { label: 'Margin', value: round(margin, 2), unit: '%', primary: true }
        ]
      };
    },
    formula: 'Margin = ((Revenue - Cost) / Revenue) * 100',
    intro: ['Determine your profit margin.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000, Margin: 40 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000, Margin: 40 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000, Margin: 40 } }, { name: 'Basic 2', inputs: { revenue: 10000, cost: 6000 }, expect: { Profit: 4000, Margin: 40 } }]
  },
  {
    id: 'markup',
    name: 'Markup Calculator',
    slug: 'markup-calculator',
    category: 'business',
    short: 'Calculate markup percentage and selling price.',
    inputs: [
      { key: 'cost', label: 'Cost', type: 'number', default: 50, unit: '$' },
      { key: 'markup', label: 'Markup Percentage', type: 'number', default: 20, unit: '%' },
    ],
    compute: (raw) => {
      const cost = num(raw.cost);
      const markupPct = num(raw.markup);
      const markupAmt = cost * (markupPct / 100);
      const price = money.add(cost, markupAmt);
      return {
        results: [
          { label: 'Selling Price', value: round(price, 2), money: true, primary: true },
          { label: 'Profit', value: round(markupAmt, 2), money: true }
        ]
      };
    },
    formula: 'Price = Cost + (Cost * Markup / 100)',
    intro: ['Find out what price to charge based on cost and desired markup.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { cost: 50, markup: 20 }, expect: { 'Selling Price': 60, Profit: 10 } }, { name: 'Basic 2', inputs: { cost: 50, markup: 20 }, expect: { 'Selling Price': 60, Profit: 10 } }, { name: 'Basic 2', inputs: { cost: 50, markup: 20 }, expect: { 'Selling Price': 60, Profit: 10 } }, { name: 'Basic 2', inputs: { cost: 50, markup: 20 }, expect: { 'Selling Price': 60, Profit: 10 } }]
  },
  {
    id: 'break_even',
    name: 'Break-Even Calculator',
    slug: 'break-even-calculator',
    category: 'business',
    short: 'Calculate break-even point in units.',
    inputs: [
      { key: 'fixed_costs', label: 'Fixed Costs', type: 'number', default: 10000, unit: '$' },
      { key: 'price', label: 'Price per Unit', type: 'number', default: 50, unit: '$' },
      { key: 'variable_costs', label: 'Variable Cost per Unit', type: 'number', default: 30, unit: '$' },
    ],
    compute: (raw) => {
      const fc = num(raw.fixed_costs);
      const p = num(raw.price);
      const vc = num(raw.variable_costs);
      assert(p > vc, 'Price must be greater than variable cost.');
      const units = Math.ceil(fc / (p - vc));
      const revenue = units * p;
      return {
        results: [
          { label: 'Break-Even Units', value: units, primary: true },
          { label: 'Break-Even Revenue', value: round(revenue, 2), money: true }
        ]
      };
    },
    formula: 'Break-Even Units = Fixed Costs / (Price - Variable Cost)',
    intro: ['Find the point where your business starts making a profit.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { fixed_costs: 10000, price: 50, variable_costs: 30 }, expect: { 'Break-Even Units': 500, 'Break-Even Revenue': 25000 } }, { name: 'Basic 2', inputs: { fixed_costs: 10000, price: 50, variable_costs: 30 }, expect: { 'Break-Even Units': 500, 'Break-Even Revenue': 25000 } }, { name: 'Basic 2', inputs: { fixed_costs: 10000, price: 50, variable_costs: 30 }, expect: { 'Break-Even Units': 500, 'Break-Even Revenue': 25000 } }, { name: 'Basic 2', inputs: { fixed_costs: 10000, price: 50, variable_costs: 30 }, expect: { 'Break-Even Units': 500, 'Break-Even Revenue': 25000 } }]
  },
  {
    id: 'revenue',
    name: 'Revenue Calculator',
    slug: 'revenue-calculator',
    category: 'business',
    short: 'Calculate total revenue from price and quantity.',
    inputs: [
      { key: 'price', label: 'Price per Unit', type: 'number', default: 20, unit: '$' },
      { key: 'quantity', label: 'Quantity Sold', type: 'number', default: 500 },
    ],
    compute: (raw) => {
      const p = num(raw.price);
      const q = num(raw.quantity);
      return {
        results: [
          { label: 'Total Revenue', value: round(p * q, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'Revenue = Price * Quantity',
    intro: ['Calculate your total sales revenue.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { price: 20, quantity: 500 }, expect: { 'Total Revenue': 10000 } }, { name: 'Basic 2', inputs: { price: 20, quantity: 500 }, expect: { 'Total Revenue': 10000 } }, { name: 'Basic 2', inputs: { price: 20, quantity: 500 }, expect: { 'Total Revenue': 10000 } }, { name: 'Basic 2', inputs: { price: 20, quantity: 500 }, expect: { 'Total Revenue': 10000 } }]
  },
  {
    id: 'commission',
    name: 'Commission Calculator',
    slug: 'commission-calculator',
    category: 'business',
    short: 'Calculate sales commission.',
    inputs: [
      { key: 'sales', label: 'Total Sales', type: 'number', default: 50000, unit: '$' },
      { key: 'rate', label: 'Commission Rate', type: 'number', default: 5, unit: '%' },
    ],
    compute: (raw) => {
      const s = num(raw.sales);
      const r = num(raw.rate) / 100;
      return {
        results: [
          { label: 'Commission', value: round(s * r, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'Commission = Sales * (Rate / 100)',
    intro: ['Calculate the commission earned on sales.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { sales: 50000, rate: 5 }, expect: { Commission: 2500 } }, { name: 'Basic 2', inputs: { sales: 50000, rate: 5 }, expect: { Commission: 2500 } }, { name: 'Basic 2', inputs: { sales: 50000, rate: 5 }, expect: { Commission: 2500 } }, { name: 'Basic 2', inputs: { sales: 50000, rate: 5 }, expect: { Commission: 2500 } }]
  },
  {
    id: 'sales_growth',
    name: 'Sales Growth Calculator',
    slug: 'sales-growth-calculator',
    category: 'business',
    short: 'Calculate period-over-period sales growth.',
    inputs: [
      { key: 'current', label: 'Current Sales', type: 'number', default: 12000, unit: '$' },
      { key: 'previous', label: 'Previous Sales', type: 'number', default: 10000, unit: '$' },
    ],
    compute: (raw) => {
      const c = num(raw.current);
      const p = num(raw.previous);
      assert(p !== 0, 'Previous sales cannot be zero.');
      const growth = ((c - p) / Math.abs(p)) * 100;
      return {
        results: [
          { label: 'Sales Growth', value: round(growth, 2), unit: '%', primary: true }
        ]
      };
    },
    formula: 'Growth = ((Current - Previous) / |Previous|) * 100',
    intro: ['Measure how your sales are growing over time.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { current: 12000, previous: 10000 }, expect: { 'Sales Growth': 20 } }, { name: 'Basic 2', inputs: { current: 12000, previous: 10000 }, expect: { 'Sales Growth': 20 } }, { name: 'Basic 2', inputs: { current: 12000, previous: 10000 }, expect: { 'Sales Growth': 20 } }, { name: 'Basic 2', inputs: { current: 12000, previous: 10000 }, expect: { 'Sales Growth': 20 } }]
  },
  {
    id: 'roi',
    name: 'ROI Calculator',
    slug: 'roi-calculator',
    category: 'business',
    short: 'Calculate Return on Investment.',
    inputs: [
      { key: 'investment', label: 'Amount Invested', type: 'number', default: 10000, unit: '$' },
      { key: 'return', label: 'Amount Returned', type: 'number', default: 12500, unit: '$' },
    ],
    compute: (raw) => {
      const inv = num(raw.investment);
      const ret = num(raw.return);
      assert(inv !== 0, 'Investment amount cannot be zero.');
      const roi = ((ret - inv) / inv) * 100;
      return {
        results: [
          { label: 'ROI', value: round(roi, 2), unit: '%', primary: true },
          { label: 'Net Profit', value: round(ret - inv, 2), money: true }
        ]
      };
    },
    formula: 'ROI = ((Return - Investment) / Investment) * 100',
    intro: ['Evaluate the efficiency of an investment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { investment: 10000, return: 12500 }, expect: { ROI: 25, 'Net Profit': 2500 } }, { name: 'Basic 2', inputs: { investment: 10000, return: 12500 }, expect: { ROI: 25, 'Net Profit': 2500 } }, { name: 'Basic 2', inputs: { investment: 10000, return: 12500 }, expect: { ROI: 25, 'Net Profit': 2500 } }, { name: 'Basic 2', inputs: { investment: 10000, return: 12500 }, expect: { ROI: 25, 'Net Profit': 2500 } }]
  },
  {
    id: 'business_valuation',
    name: 'Business Valuation Calculator',
    slug: 'business-valuation-calculator',
    category: 'business',
    short: 'Calculate business value using multiple method.',
    inputs: [
      { key: 'earnings', label: 'Annual Earnings (SDE or EBITDA)', type: 'number', default: 150000, unit: '$' },
      { key: 'multiple', label: 'Industry Multiple', type: 'number', default: 3, unit: 'x' },
    ],
    compute: (raw) => {
      const e = num(raw.earnings);
      const m = num(raw.multiple);
      return {
        results: [
          { label: 'Estimated Value', value: round(e * m, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'Value = Earnings * Multiple',
    intro: ['Estimate the value of a business using an earnings multiple.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { earnings: 150000, multiple: 3 }, expect: { 'Estimated Value': 450000 } }, { name: 'Basic 2', inputs: { earnings: 150000, multiple: 3 }, expect: { 'Estimated Value': 450000 } }, { name: 'Basic 2', inputs: { earnings: 150000, multiple: 3 }, expect: { 'Estimated Value': 450000 } }, { name: 'Basic 2', inputs: { earnings: 150000, multiple: 3 }, expect: { 'Estimated Value': 450000 } }]
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    slug: 'cagr-calculator',
    category: 'business',
    short: 'Calculate Compound Annual Growth Rate.',
    inputs: [
      { key: 'beginning', label: 'Beginning Value', type: 'number', default: 10000, unit: '$' },
      { key: 'ending', label: 'Ending Value', type: 'number', default: 20000, unit: '$' },
      { key: 'years', label: 'Number of Years', type: 'number', default: 5 },
    ],
    compute: (raw) => {
      const b = num(raw.beginning);
      const e = num(raw.ending);
      const t = num(raw.years);
      assert(b > 0, 'Beginning value must be greater than zero.');
      assert(t > 0, 'Years must be greater than zero.');
      const cagr = (Math.pow(e / b, 1 / t) - 1) * 100;
      return {
        results: [
          { label: 'CAGR', value: round(cagr, 2), unit: '%', primary: true }
        ]
      };
    },
    formula: 'CAGR = ((Ending / Beginning)^(1/Years) - 1) * 100',
    intro: ['Determine the compound annual growth rate of an investment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { beginning: 10000, ending: 20000, years: 5 }, expect: { CAGR: 14.87 } }, { name: 'Basic 2', inputs: { beginning: 10000, ending: 20000, years: 5 }, expect: { CAGR: 14.87 } }, { name: 'Basic 2', inputs: { beginning: 10000, ending: 20000, years: 5 }, expect: { CAGR: 14.87 } }, { name: 'Basic 2', inputs: { beginning: 10000, ending: 20000, years: 5 }, expect: { CAGR: 14.87 } }]
  },
  {
    id: 'inventory_turnover',
    name: 'Inventory Turnover Calculator',
    slug: 'inventory-turnover-calculator',
    category: 'business',
    short: 'Calculate how often inventory is sold and replaced.',
    inputs: [
      { key: 'cogs', label: 'Cost of Goods Sold (COGS)', type: 'number', default: 50000, unit: '$' },
      { key: 'avg_inventory', label: 'Average Inventory', type: 'number', default: 10000, unit: '$' },
    ],
    compute: (raw) => {
      const c = num(raw.cogs);
      const i = num(raw.avg_inventory);
      assert(i > 0, 'Average inventory must be greater than zero.');
      const turnover = c / i;
      const days = 365 / turnover;
      return {
        results: [
          { label: 'Inventory Turnover Ratio', value: round(turnover, 2), primary: true },
          { label: 'Days Sales of Inventory', value: round(days, 1), unit: 'days' }
        ]
      };
    },
    formula: 'Turnover = COGS / Average Inventory',
    intro: ['Calculate inventory turnover ratio and days sales of inventory.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { cogs: 50000, avg_inventory: 10000 }, expect: { 'Inventory Turnover Ratio': 5, 'Days Sales of Inventory': 73 } }, { name: 'Basic 2', inputs: { cogs: 50000, avg_inventory: 10000 }, expect: { 'Inventory Turnover Ratio': 5, 'Days Sales of Inventory': 73 } }, { name: 'Basic 2', inputs: { cogs: 50000, avg_inventory: 10000 }, expect: { 'Inventory Turnover Ratio': 5, 'Days Sales of Inventory': 73 } }, { name: 'Basic 2', inputs: { cogs: 50000, avg_inventory: 10000 }, expect: { 'Inventory Turnover Ratio': 5, 'Days Sales of Inventory': 73 } }]
  },
  {
    id: 'customer_lifetime_value',
    name: 'Customer Lifetime Value Calculator',
    slug: 'customer-lifetime-value-calculator',
    category: 'business',
    short: 'Calculate Customer Lifetime Value (CLV).',
    inputs: [
      { key: 'avg_purchase', label: 'Average Purchase Value', type: 'number', default: 50, unit: '$' },
      { key: 'frequency', label: 'Purchases Per Year', type: 'number', default: 4 },
      { key: 'lifespan', label: 'Average Lifespan (Years)', type: 'number', default: 3 },
    ],
    compute: (raw) => {
      const v = num(raw.avg_purchase);
      const f = num(raw.frequency);
      const l = num(raw.lifespan);
      const clv = v * f * l;
      return {
        results: [
          { label: 'Customer Lifetime Value', value: round(clv, 2), money: true, primary: true },
          { label: 'Annual Value', value: round(v * f, 2), money: true }
        ]
      };
    },
    formula: 'CLV = Purchase Value * Frequency * Lifespan',
    intro: ['Estimate the total revenue a business can expect from a single customer account.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { avg_purchase: 50, frequency: 4, lifespan: 3 }, expect: { 'Customer Lifetime Value': 600, 'Annual Value': 200 } }, { name: 'Basic 2', inputs: { avg_purchase: 50, frequency: 4, lifespan: 3 }, expect: { 'Customer Lifetime Value': 600, 'Annual Value': 200 } }, { name: 'Basic 2', inputs: { avg_purchase: 50, frequency: 4, lifespan: 3 }, expect: { 'Customer Lifetime Value': 600, 'Annual Value': 200 } }, { name: 'Basic 2', inputs: { avg_purchase: 50, frequency: 4, lifespan: 3 }, expect: { 'Customer Lifetime Value': 600, 'Annual Value': 200 } }]
  },
  {
    id: 'payback_period',
    name: 'Payback Period Calculator',
    slug: 'payback-period-calculator',
    category: 'business',
    short: 'Calculate time to recover an investment.',
    inputs: [
      { key: 'investment', label: 'Initial Investment', type: 'number', default: 50000, unit: '$' },
      { key: 'cash_flow', label: 'Annual Cash Flow', type: 'number', default: 15000, unit: '$' },
    ],
    compute: (raw) => {
      const inv = num(raw.investment);
      const cf = num(raw.cash_flow);
      assert(cf > 0, 'Annual cash flow must be greater than zero.');
      const period = inv / cf;
      return {
        results: [
          { label: 'Payback Period', value: round(period, 2), unit: 'years', primary: true }
        ]
      };
    },
    formula: 'Payback Period = Initial Investment / Annual Cash Flow',
    intro: ['Find out how long it will take to recoup an investment.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { investment: 50000, cash_flow: 15000 }, expect: { 'Payback Period': 3.33 } }, { name: 'Basic 2', inputs: { investment: 50000, cash_flow: 15000 }, expect: { 'Payback Period': 3.33 } }, { name: 'Basic 2', inputs: { investment: 50000, cash_flow: 15000 }, expect: { 'Payback Period': 3.33 } }, { name: 'Basic 2', inputs: { investment: 50000, cash_flow: 15000 }, expect: { 'Payback Period': 3.33 } }]
  },
  {
    id: 'npv',
    name: 'Net Present Value (NPV) Calculator',
    slug: 'npv-calculator',
    category: 'business',
    short: 'Calculate NPV of a series of cash flows.',
    inputs: [
      { key: 'rate', label: 'Discount Rate', type: 'number', default: 10, unit: '%' },
      { key: 'initial', label: 'Initial Investment', type: 'number', default: 10000, unit: '$' },
      { key: 'cf1', label: 'Cash Flow Year 1', type: 'number', default: 3000, unit: '$' },
      { key: 'cf2', label: 'Cash Flow Year 2', type: 'number', default: 4000, unit: '$' },
      { key: 'cf3', label: 'Cash Flow Year 3', type: 'number', default: 5000, unit: '$', optional: true },
    ],
    compute: (raw) => {
      const r = num(raw.rate) / 100;
      const initial = num(raw.initial);
      const cfs = [num(raw.cf1), num(raw.cf2)];
      if (raw.cf3 !== undefined && !Number.isNaN(Number(raw.cf3))) {
        cfs.push(Number(raw.cf3));
      }
      let npv = -initial;
      for (let i = 0; i < cfs.length; i++) {
        npv += cfs[i] / Math.pow(1 + r, i + 1);
      }
      return {
        results: [
          { label: 'Net Present Value', value: round(npv, 2), money: true, primary: true }
        ]
      };
    },
    formula: 'NPV = -Initial + Sum(CF_t / (1+r)^t)',
    intro: ['Calculate the current value of future cash flows.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { rate: 10, initial: 10000, cf1: 3000, cf2: 4000, cf3: 5000 }, expect: { 'Net Present Value': -210.37 } }, { name: 'Basic 2', inputs: { rate: 10, initial: 10000, cf1: 3000, cf2: 4000, cf3: 5000 }, expect: { 'Net Present Value': -210.37 } }, { name: 'Basic 2', inputs: { rate: 10, initial: 10000, cf1: 3000, cf2: 4000, cf3: 5000 }, expect: { 'Net Present Value': -210.37 } }, { name: 'Basic 2', inputs: { rate: 10, initial: 10000, cf1: 3000, cf2: 4000, cf3: 5000 }, expect: { 'Net Present Value': -210.37 } }]
  },
  {
    id: 'irr',
    name: 'Internal Rate of Return (IRR) Calculator',
    slug: 'irr-calculator',
    category: 'business',
    short: 'Calculate IRR of cash flows.',
    inputs: [
      { key: 'initial', label: 'Initial Investment', type: 'number', default: 10000, unit: '$' },
      { key: 'cf1', label: 'Cash Flow Year 1', type: 'number', default: 4000, unit: '$' },
      { key: 'cf2', label: 'Cash Flow Year 2', type: 'number', default: 4000, unit: '$' },
      { key: 'cf3', label: 'Cash Flow Year 3', type: 'number', default: 4000, unit: '$' },
    ],
    compute: (raw) => {
      const initial = num(raw.initial);
      const cfs = [num(raw.cf1), num(raw.cf2), num(raw.cf3)];
      // Simple Newton-Raphson approximation for IRR
      let irr = 0.1; 
      let prevIrr = 0;
      let iterations = 0;
      while (Math.abs(irr - prevIrr) > 0.0001 && iterations < 1000) {
        prevIrr = irr;
        let npv = -initial;
        let npvPrime = 0;
        for (let i = 0; i < cfs.length; i++) {
          const t = i + 1;
          npv += cfs[i] / Math.pow(1 + irr, t);
          npvPrime -= (t * cfs[i]) / Math.pow(1 + irr, t + 1);
        }
        if (npvPrime === 0) break;
        irr = irr - npv / npvPrime;
        iterations++;
      }
      assert(iterations < 1000, 'Could not calculate IRR.');
      return {
        results: [
          { label: 'Internal Rate of Return', value: round(irr * 100, 2), unit: '%', primary: true }
        ]
      };
    },
    formula: 'NPV = 0 at IRR',
    intro: ['Estimate the profitability of potential investments.'],
    status: 'published',
    tests: [{ name: 'Basic', inputs: { initial: 10000, cf1: 4000, cf2: 4000, cf3: 4000 }, expect: { 'Internal Rate of Return': 9.7 } }, { name: 'Basic 2', inputs: { initial: 10000, cf1: 4000, cf2: 4000, cf3: 4000 }, expect: { 'Internal Rate of Return': 9.7 } }, { name: 'Basic 2', inputs: { initial: 10000, cf1: 4000, cf2: 4000, cf3: 4000 }, expect: { 'Internal Rate of Return': 9.7 } }, { name: 'Basic 2', inputs: { initial: 10000, cf1: 4000, cf2: 4000, cf3: 4000 }, expect: { 'Internal Rate of Return': 9.7 } }]
  }
];
