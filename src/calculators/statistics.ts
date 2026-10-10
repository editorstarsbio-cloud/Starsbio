import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, list, sum, mean, median, variance, factorial, normalCdf, normalInv } from '../lib/calc/helpers';

export const statisticsCalculators: CalculatorDef[] = [
  {
    id: 'mean-median-mode',
    name: 'Mean, Median, Mode',
    slug: 'mean-median-mode',
    category: 'statistics',
    short: 'Calculate mean, median, and mode.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '1, 2, 3, 4, 4, 5' }
    ],
    compute: (raw) => {
      const nums = list(raw.nums);
      assert(nums.length > 0, 'Enter at least one number.');
      const m = mean(nums);
      const med = median(nums);
      
      const counts = new Map<number, number>();
      let maxCount = 0;
      nums.forEach(n => {
          counts.set(n, (counts.get(n) || 0) + 1);
          if (counts.get(n)! > maxCount) maxCount = counts.get(n)!;
      });
      const modes = Array.from(counts.entries()).filter(([k, v]) => v === maxCount).map(([k, v]) => k);
      const modeStr = modes.length === nums.length ? 'None' : modes.join(', ');

      return {
        results: [
          { label: 'Mean', value: round(m, 4), primary: true },
          { label: 'Median', value: round(med, 4) },
          { label: 'Mode', value: modeStr }
        ]
      };
    },
    formula: 'Mean = Sum / N',
    intro: ['Calculate the central tendency.'],
    status: 'published',
    tests: [
      { name: 'basic', inputs: { nums: [1, 2, 3, 4, 4, 5] }, expect: { Mean: 3.1667, Median: 3.5, Mode: '4' } },
      { name: 'no mode', inputs: { nums: [1, 2, 3] }, expect: { Mean: 2, Median: 2, Mode: 'None' } }
    ]
  },
  {
    id: 'weighted-average',
    name: 'Weighted Average',
    slug: 'weighted-average',
    category: 'statistics',
    short: 'Calculate average with weights.',
    inputs: [
      { key: 'vals', label: 'Values', type: 'list', default: '10, 20' },
      { key: 'weights', label: 'Weights', type: 'list', default: '1, 2' }
    ],
    compute: (raw) => {
      const vals = list(raw.vals);
      const w = list(raw.weights);
      assert(vals.length > 0 && vals.length === w.length, 'Values and weights must have the same length and not be empty.');
      let s = 0;
      let sw = 0;
      for (let i = 0; i < vals.length; i++) {
          s += vals[i] * w[i];
          sw += w[i];
      }
      assert(sw !== 0, 'Sum of weights cannot be zero.');
      return { results: [{ label: 'Weighted Average', value: round(s / sw, 4), primary: true }] };
    },
    formula: 'Sum(w*x) / Sum(w)',
    intro: ['Find weighted average.'],
    status: 'published',
    tests: [
      { name: 'test1', inputs: { vals: [10, 20], weights: [1, 2] }, expect: { 'Weighted Average': 16.6667 } },
      { name: 'test2', inputs: { vals: [10, 20], weights: [1, 1] }, expect: { 'Weighted Average': 15 } }
    ]
  },
  {
    id: 'standard-deviation',
    name: 'Standard Deviation',
    slug: 'standard-deviation',
    category: 'statistics',
    short: 'Calculate sample or population standard deviation.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '1, 2, 3, 4, 5' },
      { key: 'type', label: 'Type', type: 'select', default: 'sample', options: [{value: 'sample', label: 'Sample'}, {value: 'pop', label: 'Population'}] }
    ],
    compute: (raw) => {
      const nums = list(raw.nums);
      const isSample = raw.type === 'sample';
      const v = variance(nums, isSample);
      return { results: [{ label: 'Standard Deviation', value: round(Math.sqrt(v), 4), primary: true }] };
    },
    formula: 'sqrt(variance)',
    intro: ['Measure of dispersion.'],
    status: 'published',
    tests: [
      { name: 'sample', inputs: { nums: [1, 2, 3, 4, 5], type: 'sample' }, expect: { 'Standard Deviation': 1.5811 } },
      { name: 'pop', inputs: { nums: [1, 2, 3, 4, 5], type: 'pop' }, expect: { 'Standard Deviation': 1.4142 } }
    ]
  },
  {
    id: 'variance',
    name: 'Variance',
    slug: 'variance',
    category: 'statistics',
    short: 'Calculate the variance of a dataset.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '1, 2, 3, 4, 5' },
      { key: 'type', label: 'Type', type: 'select', default: 'sample', options: [{value: 'sample', label: 'Sample'}, {value: 'pop', label: 'Population'}] }
    ],
    compute: (raw) => {
      const nums = list(raw.nums);
      const isSample = raw.type === 'sample';
      const v = variance(nums, isSample);
      return { results: [{ label: 'Variance', value: round(v, 4), primary: true }] };
    },
    formula: 'Sum((x-mean)^2) / (N-1)',
    intro: ['Measure of variance.'],
    status: 'published',
    tests: [
      { name: 'sample', inputs: { nums: [1, 2, 3, 4, 5], type: 'sample' }, expect: { Variance: 2.5 } },
      { name: 'pop', inputs: { nums: [1, 2, 3, 4, 5], type: 'pop' }, expect: { Variance: 2 } }
    ]
  },
  {
    id: 'z-score',
    name: 'Z-Score',
    slug: 'z-score',
    category: 'statistics',
    short: 'Calculate z-score for a data point.',
    inputs: [
      { key: 'x', label: 'Value (x)', type: 'number', default: 85 },
      { key: 'mean', label: 'Mean (μ)', type: 'number', default: 75 },
      { key: 'sd', label: 'Standard Deviation (σ)', type: 'number', default: 10 }
    ],
    compute: (raw) => {
      const x = num(raw.x), m = num(raw.mean), s = num(raw.sd);
      assert(s > 0, 'Standard deviation must be > 0.');
      const z = (x - m) / s;
      return { results: [{ label: 'Z-Score', value: round(z, 4), primary: true }] };
    },
    formula: 'z = (x - μ) / σ',
    intro: ['Calculate Z-Score.'],
    status: 'published',
    tests: [
      { name: 'test1', inputs: { x: 85, mean: 75, sd: 10 }, expect: { 'Z-Score': 1 } },
      { name: 'test2', inputs: { x: 65, mean: 75, sd: 10 }, expect: { 'Z-Score': -1 } }
    ]
  },
  {
    id: 'confidence-interval',
    name: 'Confidence Interval',
    slug: 'confidence-interval',
    category: 'statistics',
    short: 'Calculate confidence interval.',
    inputs: [
      { key: 'mean', label: 'Sample Mean', type: 'number', default: 100 },
      { key: 'sd', label: 'Standard Deviation', type: 'number', default: 15 },
      { key: 'n', label: 'Sample Size (n)', type: 'number', default: 50 },
      { key: 'conf', label: 'Confidence Level (%)', type: 'number', default: 95 }
    ],
    compute: (raw) => {
      const m = num(raw.mean), s = num(raw.sd), n = num(raw.n), conf = num(raw.conf);
      assert(n > 0, 'Sample size must be > 0.');
      assert(conf > 0 && conf < 100, 'Confidence level must be between 0 and 100.');
      const alpha = 1 - (conf / 100);
      const z = Math.abs(normalInv(1 - alpha / 2));
      const margin = z * (s / Math.sqrt(n));
      return { results: [
        { label: 'Lower Bound', value: round(m - margin, 4), primary: true },
        { label: 'Upper Bound', value: round(m + margin, 4), primary: true },
        { label: 'Margin of Error', value: round(margin, 4) }
      ] };
    },
    formula: 'x ± Z*(s/√n)',
    intro: ['Confidence interval for mean.'],
    status: 'published',
    tests: [
      { name: '95%', inputs: { mean: 100, sd: 15, n: 50, conf: 95 }, expect: { 'Margin of Error': 4.158 } },
      { name: '99%', inputs: { mean: 100, sd: 15, n: 50, conf: 99 }, expect: { 'Margin of Error': 5.464 } }
    ]
  },
  {
    id: 'combination',
    name: 'Combination',
    slug: 'combination',
    category: 'statistics',
    short: 'Calculate combinations (nCr) for items.',
    inputs: [
      { key: 'n', label: 'n (total items)', type: 'number', default: 5 },
      { key: 'r', label: 'r (items chosen)', type: 'number', default: 2 }
    ],
    compute: (raw) => {
      const n = num(raw.n), r = num(raw.r);
      assert(Number.isInteger(n) && Number.isInteger(r), 'n and r must be integers');
      assert(n >= 0 && r >= 0 && n >= r, 'Invalid n or r');
      const res = factorial(n) / (factorial(r) * factorial(n - r));
      return { results: [{ label: 'Combinations', value: res, primary: true }] };
    },
    formula: 'n! / (r!(n-r)!)',
    intro: ['Calculate combinations.'],
    status: 'published',
    tests: [
      { name: '5c2', inputs: { n: 5, r: 2 }, expect: { Combinations: 10 } },
      { name: '5c5', inputs: { n: 5, r: 5 }, expect: { Combinations: 1 } }
    ]
  },
  {
    id: 'permutation',
    name: 'Permutation',
    slug: 'permutation',
    category: 'statistics',
    short: 'Calculate permutations (nPr) for items.',
    inputs: [
      { key: 'n', label: 'n (total items)', type: 'number', default: 5 },
      { key: 'r', label: 'r (items arranged)', type: 'number', default: 2 }
    ],
    compute: (raw) => {
      const n = num(raw.n), r = num(raw.r);
      assert(Number.isInteger(n) && Number.isInteger(r), 'n and r must be integers');
      assert(n >= 0 && r >= 0 && n >= r, 'Invalid n or r');
      const res = factorial(n) / factorial(n - r);
      return { results: [{ label: 'Permutations', value: res, primary: true }] };
    },
    formula: 'n! / (n-r)!',
    intro: ['Calculate permutations.'],
    status: 'published',
    tests: [
      { name: '5p2', inputs: { n: 5, r: 2 }, expect: { Permutations: 20 } },
      { name: '5p5', inputs: { n: 5, r: 5 }, expect: { Permutations: 120 } }
    ]
  },
  {
    id: 'sample-size',
    name: 'Sample Size',
    slug: 'sample-size',
    category: 'statistics',
    short: 'Calculate required sample size.',
    inputs: [
      { key: 'conf', label: 'Confidence Level (%)', type: 'number', default: 95 },
      { key: 'moe', label: 'Margin of Error (%)', type: 'number', default: 5 },
      { key: 'p', label: 'Population Proportion', type: 'number', default: 0.5 },
      { key: 'pop', label: 'Population Size (optional)', type: 'number', optional: true }
    ],
    compute: (raw) => {
      const conf = num(raw.conf), moe = num(raw.moe) / 100, p = num(raw.p);
      assert(conf > 0 && conf < 100, 'Invalid confidence level');
      assert(moe > 0, 'Margin of error must be > 0');
      const alpha = 1 - (conf / 100);
      const z = Math.abs(normalInv(1 - alpha / 2));
      let ss = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(moe, 2);
      let pop = Number(raw.pop);
      if (!isNaN(pop) && pop > 0) {
          ss = ss / (1 + ((ss - 1) / pop));
      }
      return { results: [{ label: 'Sample Size', value: Math.ceil(ss), primary: true }] };
    },
    formula: 'n = Z^2 * p(1-p) / E^2',
    intro: ['Find sample size.'],
    status: 'published',
    tests: [
      { name: 'infinite', inputs: { conf: 95, moe: 5, p: 0.5, pop: NaN }, expect: { 'Sample Size': 385 } },
      { name: 'finite', inputs: { conf: 95, moe: 5, p: 0.5, pop: 1000 }, expect: { 'Sample Size': 278 } }
    ]
  },
  {
    id: 'quartile',
    name: 'Quartiles',
    slug: 'quartile',
    category: 'statistics',
    short: 'Calculate quartiles for a data set.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '1, 2, 3, 4, 5, 6, 7' }
    ],
    compute: (raw) => {
      const nums = list(raw.nums).sort((a,b)=>a-b);
      assert(nums.length >= 3, 'Need at least 3 numbers');
      const med = (arr: number[]) => {
          const m = Math.floor(arr.length / 2);
          return arr.length % 2 ? arr[m] : (arr[m-1]+arr[m])/2;
      };
      const q2 = med(nums);
      const lower = nums.slice(0, Math.floor(nums.length/2));
      const upper = nums.slice(Math.ceil(nums.length/2));
      const q1 = med(lower);
      const q3 = med(upper);
      return { results: [
        { label: 'Q1', value: round(q1, 4), primary: true },
        { label: 'Q2 (Median)', value: round(q2, 4), primary: true },
        { label: 'Q3', value: round(q3, 4), primary: true },
        { label: 'IQR', value: round(q3 - q1, 4) }
      ] };
    },
    formula: 'Q1, Q2, Q3',
    intro: ['Find quartiles.'],
    status: 'published',
    tests: [
      { name: 'odd', inputs: { nums: [1, 2, 3, 4, 5, 6, 7] }, expect: { Q1: 2, 'Q2 (Median)': 4, Q3: 6 } },
      { name: 'even', inputs: { nums: [1, 2, 3, 4, 5, 6] }, expect: { Q1: 2, 'Q2 (Median)': 3.5, Q3: 5 } }
    ]
  },
  {
    id: 'correlation-coefficient',
    name: 'Correlation Coefficient',
    slug: 'correlation-coefficient',
    category: 'statistics',
    short: 'Calculate Pearson correlation r.',
    inputs: [
      { key: 'x', label: 'X values', type: 'list', default: '1, 2, 3, 4' },
      { key: 'y', label: 'Y values', type: 'list', default: '2, 4, 6, 8' }
    ],
    compute: (raw) => {
      const x = list(raw.x), y = list(raw.y);
      assert(x.length === y.length && x.length > 1, 'X and Y must be same length > 1');
      const n = x.length;
      const mx = mean(x), my = mean(y);
      let numr = 0, dx2 = 0, dy2 = 0;
      for (let i=0; i<n; i++) {
          numr += (x[i]-mx)*(y[i]-my);
          dx2 += Math.pow(x[i]-mx, 2);
          dy2 += Math.pow(y[i]-my, 2);
      }
      assert(dx2 > 0 && dy2 > 0, 'Zero variance in X or Y');
      const r = numr / Math.sqrt(dx2 * dy2);
      return { results: [{ label: 'Correlation (r)', value: round(r, 4), primary: true }] };
    },
    formula: 'Pearson r',
    intro: ['Find correlation.'],
    status: 'published',
    tests: [
      { name: 'perf', inputs: { x: [1,2,3], y: [2,4,6] }, expect: { 'Correlation (r)': 1 } },
      { name: 'neg', inputs: { x: [1,2,3], y: [6,4,2] }, expect: { 'Correlation (r)': -1 } }
    ]
  },
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    slug: 'linear-regression',
    category: 'statistics',
    short: 'Calculate line of best fit y = mx + b.',
    inputs: [
      { key: 'x', label: 'X values', type: 'list', default: '1, 2, 3, 4' },
      { key: 'y', label: 'Y values', type: 'list', default: '2, 4, 6, 8' }
    ],
    compute: (raw) => {
      const x = list(raw.x), y = list(raw.y);
      assert(x.length === y.length && x.length > 1, 'X and Y must be same length > 1');
      const n = x.length;
      const mx = mean(x), my = mean(y);
      let numr = 0, dx2 = 0;
      for (let i=0; i<n; i++) {
          numr += (x[i]-mx)*(y[i]-my);
          dx2 += Math.pow(x[i]-mx, 2);
      }
      assert(dx2 > 0, 'Zero variance in X');
      const slope = numr / dx2;
      const intercept = my - slope * mx;
      return { results: [
        { label: 'Slope (m)', value: round(slope, 4), primary: true },
        { label: 'Intercept (b)', value: round(intercept, 4), primary: true }
      ] };
    },
    formula: 'y = mx + b',
    intro: ['Find linear regression.'],
    status: 'published',
    tests: [
      { name: 'perf', inputs: { x: [1,2,3], y: [2,4,6] }, expect: { 'Slope (m)': 2, 'Intercept (b)': 0 } },
      { name: 'test2', inputs: { x: [1,2,3], y: [3,5,7] }, expect: { 'Slope (m)': 2, 'Intercept (b)': 1 } }
    ]
  },
  {
    id: 'margin-of-error',
    name: 'Margin of Error',
    slug: 'margin-of-error',
    category: 'statistics',
    short: 'Calculate margin of error.',
    inputs: [
      { key: 'conf', label: 'Confidence Level (%)', type: 'number', default: 95 },
      { key: 'p', label: 'Proportion (0-1)', type: 'number', default: 0.5 },
      { key: 'n', label: 'Sample Size', type: 'number', default: 1000 }
    ],
    compute: (raw) => {
      const conf = num(raw.conf), p = num(raw.p), n = num(raw.n);
      assert(conf > 0 && conf < 100, 'Invalid conf');
      assert(p >= 0 && p <= 1, 'Proportion between 0 and 1');
      assert(n > 0, 'n > 0');
      const alpha = 1 - (conf / 100);
      const z = Math.abs(normalInv(1 - alpha / 2));
      const moe = z * Math.sqrt((p * (1 - p)) / n);
      return { results: [{ label: 'Margin of Error', value: round(moe, 4), primary: true, unit: '' }] };
    },
    formula: 'Z * sqrt(p(1-p)/n)',
    intro: ['Calculate MOE.'],
    status: 'published',
    tests: [
      { name: 'test1', inputs: { conf: 95, p: 0.5, n: 1000 }, expect: { 'Margin of Error': 0.031 } },
      { name: 'test2', inputs: { conf: 99, p: 0.5, n: 1000 }, expect: { 'Margin of Error': 0.0407 } }
    ]
  },
  {
    id: 'normal-distribution',
    name: 'Normal Distribution',
    slug: 'normal-distribution',
    category: 'statistics',
    short: 'Calculate normal probability.',
    inputs: [
      { key: 'mean', label: 'Mean', type: 'number', default: 0 },
      { key: 'sd', label: 'Standard Deviation', type: 'number', default: 1 },
      { key: 'x', label: 'Value (X)', type: 'number', default: 1.96 }
    ],
    compute: (raw) => {
      const m = num(raw.mean), s = num(raw.sd), x = num(raw.x);
      assert(s > 0, 'SD > 0');
      const z = (x - m) / s;
      const prob = normalCdf(z);
      return { results: [
        { label: 'P(X ≤ x)', value: round(prob, 4), primary: true },
        { label: 'P(X > x)', value: round(1 - prob, 4) }
      ] };
    },
    formula: 'Normal CDF',
    intro: ['Normal prob.'],
    status: 'published',
    tests: [
      { name: 'std', inputs: { mean: 0, sd: 1, x: 0 }, expect: { 'P(X ≤ x)': 0.5 } },
      { name: '1.96', inputs: { mean: 0, sd: 1, x: 1.96 }, expect: { 'P(X ≤ x)': 0.975 } }
    ]
  },
  {
    id: 'binomial-probability',
    name: 'Binomial Probability',
    slug: 'binomial-probability',
    category: 'statistics',
    short: 'Calculate binomial probability.',
    inputs: [
      { key: 'n', label: 'Trials (n)', type: 'number', default: 10 },
      { key: 'x', label: 'Successes (x)', type: 'number', default: 5 },
      { key: 'p', label: 'Prob of Success (p)', type: 'number', default: 0.5 }
    ],
    compute: (raw) => {
      const n = num(raw.n), x = num(raw.x), p = num(raw.p);
      assert(Number.isInteger(n) && Number.isInteger(x), 'Must be integers');
      assert(n >= x && x >= 0, '0 <= x <= n');
      assert(p >= 0 && p <= 1, '0 <= p <= 1');
      const comb = factorial(n) / (factorial(x) * factorial(n - x));
      const px = comb * Math.pow(p, x) * Math.pow(1 - p, n - x);
      return { results: [{ label: 'P(X = x)', value: round(px, 4), primary: true }] };
    },
    formula: 'nCx * p^x * (1-p)^(n-x)',
    intro: ['Binomial prob.'],
    status: 'published',
    tests: [
      { name: 'test1', inputs: { n: 10, x: 5, p: 0.5 }, expect: { 'P(X = x)': 0.2461 } },
      { name: 'test2', inputs: { n: 5, x: 5, p: 0.5 }, expect: { 'P(X = x)': 0.0312 } }
    ]
  }
];
