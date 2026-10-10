import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, list, sum } from '../lib/calc/helpers';

export const mathCalculators: CalculatorDef[] = [
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'math',
    short: 'Calculate percentages easily with this multi-function tool.',
    aliases: ['percent calculator', 'what is x% of y'],
    inputs: [
      { key: 'mode', label: 'Calculation Type', type: 'select', default: 'of', options: [
        { value: 'of', label: 'What is X% of Y?' },
        { value: 'is_what', label: 'X is what % of Y?' },
        { value: 'is_p_of', label: 'X is Y% of what?' },
      ] },
      { key: 'x', label: 'X (Value 1)', type: 'number', default: 20 },
      { key: 'y', label: 'Y (Value 2)', type: 'number', default: 150 }
    ],
    compute: (raw) => {
      const mode = raw.mode as string;
      const x = num(raw.x);
      const y = num(raw.y);
      let res = 0;
      let label = '';
      if (mode === 'of') {
        res = (x / 100) * y;
        label = `${x}% of ${y}`;
      } else if (mode === 'is_what') {
        assert(y !== 0, 'Y cannot be zero');
        res = (x / y) * 100;
        label = `${x} is what percent of ${y}`;
      } else if (mode === 'is_p_of') {
        assert(y !== 0, 'Y cannot be zero percent');
        res = (x / (y / 100));
        label = `${x} is ${y}% of what`;
      }
      return {
        results: [
          { label, value: round(res, 4), primary: true }
        ]
      };
    },
    formula: 'X% of Y = (X / 100) * Y',
    intro: ['This calculator helps you solve the three most common percentage problems.'],
    status: 'published',
    tests: [
      { name: '20% of 150', inputs: { mode: 'of', x: 20, y: 150 }, expect: { '20% of 150': 30 } },
      { name: 'is_what', inputs: { mode: 'is_what', x: 30, y: 150 }, expect: { '30 is what percent of 150': 20 } }
    ]
  },
  {
    id: 'area',
    name: 'Area Calculator',
    slug: 'area-calculator',
    category: 'math',
    short: 'Calculate the area of a circle, square, rectangle, or triangle.',
    inputs: [
      { key: 'shape', label: 'Shape', type: 'select', default: 'circle', options: [
        { value: 'circle', label: 'Circle' },
        { value: 'rectangle', label: 'Rectangle' },
      ]},
      { key: 'radius', label: 'Radius', type: 'number', default: 5, showIf: { key: 'shape', equals: ['circle'] } },
      { key: 'width', label: 'Width', type: 'number', default: 4, showIf: { key: 'shape', equals: ['rectangle'] } },
      { key: 'length', label: 'Length', type: 'number', default: 10, showIf: { key: 'shape', equals: ['rectangle'] } },
    ],
    compute: (raw) => {
      const shape = raw.shape;
      let area = 0;
      if (shape === 'circle') {
        const r = num(raw.radius);
        assert(r >= 0, 'Radius must be positive');
        area = Math.PI * r * r;
      } else if (shape === 'rectangle') {
        const w = num(raw.width);
        const l = num(raw.length);
        assert(w >= 0 && l >= 0, 'Dimensions must be positive');
        area = w * l;
      }
      return { results: [{ label: 'Area', value: round(area, 4), primary: true }] };
    },
    formula: 'Circle: π × r² | Rectangle: w × l',
    intro: ['Quickly compute the area of common geometric shapes.'],
    status: 'published',
    tests: [
      { name: 'Circle r=5', inputs: { shape: 'circle', radius: 5 }, expect: { Area: 78.5398 } },
      { name: 'Rect 4x10', inputs: { shape: 'rectangle', width: 4, length: 10 }, expect: { Area: 40 } }
    ]
  }
