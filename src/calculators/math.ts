import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num } from '../lib/calc/helpers';

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
];
