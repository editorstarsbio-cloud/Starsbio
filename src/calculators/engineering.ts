import type { CalculatorDef } from '@/lib/calc/types';
import { round } from '@/lib/calc/helpers';

export const engineeringCalculators: CalculatorDef[] = [
  {
    id: 'voltage-divider',
    name: 'Voltage Divider Calculator',
    slug: 'voltage-divider',
    category: 'engineering',
    short: 'Calculate voltage divider output.',
    inputs: [
      { key: 'vin', label: 'Input Voltage', type: 'number', default: 10 },
      { key: 'r1', label: 'R1', type: 'number', default: 1000 },
      { key: 'r2', label: 'R2', type: 'number', default: 1000 }
    ],
    compute: ({ vin, r1, r2 }) => ({ results: [{ label: 'Vout', value: round(Number(vin) * (Number(r2) / (Number(r1) + Number(r2)))) }] }),
    formula: 'Vout = Vin * (R2 / (R1 + R2))',
    intro: ['Calculate voltage divider output.'],
    status: 'published',
    tests: [
      { name: 'vd 1', inputs: { vin: 10, r1: 1000, r2: 1000 }, expect: { Vout: 5 } },
      { name: 'vd 2', inputs: { vin: 5, r1: 100, r2: 300 }, expect: { Vout: 3.75 } }
    ]
  },
  {
    id: 'resistor',
    name: 'Resistor Calculator',
    slug: 'resistor',
    category: 'engineering',
    short: 'Calculate equivalent resistance for series and parallel.',
    inputs: [
      { key: 'r1', label: 'R1', type: 'number', default: 100 },
      { key: 'r2', label: 'R2', type: 'number', default: 100 }
    ],
    compute: ({ r1, r2 }) => {
      const nr1 = Number(r1), nr2 = Number(r2);
      return {
        results: [
          { label: 'Series', value: round(nr1 + nr2) },
          { label: 'Parallel', value: round(1 / ((1 / nr1) + (1 / nr2))) }
        ]
      };
    },
    formula: 'Rs = R1+R2, Rp = 1/(1/R1 + 1/R2)',
    intro: ['Calculate equivalent resistance.'],
    status: 'published',
    tests: [
      { name: 'res 1', inputs: { r1: 100, r2: 100 }, expect: { Series: 200, Parallel: 50 } },
      { name: 'res 2', inputs: { r1: 300, r2: 600 }, expect: { Series: 900, Parallel: 200 } }
    ]
  },
  {
    id: 'capacitor',
    name: 'Capacitor Calculator',
    slug: 'capacitor',
    category: 'engineering',
    short: 'Calculate equivalent capacitance for series and parallel.',
    inputs: [
      { key: 'c1', label: 'C1', type: 'number', default: 10 },
      { key: 'c2', label: 'C2', type: 'number', default: 10 }
    ],
    compute: ({ c1, c2 }) => {
      const nc1 = Number(c1), nc2 = Number(c2);
      return {
        results: [
          { label: 'Series', value: round(1 / ((1 / nc1) + (1 / nc2))) },
          { label: 'Parallel', value: round(nc1 + nc2) }
        ]
      };
    },
    formula: 'Cs = 1/(1/C1 + 1/C2), Cp = C1+C2',
    intro: ['Calculate equivalent capacitance.'],
    status: 'published',
    tests: [
      { name: 'cap 1', inputs: { c1: 10, c2: 10 }, expect: { Series: 5, Parallel: 20 } },
      { name: 'cap 2', inputs: { c1: 30, c2: 60 }, expect: { Series: 20, Parallel: 90 } }
    ]
  },
  {
    id: 'voltage-drop',
    name: 'Voltage Drop Calculator',
    slug: 'voltage-drop',
    category: 'engineering',
    short: 'Calculate voltage drop across a wire.',
    inputs: [
      { key: 'i', label: 'Current (A)', type: 'number', default: 10 },
      { key: 'r', label: 'Resistance/1000ft', type: 'number', default: 1 },
      { key: 'l', label: 'Length (ft)', type: 'number', default: 100 }
    ],
    compute: ({ i, r, l }) => ({ results: [{ label: 'Drop', value: round(2 * Number(l) * Number(r) * Number(i) / 1000) }] }),
    formula: 'Vd = (2 * L * R * I) / 1000',
    intro: ['Calculate voltage drop.'],
    status: 'published',
    tests: [
      { name: 'vd 1', inputs: { i: 10, r: 1, l: 100 }, expect: { Drop: 2 } },
      { name: 'vd 2', inputs: { i: 5, r: 2, l: 50 }, expect: { Drop: 1 } }
    ]
  },
  {
    id: 'beam-deflection',
    name: 'Beam Deflection Calculator',
    slug: 'beam-deflection',
    category: 'engineering',
    short: 'Calculate beam deflection (center point load).',
    inputs: [
      { key: 'f', label: 'Force', type: 'number', default: 1000 },
      { key: 'l', label: 'Length', type: 'number', default: 10 },
      { key: 'e', label: 'Modulus of Elasticity', type: 'number', default: 10000 },
      { key: 'i', label: 'Moment of Inertia', type: 'number', default: 100 }
    ],
    compute: ({ f, l, e, i }) => ({ results: [{ label: 'Deflection', value: round((Number(f) * Math.pow(Number(l), 3)) / (48 * Number(e) * Number(i))) }] }),
    formula: 'd = FL^3 / 48EI',
    intro: ['Calculate beam deflection.'],
    status: 'published',
    tests: [
      { name: 'bd 1', inputs: { f: 1000, l: 10, e: 10000, i: 100 }, expect: { Deflection: 0.02 } },
      { name: 'bd 2', inputs: { f: 500, l: 20, e: 20000, i: 50 }, expect: { Deflection: 0.08 } }
    ]
  },
  {
    id: 'gear-ratio',
    name: 'Gear Ratio Calculator',
    slug: 'gear-ratio',
    category: 'engineering',
    short: 'Calculate gear ratio for two gears.',
    inputs: [
      { key: 'n1', label: 'Teeth 1 (Driver)', type: 'number', default: 10 },
      { key: 'n2', label: 'Teeth 2 (Driven)', type: 'number', default: 20 }
    ],
    compute: ({ n1, n2 }) => ({ results: [{ label: 'Ratio', value: round(Number(n2) / Number(n1)) }] }),
    formula: 'GR = N2 / N1',
    intro: ['Calculate gear ratio.'],
    status: 'published',
    tests: [
      { name: 'gr 1', inputs: { n1: 10, n2: 20 }, expect: { Ratio: 2 } },
      { name: 'gr 2', inputs: { n1: 15, n2: 45 }, expect: { Ratio: 3 } }
    ]
  },
  {
    id: 'torque',
    name: 'Torque Calculator',
    slug: 'torque',
    category: 'engineering',
    short: 'Calculate torque from force and radius.',
    inputs: [
      { key: 'f', label: 'Force', type: 'number', default: 10 },
      { key: 'r', label: 'Radius', type: 'number', default: 2 }
    ],
    compute: ({ f, r }) => ({ results: [{ label: 'Torque', value: round(Number(f) * Number(r)) }] }),
    formula: 'T = F * r',
    intro: ['Calculate torque.'],
    status: 'published',
    tests: [
      { name: 'tq 1', inputs: { f: 10, r: 2 }, expect: { Torque: 20 } },
      { name: 'tq 2', inputs: { f: 5, r: 5 }, expect: { Torque: 25 } }
    ]
  },
  {
    id: 'stress-strain',
    name: 'Stress Strain Calculator',
    slug: 'stress-strain',
    category: 'engineering',
    short: 'Calculate stress and strain from dimensions.',
    inputs: [
      { key: 'f', label: 'Force', type: 'number', default: 100 },
      { key: 'a', label: 'Area', type: 'number', default: 2 },
      { key: 'dl', label: 'Change in Length', type: 'number', default: 0.1 },
      { key: 'l', label: 'Original Length', type: 'number', default: 10 }
    ],
    compute: ({ f, a, dl, l }) => {
      return {
        results: [
          { label: 'Stress', value: round(Number(f) / Number(a)) },
          { label: 'Strain', value: round(Number(dl) / Number(l), 4) }
        ]
      };
    },
    formula: 'Stress = F/A, Strain = dL/L',
    intro: ['Calculate stress and strain.'],
    status: 'published',
    tests: [
      { name: 'ss 1', inputs: { f: 100, a: 2, dl: 0.1, l: 10 }, expect: { Stress: 50, Strain: 0.01 } },
      { name: 'ss 2', inputs: { f: 200, a: 4, dl: 0.2, l: 20 }, expect: { Stress: 50, Strain: 0.01 } }
    ]
  }
];
