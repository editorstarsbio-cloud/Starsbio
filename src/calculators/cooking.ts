import type { CalculatorDef, CalcValues, CalcOutput } from '../lib/calc/types';
import { round, assert, num } from '../lib/calc/helpers';

export const cookingCalculators: CalculatorDef[] = [
  {
    id: 'recipe-scaling',
    name: 'Recipe Scaling',
    slug: 'recipe-scaling',
    category: 'cooking',
    short: 'Scale recipes up or down for serving sizes.',
    inputs: [
      { key: 'original', type: 'number', label: 'Original Yield (Servings)', default: 4 },
      { key: 'target', type: 'number', label: 'Target Yield (Servings)', default: 8 },
      { key: 'amount', type: 'number', label: 'Ingredient Amount', default: 100 }
    ],
    compute: (v: CalcValues): CalcOutput => {
      const o = num(v.original);
      const t = num(v.target);
      const a = num(v.amount);
      assert(o > 0, 'Original yield must be positive.');
      const factor = t / o;
      return {
        results: [
          { label: 'Conversion Factor', value: round(factor, 2) },
          { label: 'New Amount', value: round(a * factor, 2), primary: true }
        ]
      };
    },
    formula: 'New Amount = Ingredient Amount * (Target Yield / Original Yield)',
    intro: ['Easily scale ingredient amounts for a different number of servings.'],
    status: 'tested',
    tests: [
      { name: 'Double', inputs: { original: 4, target: 8, amount: 100 }, expect: { 'Conversion Factor': 2.0, 'New Amount': 200 } },
      { name: 'Half', inputs: { original: 4, target: 2, amount: 100 }, expect: { 'Conversion Factor': 0.5, 'New Amount': 50 } }
    ]
  },
  {
    id: 'ingredient-per-serving',
    name: 'Ingredient Per Serving',
    slug: 'ingredient-per-serving',
    category: 'cooking',
    short: 'Calculate amount of ingredients per serving.',
    inputs: [
      { key: 'total', type: 'number', label: 'Total Amount', default: 500 },
      { key: 'servings', type: 'number', label: 'Servings', default: 4 }
    ],
    compute: (v) => {
      const t = num(v.total);
      const s = num(v.servings);
      assert(s > 0, 'Servings must be positive.');
      return { results: [{ label: 'Amount Per Serving', value: round(t / s, 2), primary: true }] };
    },
    formula: 'Amount Per Serving = Total Amount / Servings',
    intro: ['Find out how much of an ingredient goes into each serving.'],
    status: 'tested',
    tests: [
      { name: 'Test 1', inputs: { total: 500, servings: 4 }, expect: { 'Amount Per Serving': 125 } },
      { name: 'Test 2', inputs: { total: 100, servings: 3 }, expect: { 'Amount Per Serving': 33.33 } }
    ]
  },
  {
    id: 'baker-percentage',
    name: 'Baker\'s Percentage',
    slug: 'baker-percentage',
    category: 'cooking',
    short: 'Calculate baker\'s percentages for recipes.',
    inputs: [
      { key: 'flour', type: 'number', label: 'Flour Weight', unit: 'g', default: 1000 },
      { key: 'ingredient', type: 'number', label: 'Ingredient Weight', unit: 'g', default: 700 }
    ],
    compute: (v) => {
      const f = num(v.flour);
      const i = num(v.ingredient);
      assert(f > 0, 'Flour weight must be positive.');
      return { results: [{ label: 'Baker\'s Percentage', value: round((i / f) * 100, 1), unit: '%', primary: true }] };
    },
    formula: 'Percentage = (Ingredient Weight / Total Flour Weight) * 100',
    intro: ['Calculate baker\'s percentages for bread making.'],
    status: 'tested',
    tests: [
      { name: 'Water', inputs: { flour: 1000, ingredient: 700 }, expect: { 'Baker\'s Percentage': 70.0 } },
      { name: 'Salt', inputs: { flour: 500, ingredient: 10 }, expect: { 'Baker\'s Percentage': 2.0 } }
    ]
  },
  {
    id: 'coffee-ratio',
    name: 'Coffee to Water Ratio',
    slug: 'coffee-ratio',
    category: 'cooking',
    short: 'Calculate coffee to water ratios.',
    inputs: [
      { key: 'ratio', type: 'number', label: 'Ratio (1:X)', default: 15 },
      { key: 'known', type: 'select', label: 'I know the...', options: [{label:'Coffee Weight',value:'c'},{label:'Water Weight',value:'w'}], default: 'c' },
      { key: 'amount', type: 'number', label: 'Amount', unit: 'g', default: 20 }
    ],
    compute: (v) => {
      const r = num(v.ratio);
      const k = String(v.known);
      const a = num(v.amount);
      assert(r > 0 && a > 0, 'Values must be positive.');
      if (k === 'c') {
        return { results: [{ label: 'Water Needed', value: round(a * r, 0), unit: 'g', primary: true }] };
      } else {
        return { results: [{ label: 'Coffee Needed', value: round(a / r, 1), unit: 'g', primary: true }] };
      }
    },
    formula: 'Water = Coffee * Ratio',
    intro: ['Find the perfect coffee to water ratio for brewing.'],
    status: 'tested',
    tests: [
      { name: 'Given coffee', inputs: { ratio: 15, known: 'c', amount: 20 }, expect: { 'Water Needed': 300 } },
      { name: 'Given water', inputs: { ratio: 16, known: 'w', amount: 480 }, expect: { 'Coffee Needed': 30.0 } }
    ]
  },
  {
    id: 'rice-water-ratio',
    name: 'Rice Water Ratio',
    slug: 'rice-water-ratio',
    category: 'cooking',
    short: 'Calculate the water needed for cooking rice.',
    inputs: [
      { key: 'riceType', type: 'select', label: 'Rice Type', options: [
        {label: 'White Rice (1:1.5)', value: '1.5'},
        {label: 'Brown Rice (1:2)', value: '2'},
        {label: 'Basmati (1:1.5)', value: '1.5'}
      ], default: '1.5' },
      { key: 'riceVolume', type: 'number', label: 'Rice Amount (Cups)', default: 2 }
    ],
    compute: (v) => {
      const r = num(v.riceType);
      const vR = num(v.riceVolume);
      assert(vR > 0, 'Rice amount must be positive.');
      return { results: [{ label: 'Water Needed', value: round(vR * r, 2), unit: 'Cups', primary: true }] };
    },
    formula: 'Water = Rice * Ratio',
    intro: ['Calculate how much water to use for different types of rice.'],
    status: 'tested',
    tests: [
      { name: 'White', inputs: { riceType: '1.5', riceVolume: 2 }, expect: { 'Water Needed': 3.0 } },
      { name: 'Brown', inputs: { riceType: '2', riceVolume: 1.5 }, expect: { 'Water Needed': 3.0 } }
    ]
  },
  {
    id: 'meal-portion',
    name: 'Meal Portion Calculator',
    slug: 'meal-portion',
    category: 'cooking',
    short: 'Divide meals into portions by weight.',
    inputs: [
      { key: 'totalWeight', type: 'number', label: 'Total Weight', unit: 'g', default: 1000 },
      { key: 'portions', type: 'number', label: 'Number of Portions', default: 4 }
    ],
    compute: (v) => {
      const w = num(v.totalWeight);
      const p = num(v.portions);
      assert(p > 0, 'Portions must be positive.');
      return { results: [{ label: 'Weight per Portion', value: round(w / p, 0), unit: 'g', primary: true }] };
    },
    formula: 'Portion Size = Total Weight / Number of Portions',
    intro: ['Divide a large batch of food into equal portions by weight.'],
    status: 'tested',
    tests: [
      { name: 'Test 1', inputs: { totalWeight: 1000, portions: 4 }, expect: { 'Weight per Portion': 250 } },
      { name: 'Test 2', inputs: { totalWeight: 1500, portions: 6 }, expect: { 'Weight per Portion': 250 } }
    ]
  },
  {
    id: 'turkey-roasting-time',
    name: 'Turkey Roasting Time',
    slug: 'turkey-roasting-time',
    category: 'cooking',
    short: 'Estimate roasting time for a whole turkey.',
    inputs: [
      { key: 'weight', type: 'number', label: 'Turkey Weight', unit: 'kg', default: 5 },
      { key: 'stuffed', type: 'select', label: 'Stuffed?', options: [{label:'Yes',value:'y'},{label:'No',value:'n'}], default: 'n' }
    ],
    compute: (v) => {
      const w = num(v.weight);
      const s = String(v.stuffed);
      assert(w > 0, 'Weight must be positive.');
      // Rough estimate: Unstuffed ~40 mins/kg, Stuffed ~45 mins/kg at 180C
      const minsPerKg = s === 'y' ? 45 : 40;
      const totalMins = w * minsPerKg;
      const hours = Math.floor(totalMins / 60);
      const mins = Math.round(totalMins % 60);
      return { results: [{ label: 'Estimated Cooking Time', value: `${hours}h ${mins}m`, primary: true }] };
    },
    formula: 'Cooking Time = Weight * (40 mins/kg unstuffed, or 45 mins/kg stuffed)',
    intro: ['Estimate how long to roast a turkey.'],
    status: 'tested',
    tests: [
      { name: 'Unstuffed', inputs: { weight: 5, stuffed: 'n' }, expect: { 'Estimated Cooking Time': '3h 20m' } },
      { name: 'Stuffed', inputs: { weight: 5, stuffed: 'y' }, expect: { 'Estimated Cooking Time': '3h 45m' } }
    ]
  }
];
