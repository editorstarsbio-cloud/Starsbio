import { CalculatorDef } from '../lib/calc/types';
import { num, assert, round } from '../lib/calc/helpers';

export const constructionCalculators: CalculatorDef[] = [
  {
    id: 'concrete-calculator',
    name: 'Concrete Calculator',
    slug: 'concrete',
    category: 'construction',
    short: 'Calculate the volume of concrete needed in cubic yards and number of bags.',
    inputs: [
      { key: 'length', label: 'Length', type: 'number', default: 10, unit: 'ft' },
      { key: 'width', label: 'Width', type: 'number', default: 10, unit: 'ft' },
      { key: 'thickness', label: 'Thickness', type: 'number', default: 4, unit: 'in' },
    ],
    compute(values) {
      const l = num(values.length);
      const w = num(values.width);
      const t = num(values.thickness);
      assert(l > 0 && w > 0 && t > 0, 'Dimensions must be greater than zero.');
      const cuFt = l * w * (t / 12);
      const cuYd = cuFt / 27;
      const bags = cuFt / 0.6;
      return {
        results: [
          { label: 'Cubic Yards', value: round(cuYd, 2), unit: 'yd³', primary: true },
          { label: '80lb Bags (approx)', value: Math.ceil(bags), unit: 'bags' }
        ]
      };
    },
    formula: 'Volume = Length × Width × (Thickness / 12)',
    intro: ['Calculate the amount of concrete needed for a slab, patio, or footing.'],
    howTo: ['Enter the length and width in feet.', 'Enter the thickness in inches.', 'Get the volume in cubic yards.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { length: 10, width: 10, thickness: 4 }, expect: { 'Cubic Yards': 1.23 } }, { name: 'test 2', inputs: { length: 10, width: 10, thickness: 4 }, expect: { 'Cubic Yards': 1.23 } } ]
  },
  {
    id: 'gravel-calculator',
    name: 'Gravel Calculator',
    slug: 'gravel',
    category: 'construction',
    short: 'Estimate the volume and weight of gravel required for your driveway or path.',
    inputs: [
      { key: 'length', label: 'Length', type: 'number', default: 20, unit: 'ft' },
      { key: 'width', label: 'Width', type: 'number', default: 10, unit: 'ft' },
      { key: 'depth', label: 'Depth', type: 'number', default: 2, unit: 'in' },
    ],
    compute(values) {
      const l = num(values.length);
      const w = num(values.width);
      const d = num(values.depth);
      assert(l > 0 && w > 0 && d > 0, 'Dimensions must be greater than zero.');
      const cuFt = l * w * (d / 12);
      const cuYd = cuFt / 27;
      const tons = cuYd * 1.4;
      return {
        results: [
          { label: 'Volume', value: round(cuYd, 2), unit: 'yd³', primary: true },
          { label: 'Weight', value: round(tons, 2), unit: 'tons' }
        ]
      };
    },
    formula: 'Volume = Length × Width × (Depth / 12)',
    intro: ['Find out how much gravel you need in cubic yards and tons.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { length: 20, width: 10, depth: 2 } }, { name: 'test 2', inputs: { length: 20, width: 10, depth: 2 } } ]
  },
  {
    id: 'square-footage-calculator',
    name: 'Square Footage Calculator',
    slug: 'square-footage',
    category: 'construction',
    short: 'Easily calculate the square footage of any rectangular room or space.',
    inputs: [
      { key: 'length', label: 'Length', type: 'number', default: 12, unit: 'ft' },
      { key: 'width', label: 'Width', type: 'number', default: 10, unit: 'ft' },
    ],
    compute(values) {
      const l = num(values.length);
      const w = num(values.width);
      assert(l > 0 && w > 0, 'Dimensions must be positive.');
      return {
        results: [
          { label: 'Area', value: round(l * w, 2), unit: 'sq ft', primary: true }
        ]
      };
    },
    formula: 'Area = Length × Width',
    intro: ['Calculate the area of a rectangular space.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { length: 12, width: 10 } }, { name: 'test 2', inputs: { length: 12, width: 10 } } ]
  },
  {
    id: 'flooring-calculator',
    name: 'Flooring Calculator',
    slug: 'flooring',
    category: 'construction',
    short: 'Determine the amount of flooring needed, including a waste factor.',
    inputs: [
      { key: 'length', label: 'Length', type: 'number', default: 12, unit: 'ft' },
      { key: 'width', label: 'Width', type: 'number', default: 10, unit: 'ft' },
      { key: 'waste', label: 'Waste Percentage', type: 'number', default: 10, unit: '%' },
    ],
    compute(values) {
      const l = num(values.length);
      const w = num(values.width);
      const waste = num(values.waste);
      assert(l > 0 && w > 0 && waste >= 0, 'Valid inputs required.');
      const area = l * w;
      const total = area * (1 + waste / 100);
      return {
        results: [
          { label: 'Net Area', value: round(area, 2), unit: 'sq ft' },
          { label: 'Total Needed', value: round(total, 2), unit: 'sq ft', primary: true }
        ]
      };
    },
    formula: 'Total = (Length × Width) × (1 + Waste %)',
    intro: ['Calculate flooring needs with waste.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { length: 12, width: 10, waste: 10 } }, { name: 'test 2', inputs: { length: 12, width: 10, waste: 10 } } ]
  },
  {
    id: 'paint-calculator',
    name: 'Paint Calculator',
    slug: 'paint',
    category: 'construction',
    short: 'Calculate how many gallons of paint you need for a given wall area.',
    inputs: [
      { key: 'area', label: 'Wall Area', type: 'number', default: 400, unit: 'sq ft' },
      { key: 'coverage', label: 'Coverage per Gallon', type: 'number', default: 350, unit: 'sq ft/gal' },
      { key: 'coats', label: 'Number of Coats', type: 'number', default: 2, unit: 'coats' },
    ],
    compute(values) {
      const a = num(values.area);
      const cov = num(values.coverage);
      const coats = num(values.coats);
      assert(a > 0 && cov > 0 && coats > 0, 'Values must be positive.');
      const gals = (a * coats) / cov;
      return {
        results: [
          { label: 'Total Gallons', value: round(gals, 2), unit: 'gal', primary: true },
          { label: 'Gallons to Buy', value: Math.ceil(gals), unit: 'gal' }
        ]
      };
    },
    formula: 'Gallons = (Area × Coats) / Coverage',
    intro: ['Estimate paint gallons.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { area: 400, coverage: 350, coats: 2 } }, { name: 'test 2', inputs: { area: 400, coverage: 350, coats: 2 } } ]
  },
  {
    id: 'roofing-calculator',
    name: 'Roofing Calculator',
    slug: 'roofing',
    category: 'construction',
    short: 'Estimate roofing materials by calculating the number of roofing squares.',
    inputs: [
      { key: 'area', label: 'Base Area', type: 'number', default: 1500, unit: 'sq ft' },
      { key: 'pitch', label: 'Roof Pitch (x/12)', type: 'number', default: 6 },
    ],
    compute(values) {
      const a = num(values.area);
      const p = num(values.pitch);
      assert(a > 0 && p >= 0, 'Valid inputs required.');
      const multiplier = Math.sqrt(1 + Math.pow(p / 12, 2));
      const roofArea = a * multiplier;
      const squares = roofArea / 100;
      return {
        results: [
          { label: 'Roof Area', value: round(roofArea, 2), unit: 'sq ft' },
          { label: 'Roofing Squares', value: round(squares, 2), unit: 'squares', primary: true }
        ]
      };
    },
    formula: 'Roof Area = Base Area × sqrt(1 + (Pitch/12)^2)',
    intro: ['Calculate roofing squares.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { area: 1500, pitch: 6 } }, { name: 'test 2', inputs: { area: 1500, pitch: 6 } } ]
  },
  {
    id: 'tile-calculator',
    name: 'Tile Calculator',
    slug: 'tile',
    category: 'construction',
    short: 'Find out exactly how many tiles you need for a given floor or wall area.',
    inputs: [
      { key: 'area', label: 'Total Area', type: 'number', default: 100, unit: 'sq ft' },
      { key: 'tileLength', label: 'Tile Length', type: 'number', default: 12, unit: 'in' },
      { key: 'tileWidth', label: 'Tile Width', type: 'number', default: 12, unit: 'in' },
      { key: 'waste', label: 'Waste Percentage', type: 'number', default: 10, unit: '%' },
    ],
    compute(values) {
      const a = num(values.area);
      const tl = num(values.tileLength);
      const tw = num(values.tileWidth);
      const w = num(values.waste);
      assert(a > 0 && tl > 0 && tw > 0 && w >= 0, 'Positive values required.');
      const tileAreaSqFt = (tl * tw) / 144;
      const tiles = a / tileAreaSqFt;
      const totalTiles = Math.ceil(tiles * (1 + w / 100));
      return {
        results: [
          { label: 'Tiles Needed', value: totalTiles, unit: 'tiles', primary: true }
        ]
      };
    },
    formula: 'Tiles = Area / Tile Area',
    intro: ['Calculate tile requirements.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { area: 100, tileLength: 12, tileWidth: 12, waste: 10 } }, { name: 'test 2', inputs: { area: 100, tileLength: 12, tileWidth: 12, waste: 10 } } ]
  },
  {
    id: 'drywall-calculator',
    name: 'Drywall Calculator',
    slug: 'drywall',
    category: 'construction',
    short: 'Estimate the number of drywall sheets required for a specific wall area.',
    inputs: [
      { key: 'area', label: 'Wall/Ceiling Area', type: 'number', default: 500, unit: 'sq ft' },
      { key: 'sheetSize', label: 'Sheet Size', type: 'select', default: '32', options: [{label: '4x8 (32 sq ft)', value: '32'}, {label: '4x12 (48 sq ft)', value: '48'}] },
    ],
    compute(values) {
      const a = num(values.area);
      const size = num(values.sheetSize);
      assert(a > 0 && size > 0, 'Positive area required.');
      const sheets = Math.ceil((a * 1.1) / size); // 10% waste
      return {
        results: [
          { label: 'Sheets Needed', value: sheets, unit: 'sheets', primary: true }
        ],
        notes: ['Includes 10% waste factor.']
      };
    },
    formula: 'Sheets = (Area × 1.1) / Sheet Size',
    intro: ['Calculate drywall sheets.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { area: 500, sheetSize: '32' } }, { name: 'test 2', inputs: { area: 500, sheetSize: '32' } } ]
  },
  {
    id: 'brick-calculator',
    name: 'Brick Calculator',
    slug: 'brick',
    category: 'construction',
    short: 'Determine the total number of bricks needed to build a wall of a given size.',
    inputs: [
      { key: 'area', label: 'Wall Area', type: 'number', default: 100, unit: 'sq ft' },
      { key: 'brickPerSqFt', label: 'Bricks per Sq Ft', type: 'number', default: 7 },
    ],
    compute(values) {
      const a = num(values.area);
      const b = num(values.brickPerSqFt);
      assert(a > 0 && b > 0, 'Positive values required.');
      const total = Math.ceil(a * b * 1.05); // 5% waste
      return {
        results: [
          { label: 'Total Bricks', value: total, unit: 'bricks', primary: true }
        ],
        notes: ['Includes 5% waste factor.']
      };
    },
    formula: 'Bricks = Area × Bricks per Sq Ft × 1.05',
    intro: ['Calculate brick requirements.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { area: 100, brickPerSqFt: 7 } }, { name: 'test 2', inputs: { area: 100, brickPerSqFt: 7 } } ]
  },
  {
    id: 'stair-calculator',
    name: 'Stair Calculator',
    slug: 'stair',
    category: 'construction',
    short: 'Calculate stair stringer dimensions including the number of risers and treads.',
    inputs: [
      { key: 'rise', label: 'Total Rise', type: 'number', default: 105, unit: 'in' },
      { key: 'targetRiser', label: 'Target Riser Height', type: 'number', default: 7.25, unit: 'in' },
    ],
    compute(values) {
      const r = num(values.rise);
      const target = num(values.targetRiser);
      assert(r > 0 && target > 0, 'Positive values required.');
      const steps = Math.round(r / target);
      const actualRiser = r / steps;
      return {
        results: [
          { label: 'Number of Steps', value: steps, primary: true },
          { label: 'Actual Riser Height', value: round(actualRiser, 2), unit: 'in' }
        ]
      };
    },
    formula: 'Steps = round(Total Rise / Target Riser)',
    intro: ['Calculate stair dimensions.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { rise: 105, targetRiser: 7.25 } }, { name: 'test 2', inputs: { rise: 105, targetRiser: 7.25 } } ]
  },
  {
    id: 'mulch-calculator',
    name: 'Mulch Calculator',
    slug: 'mulch',
    category: 'construction',
    short: 'Quickly estimate the amount of mulch needed for your landscaping projects.',
    inputs: [
      { key: 'length', label: 'Length', type: 'number', default: 20, unit: 'ft' },
      { key: 'width', label: 'Width', type: 'number', default: 5, unit: 'ft' },
      { key: 'depth', label: 'Depth', type: 'number', default: 3, unit: 'in' },
    ],
    compute(values) {
      const l = num(values.length);
      const w = num(values.width);
      const d = num(values.depth);
      assert(l > 0 && w > 0 && d > 0, 'Dimensions must be greater than zero.');
      const cuFt = l * w * (d / 12);
      const cuYd = cuFt / 27;
      const bags2cf = Math.ceil(cuFt / 2);
      return {
        results: [
          { label: 'Volume', value: round(cuYd, 2), unit: 'yd³', primary: true },
          { label: '2 cu ft Bags', value: bags2cf, unit: 'bags' }
        ]
      };
    },
    formula: 'Volume = Length × Width × (Depth / 12)',
    intro: ['Estimate mulch needs.'],
    status: 'published',
    tests: [ { name: 'Default', inputs: { length: 20, width: 5, depth: 3 } }, { name: 'test 2', inputs: { length: 20, width: 5, depth: 3 } } ]
  }
];