,

  {
    id: 'percentage-change',
    name: 'Percentage Change Calculator',
    slug: 'percentage-change',
    category: 'math',
    short: 'Calculate the percentage change between two numbers.',
    inputs: [
      { key: 'v1', label: 'Initial Value', type: 'number', default: 100 },
      { key: 'v2', label: 'Final Value', type: 'number', default: 150 }
    ],
    compute: (raw) => {
      const v1 = num(raw.v1);
      const v2 = num(raw.v2);
      assert(v1 !== 0, 'Initial value cannot be zero');
      const change = ((v2 - v1) / Math.abs(v1)) * 100;
      return { results: [{ label: 'Percentage Change', value: round(change, 4), primary: true, unit: '%' }] };
    },
    formula: '((Final - Initial) / |Initial|) * 100',
    intro: ['Calculate the increase or decrease in percentage.'],
    status: 'published',
    tests: [
      { name: 'change', inputs: { v1: 100, v2: 150 }, expect: { 'Percentage Change': 50 } },
      { name: 'decrease', inputs: { v1: 100, v2: 50 }, expect: { 'Percentage Change': -50 } }
    ]
  },
  {
    id: 'percent-error',
    name: 'Percent Error Calculator',
    slug: 'percent-error',
    category: 'math',
    short: 'Calculate the percent error of an accepted vs measured value.',
    inputs: [
      { key: 'measured', label: 'Measured Value', type: 'number', default: 9.8 },
      { key: 'accepted', label: 'Accepted Value', type: 'number', default: 10 }
    ],
    compute: (raw) => {
      const m = num(raw.measured);
      const a = num(raw.accepted);
      assert(a !== 0, 'Accepted value cannot be zero');
      const error = (Math.abs(m - a) / Math.abs(a)) * 100;
      return { results: [{ label: 'Percent Error', value: round(error, 4), primary: true, unit: '%' }] };
    },
    formula: '(|Measured - Accepted| / |Accepted|) * 100',
    intro: ['Calculate the accuracy of a measurement.'],
    status: 'published',
    tests: [
      { name: 'error', inputs: { measured: 9.8, accepted: 10 }, expect: { 'Percent Error': 2 } },
      { name: 'exact', inputs: { measured: 10, accepted: 10 }, expect: { 'Percent Error': 0 } }
    ]
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    slug: 'fraction-calculator',
    category: 'math',
    short: 'Add, subtract, multiply, and divide fractions.',
    inputs: [
      { key: 'n1', label: 'Numerator 1', type: 'number', default: 1 },
      { key: 'd1', label: 'Denominator 1', type: 'number', default: 2 },
      { key: 'op', label: 'Operation', type: 'select', default: 'add', options: [{value:'add',label:'+'},{value:'sub',label:'-'},{value:'mul',label:'*'},{value:'div',label:'/'}] },
      { key: 'n2', label: 'Numerator 2', type: 'number', default: 1 },
      { key: 'd2', label: 'Denominator 2', type: 'number', default: 3 }
    ],
    compute: (raw) => {
      const n1 = num(raw.n1), d1 = num(raw.d1), op = raw.op as string, n2 = num(raw.n2), d2 = num(raw.d2);
      assert(d1 !== 0 && d2 !== 0, 'Denominators cannot be zero');
      let nr = 0, dr = 1;
      if(op === 'add') { nr = n1*d2 + n2*d1; dr = d1*d2; }
      else if(op === 'sub') { nr = n1*d2 - n2*d1; dr = d1*d2; }
      else if(op === 'mul') { nr = n1*n2; dr = d1*d2; }
      else if(op === 'div') { assert(n2 !== 0, 'Cannot divide by zero fraction'); nr = n1*d2; dr = d1*n2; }
      const g = (a: number, b: number): number => b === 0 ? Math.abs(a) : g(b, a % b);
      const div = g(nr, dr);
      const rN = (nr/div) * (dr/div < 0 ? -1 : 1);
      const rD = Math.abs(dr/div);
      return { results: [{ label: 'Result', value: rD === 1 ? `${rN}` : `${rN}/${rD}`, primary: true }] };
    },
    formula: 'Performs basic fraction arithmetic.',
    intro: ['Solve fraction math easily.'],
    status: 'published',
    tests: [
      { name: 'add', inputs: { n1:1, d1:2, op:'add', n2:1, d2:3 }, expect: { 'Result': '5/6' } },
      { name: 'sub', inputs: { n1:1, d1:2, op:'sub', n2:1, d2:3 }, expect: { 'Result': '1/6' } }
    ]
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    slug: 'ratio',
    category: 'math',
    short: 'Simplify or solve equivalent ratios.',
    inputs: [
      { key: 'a', label: 'A', type: 'number', default: 2 },
      { key: 'b', label: 'B', type: 'number', default: 4 },
      { key: 'c', label: 'C', type: 'number', default: 10, optional: true },
      { key: 'd', label: 'D (optional for solving)', type: 'number', optional: true }
    ],
    compute: (raw) => {
      const a = num(raw.a), b = num(raw.b);
      let c = Number(raw.c), d = Number(raw.d);
      if(!isNaN(c) && isNaN(d)) {
        assert(a !== 0, 'A cannot be zero');
        d = (b * c) / a;
        return { results: [{ label: 'Missing D', value: round(d, 4), primary: true }] };
      }
      return { results: [{ label: 'Simplified', value: round(a/b, 4), primary: true }] };
    },
    formula: 'A/B = C/D',
    intro: ['Ratio math.'],
    status: 'published',
    tests: [
      { name: 'solve d', inputs: { a:2, b:4, c:10, d: NaN }, expect: { 'Missing D': 20 } },
      { name: 'simplify', inputs: { a:2, b:4, c: NaN, d: NaN }, expect: { 'Simplified': 0.5 } }
    ]
  },
  {
    id: 'average',
    name: 'Average Calculator',
    slug: 'average',
    category: 'math',
    short: 'Calculate the mean of numbers.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '1,2,3,4,5' }
    ],
    compute: (raw) => {
      const nums = list(raw.nums);
      assert(nums.length > 0, 'Enter numbers');
      const m = sum(nums) / nums.length;
      return { results: [{ label: 'Mean', value: round(m, 4), primary: true }] };
    },
    formula: 'Sum / Count',
    intro: ['Find the average of a dataset.'],
    status: 'published',
    tests: [
      { name: 'mean1', inputs: { nums: [1,2,3,4,5] }, expect: { Mean: 3 } },
      { name: 'mean2', inputs: { nums: [10, 20] }, expect: { Mean: 15 } }
    ]
  },
  {
    id: 'rounding',
    name: 'Rounding Calculator',
    slug: 'rounding',
    category: 'math',
    short: 'Round numbers to a specific decimal place.',
    inputs: [
      { key: 'val', label: 'Number', type: 'number', default: 3.14159 },
      { key: 'places', label: 'Decimal Places', type: 'number', default: 2 }
    ],
    compute: (raw) => {
      const v = num(raw.val), places = num(raw.places);
      return { results: [{ label: 'Rounded', value: round(v, places), primary: true }] };
    },
    formula: 'Round(number, places)',
    intro: ['Round numbers easily.'],
    status: 'published',
    tests: [
      { name: 'round pi', inputs: { val: 3.14159, places: 2 }, expect: { Rounded: 3.14 } },
      { name: 'round e', inputs: { val: 2.718, places: 1 }, expect: { Rounded: 2.7 } }
    ]
  },
  {
    id: 'exponent',
    name: 'Exponent Calculator',
    slug: 'exponent',
    category: 'math',
    short: 'Calculate base to a power.',
    inputs: [
      { key: 'base', label: 'Base', type: 'number', default: 2 },
      { key: 'exp', label: 'Exponent', type: 'number', default: 8 }
    ],
    compute: (raw) => {
      const b = num(raw.base), e = num(raw.exp);
      return { results: [{ label: 'Result', value: round(Math.pow(b, e), 6), primary: true }] };
    },
    formula: 'Base ^ Exponent',
    intro: ['Calculate exponents.'],
    status: 'published',
    tests: [
      { name: '2^8', inputs: { base: 2, exp: 8 }, expect: { Result: 256 } },
      { name: '3^2', inputs: { base: 3, exp: 2 }, expect: { Result: 9 } }
    ]
  },
  {
    id: 'root',
    name: 'Root Calculator',
    slug: 'root',
    category: 'math',
    short: 'Calculate square, cube, or nth roots.',
    inputs: [
      { key: 'val', label: 'Value', type: 'number', default: 16 },
      { key: 'n', label: 'Nth Root', type: 'number', default: 2 }
    ],
    compute: (raw) => {
      const v = num(raw.val), n = num(raw.n);
      assert(n !== 0, 'Root cannot be zero');
      if(v < 0 && n % 2 === 0) throw new Error('Even root of negative number');
      const res = v < 0 ? -Math.pow(-v, 1/n) : Math.pow(v, 1/n);
      return { results: [{ label: 'Root', value: round(res, 6), primary: true }] };
    },
    formula: 'v ^ (1/n)',
    intro: ['Calculate nth roots.'],
    status: 'published',
    tests: [
      { name: 'sqrt', inputs: { val: 16, n: 2 }, expect: { Root: 4 } },
      { name: 'cbrt', inputs: { val: 27, n: 3 }, expect: { Root: 3 } }
    ]
  },
  {
    id: 'logarithm',
    name: 'Logarithm Calculator',
    slug: 'logarithm',
    category: 'math',
    short: 'Calculate logarithm of a number to a specific base.',
    inputs: [
      { key: 'val', label: 'Value', type: 'number', default: 100 },
      { key: 'base', label: 'Base', type: 'number', default: 10 }
    ],
    compute: (raw) => {
      const v = num(raw.val), b = num(raw.base);
      assert(v > 0, 'Value must be positive');
      assert(b > 0 && b !== 1, 'Base must be positive and not 1');
      return { results: [{ label: 'Logarithm', value: round(Math.log(v) / Math.log(b), 6), primary: true }] };
    },
    formula: 'log_b(x) = ln(x) / ln(b)',
    intro: ['Calculate logs.'],
    status: 'published',
    tests: [
      { name: 'log10', inputs: { val: 100, base: 10 }, expect: { Logarithm: 2 } },
      { name: 'log2', inputs: { val: 8, base: 2 }, expect: { Logarithm: 3 } }
    ]
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    slug: 'scientific',
    category: 'math',
    short: 'Basic scientific operations.',
    inputs: [
      { key: 'val', label: 'Value', type: 'number', default: 45 },
      { key: 'op', label: 'Operation', type: 'select', default: 'sin', options: [
        {value:'sin',label:'sin(x)'},{value:'cos',label:'cos(x)'},{value:'tan',label:'tan(x)'}
      ]}
    ],
    compute: (raw) => {
      const v = num(raw.val) * Math.PI / 180;
      const op = raw.op as string;
      let res = 0;
      if (op === 'sin') res = Math.sin(v);
      if (op === 'cos') res = Math.cos(v);
      if (op === 'tan') res = Math.tan(v);
      return { results: [{ label: 'Result', value: round(res, 6), primary: true }] };
    },
    formula: 'Trig functions (degrees)',
    intro: ['Trigonometry.'],
    status: 'published',
    tests: [
      { name: 'sin', inputs: { val: 90, op: 'sin' }, expect: { Result: 1 } },
      { name: 'cos', inputs: { val: 0, op: 'cos' }, expect: { Result: 1 } }
    ]
  },
  {
    id: 'quadratic-equation',
    name: 'Quadratic Equation Calculator',
    slug: 'quadratic-equation',
    category: 'math',
    short: 'Solve quadratic equations ax^2 + bx + c = 0.',
    inputs: [
      { key: 'a', label: 'a', type: 'number', default: 1 },
      { key: 'b', label: 'b', type: 'number', default: -3 },
      { key: 'c', label: 'c', type: 'number', default: 2 }
    ],
    compute: (raw) => {
      const a = num(raw.a), b = num(raw.b), c = num(raw.c);
      assert(a !== 0, 'Coefficient a cannot be zero');
      const d = b * b - 4 * a * c;
      if (d < 0) return { results: [{ label: 'Roots', value: 'Complex roots', primary: true }] };
      const r1 = (-b + Math.sqrt(d)) / (2 * a);
      const r2 = (-b - Math.sqrt(d)) / (2 * a);
      return { results: [
        { label: 'Root 1', value: round(r1, 4), primary: true },
        { label: 'Root 2', value: round(r2, 4) }
      ] };
    },
    formula: '(-b ± √(b²-4ac)) / 2a',
    intro: ['Solve quadratic equations.'],
    status: 'published',
    tests: [
      { name: 'roots', inputs: { a:1, b:-3, c:2 }, expect: { 'Root 1': 2, 'Root 2': 1 } },
      { name: 'roots2', inputs: { a:1, b:-5, c:6 }, expect: { 'Root 1': 3, 'Root 2': 2 } }
    ]
  },
  {
    id: 'system-of-equations',
    name: 'System of Equations Calculator',
    slug: 'system-of-equations',
    category: 'math',
    short: 'Solve 2x2 systems of equations.',
    inputs: [
      { key: 'a1', label: 'a1', type: 'number', default: 2 },
      { key: 'b1', label: 'b1', type: 'number', default: 3 },
      { key: 'c1', label: 'c1', type: 'number', default: 5 },
      { key: 'a2', label: 'a2', type: 'number', default: 4 },
      { key: 'b2', label: 'b2', type: 'number', default: -1 },
      { key: 'c2', label: 'c2', type: 'number', default: 3 }
    ],
    compute: (raw) => {
      const a1=num(raw.a1), b1=num(raw.b1), c1=num(raw.c1), a2=num(raw.a2), b2=num(raw.b2), c2=num(raw.c2);
      const det = a1 * b2 - a2 * b1;
      assert(det !== 0, 'No unique solution');
      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;
      return { results: [{ label: 'x', value: round(x, 4), primary: true }, { label: 'y', value: round(y, 4), primary: true }] };
    },
    formula: 'Cramer\'s rule',
    intro: ['Solve 2x2 systems.'],
    status: 'published',
    tests: [
      { name: 'solve', inputs: { a1:2, b1:3, c1:5, a2:4, b2:-1, c2:3 }, expect: { x: 1, y: 1 } },
      { name: 'solve2', inputs: { a1:1, b1:1, c1:2, a2:1, b2:-1, c2:0 }, expect: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'gcf',
    name: 'Greatest Common Factor',
    slug: 'gcf',
    category: 'math',
    short: 'Find the GCF (Greatest Common Factor) of numbers.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '12, 18, 24' }
    ],
    compute: (raw) => {
      const nums = list(raw.nums).map(Math.abs).map(Math.round);
      assert(nums.length > 0, 'Enter numbers');
      const g = (a: number, b: number): number => b === 0 ? Math.abs(a) : g(b, a % b);
      const res = nums.reduce((a, b) => g(a, b));
      return { results: [{ label: 'GCF', value: res, primary: true }] };
    },
    formula: 'Euclidean Algorithm',
    intro: ['Calculate GCF.'],
    status: 'published',
    tests: [
      { name: 'gcf', inputs: { nums: [12, 18, 24] }, expect: { GCF: 6 } },
      { name: 'gcf2', inputs: { nums: [7, 13] }, expect: { GCF: 1 } }
    ]
  },
  {
    id: 'lcm',
    name: 'Lowest Common Multiple',
    slug: 'lcm',
    category: 'math',
    short: 'Find the LCM of numbers.',
    inputs: [
      { key: 'nums', label: 'Numbers', type: 'list', default: '4, 6, 8' }
    ],
    compute: (raw) => {
      const nums = list(raw.nums).map(Math.abs).map(Math.round);
      assert(nums.length > 0, 'Enter numbers');
      const g = (a: number, b: number): number => b === 0 ? Math.abs(a) : g(b, a % b);
      const l = (a: number, b: number): number => a === 0 || b === 0 ? 0 : Math.abs(a * b) / g(a, b);
      const res = nums.reduce((a, b) => l(a, b));
      return { results: [{ label: 'LCM', value: res, primary: true }] };
    },
    formula: 'LCM(a,b) = |a*b|/GCF(a,b)',
    intro: ['Calculate LCM.'],
    status: 'published',
    tests: [
      { name: 'lcm', inputs: { nums: [4, 6, 8] }, expect: { LCM: 24 } },
      { name: 'lcm2', inputs: { nums: [3, 5] }, expect: { LCM: 15 } }
    ]
  },
  {
    id: 'factorial',
    name: 'Factorial Calculator',
    slug: 'factorial',
    category: 'math',
    short: 'Calculate n factorial.',
    inputs: [
      { key: 'n', label: 'Number', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const n = num(raw.n);
      assert(Number.isInteger(n) && n >= 0 && n <= 170, 'Invalid n');
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return { results: [{ label: 'Factorial', value: r, primary: true }] };
    },
    formula: 'n! = n * (n-1) * ... * 1',
    intro: ['Calculate factorial.'],
    status: 'published',
    tests: [
      { name: '5!', inputs: { n: 5 }, expect: { Factorial: 120 } },
      { name: '3!', inputs: { n: 3 }, expect: { Factorial: 6 } }
    ]
  },
  {
    id: 'prime-factorization',
    name: 'Prime Factorization',
    slug: 'prime-factorization',
    category: 'math',
    short: 'Find prime factors of a number.',
    inputs: [
      { key: 'n', label: 'Number', type: 'number', default: 60 }
    ],
    compute: (raw) => {
      let n = Math.abs(Math.round(num(raw.n)));
      assert(n > 1, 'Enter number > 1');
      const factors = [];
      let d = 2;
      while (n > 1) {
        while (n % d === 0) {
          factors.push(d);
          n /= d;
        }
        d = d === 2 ? 3 : d + 2;
        if (d * d > n && n > 1) { factors.push(n); break; }
      }
      return { results: [{ label: 'Prime Factors', value: factors.join(' × '), primary: true }] };
    },
    formula: 'Division method',
    intro: ['Find primes.'],
    status: 'published',
    tests: [
      { name: '60', inputs: { n: 60 }, expect: { 'Prime Factors': '2 × 2 × 3 × 5' } },
      { name: '10', inputs: { n: 10 }, expect: { 'Prime Factors': '2 × 5' } }
    ]
  },
  {
    id: 'triangle',
    name: 'Triangle Calculator',
    slug: 'triangle',
    category: 'math',
    short: 'Calculate triangle properties.',
    inputs: [
      { key: 'b', label: 'Base', type: 'number', default: 10 },
      { key: 'h', label: 'Height', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const b = num(raw.b), h = num(raw.h);
      assert(b > 0 && h > 0, 'Must be positive');
      return { results: [{ label: 'Area', value: round(0.5 * b * h, 4), primary: true }] };
    },
    formula: '1/2 * b * h',
    intro: ['Triangle area.'],
    status: 'published',
    tests: [
      { name: 'area', inputs: { b: 10, h: 5 }, expect: { Area: 25 } },
      { name: 'area2', inputs: { b: 2, h: 3 }, expect: { Area: 3 } }
    ]
  },
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem',
    slug: 'pythagorean-theorem',
    category: 'math',
    short: 'Calculate missing side of right triangle.',
    inputs: [
      { key: 'a', label: 'Side A', type: 'number', default: 3, optional: true },
      { key: 'b', label: 'Side B', type: 'number', default: 4, optional: true },
      { key: 'c', label: 'Hypotenuse C', type: 'number', optional: true }
    ],
    compute: (raw) => {
      let a = Number(raw.a), b = Number(raw.b), c = Number(raw.c);
      let missing = ''; let val = 0;
      if (isNaN(c)) { assert(a>0 && b>0, 'Invalid'); c = Math.sqrt(a*a+b*b); missing='C'; val=c; }
      else if (isNaN(a)) { assert(c>b && b>0, 'Invalid'); a = Math.sqrt(c*c-b*b); missing='A'; val=a; }
      else if (isNaN(b)) { assert(c>a && a>0, 'Invalid'); b = Math.sqrt(c*c-a*a); missing='B'; val=b; }
      return { results: [{ label: `Missing Side ${missing}`, value: round(val, 4), primary: true }] };
    },
    formula: 'a^2 + b^2 = c^2',
    intro: ['Right triangles.'],
    status: 'published',
    tests: [
      { name: 'solve c', inputs: { a: 3, b: 4, c: NaN }, expect: { 'Missing Side C': 5 } },
      { name: 'solve a', inputs: { a: NaN, b: 4, c: 5 }, expect: { 'Missing Side A': 3 } }
    ]
  },
  {
    id: 'circle',
    name: 'Circle Calculator',
    slug: 'circle',
    category: 'math',
    short: 'Calculate circle circumference and area.',
    inputs: [
      { key: 'r', label: 'Radius', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const r = num(raw.r);
      assert(r > 0, 'Radius must be positive');
      return { results: [
        { label: 'Circumference', value: round(2 * Math.PI * r, 4), primary: true },
        { label: 'Area', value: round(Math.PI * r * r, 4) }
      ] };
    },
    formula: 'C = 2πr, A = πr^2',
    intro: ['Circle properties.'],
    status: 'published',
    tests: [
      { name: 'r=5', inputs: { r: 5 }, expect: { Circumference: 31.4159, Area: 78.5398 } },
      { name: 'r=10', inputs: { r: 10 }, expect: { Circumference: 62.8319, Area: 314.1593 } }
    ]
  },
  {
    id: 'perimeter',
    name: 'Perimeter Calculator',
    slug: 'perimeter',
    category: 'math',
    short: 'Calculate perimeter of a rectangle.',
    inputs: [
      { key: 'w', label: 'Width', type: 'number', default: 4 },
      { key: 'l', label: 'Length', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const w = num(raw.w), l = num(raw.l);
      assert(w > 0 && l > 0, 'Must be positive');
      return { results: [{ label: 'Perimeter', value: round(2*(w+l), 4), primary: true }] };
    },
    formula: '2(w+l)',
    intro: ['Rectangle perimeter.'],
    status: 'published',
    tests: [
      { name: '4x5', inputs: { w: 4, l: 5 }, expect: { Perimeter: 18 } },
      { name: '1x2', inputs: { w: 1, l: 2 }, expect: { Perimeter: 6 } }
    ]
  },
  {
    id: 'volume',
    name: 'Volume Calculator',
    slug: 'volume',
    category: 'math',
    short: 'Calculate volume of rectangular prism.',
    inputs: [
      { key: 'w', label: 'Width', type: 'number', default: 3 },
      { key: 'l', label: 'Length', type: 'number', default: 4 },
      { key: 'h', label: 'Height', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const w = num(raw.w), l = num(raw.l), h = num(raw.h);
      assert(w > 0 && l > 0 && h > 0, 'Must be positive');
      return { results: [{ label: 'Volume', value: round(w*l*h, 4), primary: true }] };
    },
    formula: 'w * l * h',
    intro: ['Calculate volume.'],
    status: 'published',
    tests: [
      { name: '3x4x5', inputs: { w: 3, l: 4, h: 5 }, expect: { Volume: 60 } },
      { name: '1x1x1', inputs: { w: 1, l: 1, h: 1 }, expect: { Volume: 1 } }
    ]
  },
  {
    id: 'surface-area',
    name: 'Surface Area Calculator',
    slug: 'surface-area',
    category: 'math',
    short: 'Calculate surface area of a box.',
    inputs: [
      { key: 'w', label: 'Width', type: 'number', default: 3 },
      { key: 'l', label: 'Length', type: 'number', default: 4 },
      { key: 'h', label: 'Height', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const w = num(raw.w), l = num(raw.l), h = num(raw.h);
      assert(w > 0 && l > 0 && h > 0, 'Must be positive');
      return { results: [{ label: 'Surface Area', value: round(2*(w*l + h*l + h*w), 4), primary: true }] };
    },
    formula: '2(wl + hl + hw)',
    intro: ['Calculate surface area.'],
    status: 'published',
    tests: [
      { name: '3x4x5', inputs: { w: 3, l: 4, h: 5 }, expect: { 'Surface Area': 94 } },
      { name: '1x1x1', inputs: { w: 1, l: 1, h: 1 }, expect: { 'Surface Area': 6 } }
    ]
  },
  {
    id: 'slope',
    name: 'Slope Calculator',
    slug: 'slope',
    category: 'math',
    short: 'Calculate the slope between two points.',
    inputs: [
      { key: 'x1', label: 'x1', type: 'number', default: 1 },
      { key: 'y1', label: 'y1', type: 'number', default: 2 },
      { key: 'x2', label: 'x2', type: 'number', default: 4 },
      { key: 'y2', label: 'y2', type: 'number', default: 8 }
    ],
    compute: (raw) => {
      const x1 = num(raw.x1), y1 = num(raw.y1), x2 = num(raw.x2), y2 = num(raw.y2);
      assert(x2 !== x1, 'Vertical line has undefined slope');
      return { results: [{ label: 'Slope', value: round((y2-y1)/(x2-x1), 4), primary: true }] };
    },
    formula: '(y2 - y1) / (x2 - x1)',
    intro: ['Find slope.'],
    status: 'published',
    tests: [
      { name: 'line', inputs: { x1:1, y1:2, x2:4, y2:8 }, expect: { Slope: 2 } },
      { name: 'flat', inputs: { x1:1, y1:2, x2:4, y2:2 }, expect: { Slope: 0 } }
    ]
  },
  {
    id: 'distance',
    name: 'Distance Calculator',
    slug: 'distance',
    category: 'math',
    short: 'Calculate the distance between two points in 2D, 3D, or using latitude and longitude coordinates.',
    inputs: [
      {
        key: 'mode',
        label: 'Calculation Mode',
        type: 'select',
        default: '2d',
        options: [
          { value: '2d', label: '2D Distance (x, y)' },
          { value: '3d', label: '3D Distance (x, y, z)' },
          { value: 'latlon', label: 'Distance by Latitude / Longitude' },
        ],
      },
      { key: 'x1', label: 'Point 1 — x\u2081', type: 'number', default: 0, help: 'x-coordinate of Point 1' },
      { key: 'y1', label: 'Point 1 — y\u2081', type: 'number', default: 0, help: 'y-coordinate of Point 1' },
      { key: 'z1', label: 'Point 1 — z\u2081 (3D only)', type: 'number', default: 0, optional: true, help: 'z-coordinate (only for 3D mode)' },
      { key: 'x2', label: 'Point 2 — x\u2082', type: 'number', default: 3, help: 'x-coordinate of Point 2' },
      { key: 'y2', label: 'Point 2 — y\u2082', type: 'number', default: 4, help: 'y-coordinate of Point 2' },
      { key: 'z2', label: 'Point 2 — z\u2082 (3D only)', type: 'number', default: 0, optional: true, help: 'z-coordinate (only for 3D mode)' },
      { key: 'lat1', label: 'Latitude 1 (degrees)', type: 'number', default: 40.7128, optional: true, help: 'e.g. 40.7128 for New York City' },
      { key: 'lon1', label: 'Longitude 1 (degrees)', type: 'number', default: -74.006, optional: true, help: 'e.g. -74.0060 for New York City' },
      { key: 'lat2', label: 'Latitude 2 (degrees)', type: 'number', default: 34.0522, optional: true, help: 'e.g. 34.0522 for Los Angeles' },
      { key: 'lon2', label: 'Longitude 2 (degrees)', type: 'number', default: -118.2437, optional: true, help: 'e.g. -118.2437 for Los Angeles' },
    ],
    compute: (raw) => {
      const mode = String(raw.mode || '2d');
      if (mode === '3d') {
        const x1 = num(raw.x1), y1 = num(raw.y1), z1 = num(raw.z1 ?? 0);
        const x2 = num(raw.x2), y2 = num(raw.y2), z2 = num(raw.z2 ?? 0);
        const d = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
        const dxy = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        return {
          results: [
            { label: 'Distance (3D)', value: round(d, 6), primary: true },
            { label: '2D Distance (ignoring z)', value: round(dxy, 6) },
            { label: '\u0394z (depth difference)', value: round(Math.abs(z2-z1), 6) },
          ],
        };
      }
      if (mode === 'latlon') {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const lat1 = num(raw.lat1 ?? 40.7128), lon1 = num(raw.lon1 ?? -74.006);
        const lat2 = num(raw.lat2 ?? 34.0522), lon2 = num(raw.lon2 ?? -118.2437);
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distKm = R * c;
        return {
          results: [
            { label: 'Distance (km)', value: round(distKm, 3), primary: true, unit: 'km' },
            { label: 'Distance (miles)', value: round(distKm * 0.621371, 3), unit: 'mi' },
            { label: 'Distance (nautical miles)', value: round(distKm * 0.539957, 3), unit: 'nmi' },
          ],
          notes: ['Uses the Haversine formula assuming a spherical Earth (radius 6,371 km).'],
        };
      }
      // default: 2D
      const x1 = num(raw.x1), y1 = num(raw.y1), x2 = num(raw.x2), y2 = num(raw.y2);
      const d = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
      return {
        results: [
          { label: 'Distance (2D)', value: round(d, 6), primary: true },
          { label: '\u0394x (horizontal)', value: round(Math.abs(x2-x1), 6) },
          { label: '\u0394y (vertical)', value: round(Math.abs(y2-y1), 6) },
        ],
      };
    },
    formula: '2D: \u221a((x\u2082\u2212x\u2081)\u00b2 + (y\u2082\u2212y\u2081)\u00b2) | 3D: \u221a((x\u2082\u2212x\u2081)\u00b2 + (y\u2082\u2212y\u2081)\u00b2 + (z\u2082\u2212z\u2081)\u00b2) | Lat/Lon: Haversine',
    intro: [
      'This calculator finds the straight-line distance between two points.',
      'Choose 2D mode for coordinate-plane problems, 3D mode for three-dimensional space, or Latitude/Longitude mode to find the real-world distance between two geographic locations on Earth.'
    ],
    howTo: [
      'Select the calculation mode (2D, 3D, or Lat/Lon).',
      'Enter the coordinates of Point 1 and Point 2.',
      'Read the distance in the results panel. Lat/Lon mode shows km, miles, and nautical miles.'
    ],
    faqs: [
      { q: 'What is the Euclidean distance formula?', a: 'Euclidean distance is the straight-line ("as-the-crow-flies") distance between two points. In 2D it equals the square root of (x2-x1)^2 + (y2-y1)^2.' },
      { q: 'What is the Haversine formula?', a: 'The Haversine formula calculates the great-circle distance between two geographic points on a sphere using their latitudes and longitudes. It is accurate to within about 0.5% for Earth distances.' },
      { q: 'How accurate is Lat/Lon distance?', a: 'The Haversine formula treats Earth as a perfect sphere. For high-precision work (aviation, surveying), the Vincenty formula using an ellipsoidal model is slightly more accurate, but differs by less than 0.3%.' },
      { q: 'What units does the calculator use?', a: 'For 2D/3D mode, units match your input coordinates (if you enter meters, you get meters). For Lat/Lon mode, the output is always in kilometers, miles, and nautical miles.' },
    ],
    status: 'published',
    tests: [
      { name: '2d-345', inputs: { mode: '2d', x1: 0, y1: 0, x2: 3, y2: 4 }, expect: { 'Distance (2D)': 5 } },
      { name: '2d-zero', inputs: { mode: '2d', x1: 2, y1: 2, x2: 2, y2: 2 }, expect: { 'Distance (2D)': 0 } },
    ]
  },
  {
    id: 'midpoint',
    name: 'Midpoint Calculator',
    slug: 'midpoint',
    category: 'math',
    short: 'Find the midpoint between two points.',
    inputs: [
      { key: 'x1', label: 'x1', type: 'number', default: 1 },
      { key: 'y1', label: 'y1', type: 'number', default: 2 },
      { key: 'x2', label: 'x2', type: 'number', default: 5 },
      { key: 'y2', label: 'y2', type: 'number', default: 6 }
    ],
    compute: (raw) => {
      const x1 = num(raw.x1), y1 = num(raw.y1), x2 = num(raw.x2), y2 = num(raw.y2);
      return { results: [
        { label: 'Midpoint X', value: round((x1+x2)/2, 4), primary: true },
        { label: 'Midpoint Y', value: round((y1+y2)/2, 4), primary: true }
      ] };
    },
    formula: '((x1+x2)/2, (y1+y2)/2)',
    intro: ['Find midpoint.'],
    status: 'published',
    tests: [
      { name: 'mid', inputs: { x1:1, y1:2, x2:5, y2:6 }, expect: { 'Midpoint X': 3, 'Midpoint Y': 4 } },
      { name: 'same', inputs: { x1:1, y1:1, x2:1, y2:1 }, expect: { 'Midpoint X': 1, 'Midpoint Y': 1 } }
    ]
  },
  {
    id: 'arithmetic-sequence',
    name: 'Arithmetic Sequence',
    slug: 'arithmetic-sequence',
    category: 'math',
    short: 'Calculate nth term of arithmetic sequence.',
    inputs: [
      { key: 'a1', label: 'First term (a1)', type: 'number', default: 2 },
      { key: 'd', label: 'Common difference (d)', type: 'number', default: 3 },
      { key: 'n', label: 'Term number (n)', type: 'number', default: 10 }
    ],
    compute: (raw) => {
      const a1 = num(raw.a1), d = num(raw.d), n = num(raw.n);
      assert(n >= 1 && Number.isInteger(n), 'n must be integer >= 1');
      return { results: [{ label: 'nth Term', value: round(a1 + (n-1)*d, 4), primary: true }] };
    },
    formula: 'a_n = a_1 + (n-1)d',
    intro: ['Arithmetic progression.'],
    status: 'published',
    tests: [
      { name: 'seq', inputs: { a1:2, d:3, n:10 }, expect: { 'nth Term': 29 } },
      { name: 'seq2', inputs: { a1:0, d:5, n:3 }, expect: { 'nth Term': 10 } }
    ]
  },
  {
    id: 'geometric-sequence',
    name: 'Geometric Sequence',
    slug: 'geometric-sequence',
    category: 'math',
    short: 'Calculate nth term of geometric sequence.',
    inputs: [
      { key: 'a1', label: 'First term (a1)', type: 'number', default: 2 },
      { key: 'r', label: 'Common ratio (r)', type: 'number', default: 3 },
      { key: 'n', label: 'Term number (n)', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const a1 = num(raw.a1), r = num(raw.r), n = num(raw.n);
      assert(n >= 1 && Number.isInteger(n), 'n must be integer >= 1');
      return { results: [{ label: 'nth Term', value: round(a1 * Math.pow(r, n-1), 4), primary: true }] };
    },
    formula: 'a_n = a_1 * r^(n-1)',
    intro: ['Geometric progression.'],
    status: 'published',
    tests: [
      { name: 'seq', inputs: { a1:2, r:3, n:5 }, expect: { 'nth Term': 162 } },
      { name: 'seq2', inputs: { a1:1, r:2, n:4 }, expect: { 'nth Term': 8 } }
    ]
  },
  {
    id: 'probability',
    name: 'Probability Calculator',
    slug: 'probability',
    category: 'math',
    short: 'Calculate probability of independent events.',
    inputs: [
      { key: 'pA', label: 'P(A)', type: 'number', default: 0.5 },
      { key: 'pB', label: 'P(B)', type: 'number', default: 0.5 }
    ],
    compute: (raw) => {
      const pa = num(raw.pA), pb = num(raw.pB);
      assert(pa >= 0 && pa <= 1 && pb >= 0 && pb <= 1, 'Probabilities must be between 0 and 1');
      return { results: [
        { label: 'P(A and B)', value: round(pa * pb, 4), primary: true },
        { label: 'P(A or B)', value: round(pa + pb - pa * pb, 4) }
      ] };
    },
    formula: 'P(A and B) = P(A)*P(B)',
    intro: ['Independent probability.'],
    status: 'published',
    tests: [
      { name: 'prob', inputs: { pA: 0.5, pB: 0.5 }, expect: { 'P(A and B)': 0.25, 'P(A or B)': 0.75 } },
      { name: 'prob2', inputs: { pA: 1, pB: 0 }, expect: { 'P(A and B)': 0, 'P(A or B)': 1 } }
    ]
  },
  {
    id: 'scientific-notation',
    name: 'Scientific Notation',
    slug: 'scientific-notation',
    category: 'math',
    short: 'Convert to scientific notation.',
    inputs: [
      { key: 'val', label: 'Number', type: 'number', default: 12345 }
    ],
    compute: (raw) => {
      const v = num(raw.val);
      const parts = v.toExponential().split('e');
      return { results: [{ label: 'Scientific Notation', value: `${round(parseFloat(parts[0]), 4)} x 10^${parts[1].replace('+','')}`, primary: true }] };
    },
    formula: 'a x 10^n',
    intro: ['Scientific formatting.'],
    status: 'published',
    tests: [
      { name: 'sci', inputs: { val: 12345 }, expect: { 'Scientific Notation': '1.2345 x 10^4' } },
      { name: 'sci2', inputs: { val: 0.005 }, expect: { 'Scientific Notation': '5 x 10^-3' } }
    ]
  },
  {
    id: 'remainder',
    name: 'Remainder Calculator',
    slug: 'remainder',
    category: 'math',
    short: 'Calculate the remainder of division.',
    inputs: [
      { key: 'dividend', label: 'Dividend', type: 'number', default: 10 },
      { key: 'divisor', label: 'Divisor', type: 'number', default: 3 }
    ],
    compute: (raw) => {
      const a = num(raw.dividend), b = num(raw.divisor);
      assert(b !== 0, 'Cannot divide by zero');
      return { results: [
        { label: 'Quotient', value: Math.floor(a/b) },
        { label: 'Remainder', value: a % b, primary: true }
      ] };
    },
    formula: 'a = q * b + r',
    intro: ['Modulo arithmetic.'],
    status: 'published',
    tests: [
      { name: 'rem', inputs: { dividend: 10, divisor: 3 }, expect: { Remainder: 1 } },
      { name: 'rem2', inputs: { dividend: 10, divisor: 5 }, expect: { Remainder: 0 } }
    ]
  }

];
