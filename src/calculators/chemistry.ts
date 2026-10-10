import type { CalculatorDef } from '@/lib/calc/types';
import { round } from '@/lib/calc/helpers';

export const chemistryCalculators: CalculatorDef[] = [
  {
    id: 'molarity',
    name: 'Molarity Calculator',
    slug: 'molarity',
    category: 'chemistry',
    short: 'Calculate molarity of a solution.',
    inputs: [
      { key: 'n', label: 'Moles', type: 'number', default: 2 },
      { key: 'v', label: 'Volume (L)', type: 'number', default: 1 }
    ],
    compute: ({ n, v }) => ({ results: [{ label: 'Molarity', value: round(Number(n) / Number(v)) }] }),
    formula: 'M = n / V',
    intro: ['Calculate molarity.'],
    status: 'published',
    tests: [
      { name: 'mol 1', inputs: { n: 2, v: 1 }, expect: { Molarity: 2 } },
      { name: 'mol 2', inputs: { n: 0.5, v: 2 }, expect: { Molarity: 0.25 } }
    ]
  },
  {
    id: 'dilution',
    name: 'Dilution Calculator',
    slug: 'dilution',
    category: 'chemistry',
    short: 'Calculate dilution using M1V1 = M2V2.',
    inputs: [
      { key: 'm1', label: 'M1', type: 'number', optional: true },
      { key: 'v1', label: 'V1', type: 'number', optional: true, default: 1 },
      { key: 'm2', label: 'M2', type: 'number', optional: true, default: 2 },
      { key: 'v2', label: 'V2', type: 'number', optional: true, default: 2 }
    ],
    compute: ({ m1, v1, m2, v2 }) => {
      const n1 = Number(m1), n2 = Number(m2), nv1 = Number(v1), nv2 = Number(v2);
      if (isNaN(n1)) return { results: [{ label: 'M1', value: round((n2 * nv2) / nv1) }] };
      if (isNaN(nv1)) return { results: [{ label: 'V1', value: round((n2 * nv2) / n1) }] };
      if (isNaN(n2)) return { results: [{ label: 'M2', value: round((n1 * nv1) / nv2) }] };
      if (isNaN(nv2)) return { results: [{ label: 'V2', value: round((n1 * nv1) / n2) }] };
      throw new Error('Leave one field blank to calculate.');
    },
    formula: 'M1*V1 = M2*V2',
    intro: ['Calculate dilution.'],
    status: 'published',
    tests: [
      { name: 'dil 1', inputs: { v1: 1, m2: 2, v2: 2 }, expect: { M1: 4 } },
      { name: 'dil 2', inputs: { m1: 4, m2: 2, v2: 2 }, expect: { V1: 1 } }
    ]
  },
  {
    id: 'percent-concentration',
    name: 'Percent Concentration Calculator',
    slug: 'percent-concentration',
    category: 'chemistry',
    short: 'Calculate percent concentration.',
    inputs: [
      { key: 'solute', label: 'Mass of Solute', type: 'number', default: 10 },
      { key: 'solution', label: 'Mass of Solution', type: 'number', default: 100 }
    ],
    compute: ({ solute, solution }) => ({ results: [{ label: 'Percent', value: round((Number(solute) / Number(solution)) * 100) }] }),
    formula: '% = (m_solute / m_solution) * 100',
    intro: ['Calculate percent concentration.'],
    status: 'published',
    tests: [
      { name: 'perc 1', inputs: { solute: 10, solution: 100 }, expect: { Percent: 10 } },
      { name: 'perc 2', inputs: { solute: 5, solution: 50 }, expect: { Percent: 10 } }
    ]
  },
  {
    id: 'molar-mass',
    name: 'Molar Mass Calculator',
    slug: 'molar-mass',
    category: 'chemistry',
    short: 'Calculate molar mass from mass and moles.',
    inputs: [
      { key: 'm', label: 'Mass (g)', type: 'number', default: 18 },
      { key: 'n', label: 'Moles', type: 'number', default: 1 }
    ],
    compute: ({ m, n }) => ({ results: [{ label: 'Molar Mass', value: round(Number(m) / Number(n)) }] }),
    formula: 'MM = m / n',
    intro: ['Calculate molar mass.'],
    status: 'published',
    tests: [
      { name: 'mm 1', inputs: { m: 18, n: 1 }, expect: { "Molar Mass": 18 } },
      { name: 'mm 2', inputs: { m: 44, n: 2 }, expect: { "Molar Mass": 22 } }
    ]
  },
  {
    id: 'moles',
    name: 'Moles Calculator',
    slug: 'moles',
    category: 'chemistry',
    short: 'Calculate moles from mass and molar mass.',
    inputs: [
      { key: 'm', label: 'Mass (g)', type: 'number', default: 18 },
      { key: 'mm', label: 'Molar Mass', type: 'number', default: 18 }
    ],
    compute: ({ m, mm }) => ({ results: [{ label: 'Moles', value: round(Number(m) / Number(mm)) }] }),
    formula: 'n = m / MM',
    intro: ['Calculate moles.'],
    status: 'published',
    tests: [
      { name: 'mol 1', inputs: { m: 18, mm: 18 }, expect: { Moles: 1 } },
      { name: 'mol 2', inputs: { m: 36, mm: 18 }, expect: { Moles: 2 } }
    ]
  },
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law Calculator',
    slug: 'ideal-gas-law',
    category: 'chemistry',
    short: 'Calculate PV=nRT variables.',
    inputs: [
      { key: 'p', label: 'Pressure (atm)', type: 'number', optional: true },
      { key: 'v', label: 'Volume (L)', type: 'number', optional: true, default: 22.43 },
      { key: 'n', label: 'Moles', type: 'number', optional: true, default: 1 },
      { key: 't', label: 'Temperature (K)', type: 'number', optional: true, default: 273.15 }
    ],
    compute: ({ p, v, n, t }) => {
      const np = Number(p), nv = Number(v), nn = Number(n), nt = Number(t);
      const R = 0.0821;
      if (isNaN(np)) return { results: [{ label: 'Pressure', value: round((nn * R * nt) / nv) }] };
      if (isNaN(nv)) return { results: [{ label: 'Volume', value: round((nn * R * nt) / np) }] };
      if (isNaN(nn)) return { results: [{ label: 'Moles', value: round((np * nv) / (R * nt)) }] };
      if (isNaN(nt)) return { results: [{ label: 'Temperature', value: round((np * nv) / (nn * R)) }] };
      throw new Error('Leave one field blank.');
    },
    formula: 'PV = nRT',
    intro: ['Calculate Ideal Gas Law.'],
    status: 'published',
    tests: [
      { name: 'igl 1', inputs: { v: 10, n: 1, t: 273.15 }, expect: { Pressure: 2.24 } },
      { name: 'igl 2', inputs: { p: 1, n: 1, t: 273.15 }, expect: { Volume: 22.43 } }
    ]
  },
  {
    id: 'ph',
    name: 'pH Calculator',
    slug: 'ph',
    category: 'chemistry',
    short: 'Calculate pH from H+ concentration.',
    inputs: [
      { key: 'h', label: 'H+ Concentration', type: 'number', default: 0.001 }
    ],
    compute: ({ h }) => ({ results: [{ label: 'pH', value: round(-Math.log10(Number(h))) }] }),
    formula: 'pH = -log[H+]',
    intro: ['Calculate pH.'],
    status: 'published',
    tests: [
      { name: 'ph 1', inputs: { h: 0.001 }, expect: { pH: 3 } },
      { name: 'ph 2', inputs: { h: 1e-7 }, expect: { pH: 7 } }
    ]
  },
  {
    id: 'half-life',
    name: 'Half-Life Calculator',
    slug: 'half-life',
    category: 'chemistry',
    short: 'Calculate remaining amount based on half-life.',
    inputs: [
      { key: 'n0', label: 'Initial Amount', type: 'number', default: 100 },
      { key: 't', label: 'Time Elapsed', type: 'number', default: 10 },
      { key: 'th', label: 'Half-Life', type: 'number', default: 10 }
    ],
    compute: ({ n0, t, th }) => ({ results: [{ label: 'Remaining', value: round(Number(n0) * Math.pow(0.5, Number(t) / Number(th))) }] }),
    formula: 'N(t) = N0 * (1/2)^(t/t1/2)',
    intro: ['Calculate half-life.'],
    status: 'published',
    tests: [
      { name: 'hl 1', inputs: { n0: 100, t: 10, th: 10 }, expect: { Remaining: 50 } },
      { name: 'hl 2', inputs: { n0: 100, t: 20, th: 10 }, expect: { Remaining: 25 } }
    ]
  }
];
