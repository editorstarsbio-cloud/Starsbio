import { CalculatorDef } from '../lib/calc/types';
import { num, assert } from '../lib/calc/helpers';

export const biologyAgricultureCalculators: CalculatorDef[] = [
  {
    id: 'population-growth',
    name: 'Population Growth Calculator',
    slug: 'population-growth',
    category: 'biology-agriculture',
    short: 'Calculate population growth over time.',
    inputs: [
      { key: 'initial', label: 'Initial Population', type: 'number', default: 100, min: 0 },
      { key: 'rate', label: 'Growth Rate', type: 'number', default: 5, unit: '%' },
      { key: 'time', label: 'Time (periods)', type: 'number', default: 10, min: 0 }
    ],
    compute: (values) => {
      const P0 = num(values.initial);
      const r = num(values.rate) / 100;
      const t = num(values.time);
      assert(P0 >= 0, 'Initial population cannot be negative.');
      assert(t >= 0, 'Time cannot be negative.');
      const final = P0 * Math.pow(1 + r, t);
      return {
        results: [{ label: 'Final Population', value: Math.round(final) }]
      };
    },
    formula: 'P = P0 * (1 + r)^t',
    intro: [
      'This calculator helps estimate the future size of a population given a constant growth rate.',
      'It uses the standard discrete exponential growth formula which is commonly used in population biology.'
    ],
    howTo: [
      'Enter the initial population size.',
      'Enter the expected growth rate per period as a percentage.',
      'Enter the number of periods (e.g. years, days).'
    ],
    status: 'published',
    tests: [ { name: 'default', inputs: { initial: 100, rate: 5, time: 10 }, expect: { 'Final Population': 163 } }, { name: 'test 2', inputs: { initial: 100, rate: 5, time: 10 }, expect: { 'Final Population': 163 } } ]
  },
  {
    id: 'doubling-time',
    name: 'Doubling Time Calculator',
    slug: 'doubling-time',
    category: 'biology-agriculture',
    short: 'Calculate the time required for a population to double in size.',
    inputs: [
      { key: 'rate', label: 'Growth Rate', type: 'number', default: 5, unit: '%' }
    ],
    compute: (values) => {
      const r = num(values.rate) / 100;
      assert(r > 0, 'Growth rate must be greater than zero to double.');
      const time = Math.log(2) / Math.log(1 + r);
      return {
        results: [{ label: 'Doubling Time', value: time, unit: 'periods' }]
      };
    },
    formula: 't = ln(2) / ln(1 + r)',
    intro: [
      'Doubling time is the amount of time it takes for a given quantity to double in size or value at a constant growth rate.',
      'It is widely used in population biology, demographics, and finance to understand exponential growth.'
    ],
    howTo: ['Enter the expected percentage growth rate per period.'],
    status: 'published',
    tests: [ { name: 'default', inputs: { rate: 5 }, expect: { 'Doubling Time': 14.21 }, tolerance: 0.05 }, { name: 'test 2', inputs: { rate: 5 }, expect: { 'Doubling Time': 14.21 }, tolerance: 0.05 } ]
  },
  {
    id: 'plant-spacing',
    name: 'Plant Spacing Calculator',
    slug: 'plant-spacing',
    category: 'biology-agriculture',
    short: 'Estimate the number of plants that can fit in a specific field area.',
    inputs: [
      { key: 'areaLength', label: 'Field Length', type: 'number', default: 100, unit: 'm', min: 0 },
      { key: 'areaWidth', label: 'Field Width', type: 'number', default: 50, unit: 'm', min: 0 },
      { key: 'rowSpacing', label: 'Distance between rows', type: 'number', default: 1, unit: 'm', min: 0.01 },
      { key: 'plantSpacing', label: 'Distance between plants', type: 'number', default: 0.5, unit: 'm', min: 0.01 }
    ],
    compute: (values) => {
      const L = num(values.areaLength);
      const W = num(values.areaWidth);
      const rs = num(values.rowSpacing);
      const ps = num(values.plantSpacing);
      assert(L >= 0 && W >= 0, 'Dimensions cannot be negative.');
      assert(rs > 0 && ps > 0, 'Spacing must be greater than zero.');
      const rows = Math.floor(W / rs);
      const plantsPerRow = Math.floor(L / ps);
      const total = rows * plantsPerRow;
      return {
        results: [
          { label: 'Total Plants', value: total, decimals: 0 },
          { label: 'Number of Rows', value: rows, decimals: 0 },
          { label: 'Plants per Row', value: plantsPerRow, decimals: 0 }
        ]
      };
    },
    formula: 'Total Plants = floor(Width / Row Spacing) * floor(Length / Plant Spacing)',
    intro: [
      'This calculator helps farmers and gardeners determine how many plants can fit in a rectangular field.',
      'It accounts for both the spacing between rows and the spacing between individual plants in a row.'
    ],
    howTo: [
      'Enter the length and width of your field in meters.',
      'Enter the recommended spacing between rows.',
      'Enter the spacing between individual plants.'
    ],
    status: 'published',
    tests: [ { name: 'default', inputs: { areaLength: 100, areaWidth: 50, rowSpacing: 1, plantSpacing: 0.5 }, expect: { 'Total Plants': 10000, 'Number of Rows': 50, 'Plants per Row': 200 } }, { name: 'test 2', inputs: { areaLength: 100, areaWidth: 50, rowSpacing: 1, plantSpacing: 0.5 }, expect: { 'Total Plants': 10000, 'Number of Rows': 50, 'Plants per Row': 200 } } ]
  },
  {
    id: 'seed-rate',
    name: 'Seed Rate Calculator',
    slug: 'seed-rate',
    category: 'biology-agriculture',
    short: 'Calculate the total amount of seeds needed for planting an area.',
    inputs: [
      { key: 'area', label: 'Planting Area', type: 'number', default: 1, unit: 'hectares', min: 0 },
      { key: 'rate', label: 'Seed Rate', type: 'number', default: 20, unit: 'kg/ha', min: 0 }
    ],
    compute: (values) => {
      const area = num(values.area);
      const rate = num(values.rate);
      assert(area >= 0, 'Area cannot be negative.');
      assert(rate >= 0, 'Seed rate cannot be negative.');
      const total = area * rate;
      return {
        results: [{ label: 'Total Seeds Required', value: total, unit: 'kg' }]
      };
    },
    formula: 'Total Seeds = Area * Seed Rate',
    intro: [
      'The seed rate calculator determines the total weight of seeds required to plant a given area.',
      'It uses the standard sowing rate recommended for the specific crop and field size.'
    ],
    howTo: [
      'Enter the total area to be planted in hectares.',
      'Enter the recommended seed rate in kilograms per hectare.'
    ],
    status: 'published',
    tests: [ { name: 'default', inputs: { area: 1, rate: 20 }, expect: { 'Total Seeds Required': 20 } }, { name: 'test 2', inputs: { area: 1, rate: 20 }, expect: { 'Total Seeds Required': 20 } } ]
  },
  {
    id: 'fertilizer',
    name: 'Fertilizer Calculator',
    slug: 'fertilizer',
    category: 'biology-agriculture',
    short: 'Determine the exact amount of fertilizer needed for your crop.',
    inputs: [
      { key: 'area', label: 'Field Area', type: 'number', default: 1, unit: 'hectares', min: 0 },
      { key: 'requirement', label: 'Nutrient Requirement', type: 'number', default: 100, unit: 'kg/ha', min: 0 },
      { key: 'grade', label: 'Fertilizer Grade', type: 'number', default: 46, unit: '%', min: 0.1, max: 100 }
    ],
    compute: (values) => {
      const area = num(values.area);
      const req = num(values.requirement);
      const grade = num(values.grade) / 100;
      assert(area >= 0 && req >= 0, 'Area and requirement cannot be negative.');
      assert(grade > 0 && grade <= 1, 'Fertilizer grade must be between 0.1% and 100%.');
      const totalNutrient = area * req;
      const totalFertilizer = totalNutrient / grade;
      return {
        results: [
          { label: 'Total Fertilizer Required', value: totalFertilizer, unit: 'kg' },
          { label: 'Total Nutrient Applied', value: totalNutrient, unit: 'kg' }
        ]
      };
    },
    formula: 'Total Fertilizer = (Area * Nutrient Requirement) / (Fertilizer Grade / 100)',
    intro: [
      'This calculator helps calculate the total amount of a specific fertilizer product required to meet a crops nutrient needs.',
      'It is particularly useful when applying single-nutrient fertilizers like Urea or Potash.'
    ],
    howTo: [
      'Enter your field area in hectares.',
      'Enter the recommended nutrient rate (e.g. Nitrogen) in kg/ha.',
      'Enter the percentage of that nutrient in the fertilizer you are using (e.g. 46% for Urea).'
    ],
    status: 'published',
    tests: [ { name: 'default', inputs: { area: 1, requirement: 100, grade: 46 }, expect: { 'Total Fertilizer Required': 217.39 }, tolerance: 0.05 }, { name: 'test 2', inputs: { area: 1, requirement: 100, grade: 46 }, expect: { 'Total Fertilizer Required': 217.39 }, tolerance: 0.05 } ]
  }
];
