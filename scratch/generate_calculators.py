import os

physics = """import type { CalculatorDef } from '@/lib/calc/types';
import { round } from '@/lib/calc/helpers';

export const physicsCalculators: CalculatorDef[] = [
  {
    id: 'speed',
    name: 'Speed Calculator',
    slug: 'speed',
    category: 'physics',
    short: 'Calculate speed, distance, or time easily.',
    inputs: [
      { key: 'distance', label: 'Distance', type: 'number', optional: true, default: 100 },
      { key: 'time', label: 'Time', type: 'number', optional: true, default: 10 },
      { key: 'speed', label: 'Speed', type: 'number', optional: true, default: 10 },
    ],
    compute: ({ distance, time, speed }) => {
      const d = Number(distance);
      const t = Number(time);
      const s = Number(speed);
      if (!isNaN(d) && !isNaN(t)) {
        if (t === 0) throw new Error('Time cannot be zero.');
        return { results: [{ label: 'Speed', value: round(d / t) }] };
      }
      if (!isNaN(d) && !isNaN(s)) {
        if (s === 0) throw new Error('Speed cannot be zero.');
        return { results: [{ label: 'Time', value: round(d / s) }] };
      }
      if (!isNaN(s) && !isNaN(t)) return { results: [{ label: 'Distance', value: round(s * t) }] };
      throw new Error('Please enter any two values.');
    },
    formula: 'v = d / t',
    intro: ['Calculate speed, distance, or time by entering the other two values.'],
    status: 'published',
    tests: [
      { name: 'speed', inputs: { distance: 100, time: 10 }, expect: { Speed: 10 } },
      { name: 'distance', inputs: { speed: 10, time: 10 }, expect: { Distance: 100 } }
    ]
  },
  {
    id: 'velocity',
    name: 'Velocity Calculator',
    slug: 'velocity',
    category: 'physics',
    short: 'Calculate velocity from displacement.',
    inputs: [
      { key: 'displacement', label: 'Displacement', type: 'number', optional: true, default: 100 },
      { key: 'time', label: 'Time', type: 'number', optional: true, default: 10 },
      { key: 'velocity', label: 'Velocity', type: 'number', optional: true, default: 10 }
    ],
    compute: ({ displacement: d, time: t, velocity: v }) => {
      const numD = Number(d); const numT = Number(t); const numV = Number(v);
      if (!isNaN(numD) && !isNaN(numT)) return { results: [{ label: 'Velocity', value: round(numD / numT) }] };
      if (!isNaN(numD) && !isNaN(numV)) return { results: [{ label: 'Time', value: round(numD / numV) }] };
      if (!isNaN(numV) && !isNaN(numT)) return { results: [{ label: 'Displacement', value: round(numV * numT) }] };
      throw new Error('Please enter any two values.');
    },
    formula: 'v = Δx / Δt',
    intro: ['Calculate velocity.'],
    status: 'published',
    tests: [
      { name: 'velocity', inputs: { displacement: 100, time: 10 }, expect: { Velocity: 10 } },
      { name: 'displacement', inputs: { velocity: 10, time: 10 }, expect: { Displacement: 100 } }
    ]
  },
  {
    id: 'acceleration',
    name: 'Acceleration Calculator',
    slug: 'acceleration',
    category: 'physics',
    short: 'Calculate acceleration from velocity.',
    inputs: [
      { key: 'vi', label: 'Initial Velocity', type: 'number', default: 0 },
      { key: 'vf', label: 'Final Velocity', type: 'number', default: 10 },
      { key: 't', label: 'Time', type: 'number', default: 2 }
    ],
    compute: ({ vi, vf, t }) => {
      return { results: [{ label: 'Acceleration', value: round((Number(vf) - Number(vi)) / Number(t)) }] };
    },
    formula: 'a = (vf - vi) / t',
    intro: ['Calculate acceleration.'],
    status: 'published',
    tests: [
      { name: 'accel 1', inputs: { vi: 0, vf: 10, t: 2 }, expect: { Acceleration: 5 } },
      { name: 'accel 2', inputs: { vi: 10, vf: 20, t: 2 }, expect: { Acceleration: 5 } }
    ]
  },
  {
    id: 'force',
    name: 'Force Calculator',
    slug: 'force',
    category: 'physics',
    short: 'Calculate force using Newton\\'s second law.',
    inputs: [
      { key: 'm', label: 'Mass', type: 'number', default: 10 },
      { key: 'a', label: 'Acceleration', type: 'number', default: 2 }
    ],
    compute: ({ m, a }) => ({ results: [{ label: 'Force', value: round(Number(m) * Number(a)) }] }),
    formula: 'F = m * a',
    intro: ['Calculate force.'],
    status: 'published',
    tests: [
      { name: 'force 1', inputs: { m: 10, a: 2 }, expect: { Force: 20 } },
      { name: 'force 2', inputs: { m: 5, a: 5 }, expect: { Force: 25 } }
    ]
  },
  {
    id: 'work',
    name: 'Work Calculator',
    slug: 'work',
    category: 'physics',
    short: 'Calculate work done by a force.',
    inputs: [
      { key: 'f', label: 'Force', type: 'number', default: 10 },
      { key: 'd', label: 'Distance', type: 'number', default: 2 }
    ],
    compute: ({ f, d }) => ({ results: [{ label: 'Work', value: round(Number(f) * Number(d)) }] }),
    formula: 'W = F * d',
    intro: ['Calculate work.'],
    status: 'published',
    tests: [
      { name: 'work 1', inputs: { f: 10, d: 2 }, expect: { Work: 20 } },
      { name: 'work 2', inputs: { f: 5, d: 5 }, expect: { Work: 25 } }
    ]
  },
  {
    id: 'power',
    name: 'Power Calculator',
    slug: 'power',
    category: 'physics',
    short: 'Calculate power from work and time.',
    inputs: [
      { key: 'w', label: 'Work', type: 'number', default: 20 },
      { key: 't', label: 'Time', type: 'number', default: 2 }
    ],
    compute: ({ w, t }) => ({ results: [{ label: 'Power', value: round(Number(w) / Number(t)) }] }),
    formula: 'P = W / t',
    intro: ['Calculate power.'],
    status: 'published',
    tests: [
      { name: 'power 1', inputs: { w: 20, t: 2 }, expect: { Power: 10 } },
      { name: 'power 2', inputs: { w: 10, t: 2 }, expect: { Power: 5 } }
    ]
  },
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy Calculator',
    slug: 'kinetic-energy',
    category: 'physics',
    short: 'Calculate kinetic energy of an object.',
    inputs: [
      { key: 'm', label: 'Mass', type: 'number', default: 10 },
      { key: 'v', label: 'Velocity', type: 'number', default: 2 }
    ],
    compute: ({ m, v }) => ({ results: [{ label: 'Kinetic Energy', value: round(0.5 * Number(m) * Number(v) ** 2) }] }),
    formula: 'KE = 1/2 * m * v^2',
    intro: ['Calculate kinetic energy.'],
    status: 'published',
    tests: [
      { name: 'ke 1', inputs: { m: 10, v: 2 }, expect: { "Kinetic Energy": 20 } },
      { name: 'ke 2', inputs: { m: 2, v: 4 }, expect: { "Kinetic Energy": 16 } }
    ]
  },
  {
    id: 'potential-energy',
    name: 'Potential Energy Calculator',
    slug: 'potential-energy',
    category: 'physics',
    short: 'Calculate potential energy of an object.',
    inputs: [
      { key: 'm', label: 'Mass', type: 'number', default: 10 },
      { key: 'h', label: 'Height', type: 'number', default: 2 }
    ],
    compute: ({ m, h }) => ({ results: [{ label: 'Potential Energy', value: round(Number(m) * 9.81 * Number(h)) }] }),
    formula: 'PE = mgh',
    intro: ['Calculate potential energy (g = 9.81 m/s²).'],
    status: 'published',
    tests: [
      { name: 'pe 1', inputs: { m: 10, h: 2 }, expect: { "Potential Energy": 196.2 } },
      { name: 'pe 2', inputs: { m: 2, h: 5 }, expect: { "Potential Energy": 98.1 } }
    ]
  },
  {
    id: 'momentum',
    name: 'Momentum Calculator',
    slug: 'momentum',
    category: 'physics',
    short: 'Calculate momentum of a moving object.',
    inputs: [
      { key: 'm', label: 'Mass', type: 'number', default: 10 },
      { key: 'v', label: 'Velocity', type: 'number', default: 2 }
    ],
    compute: ({ m, v }) => ({ results: [{ label: 'Momentum', value: round(Number(m) * Number(v)) }] }),
    formula: 'p = m * v',
    intro: ['Calculate momentum.'],
    status: 'published',
    tests: [
      { name: 'mom 1', inputs: { m: 10, v: 2 }, expect: { Momentum: 20 } },
      { name: 'mom 2', inputs: { m: 5, v: 3 }, expect: { Momentum: 15 } }
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure Calculator',
    slug: 'pressure',
    category: 'physics',
    short: 'Calculate pressure from force and area.',
    inputs: [
      { key: 'f', label: 'Force', type: 'number', default: 10 },
      { key: 'a', label: 'Area', type: 'number', default: 2 }
    ],
    compute: ({ f, a }) => ({ results: [{ label: 'Pressure', value: round(Number(f) / Number(a)) }] }),
    formula: 'P = F / A',
    intro: ['Calculate pressure.'],
    status: 'published',
    tests: [
      { name: 'pres 1', inputs: { f: 10, a: 2 }, expect: { Pressure: 5 } },
      { name: 'pres 2', inputs: { f: 20, a: 4 }, expect: { Pressure: 5 } }
    ]
  },
  {
    id: 'density',
    name: 'Density Calculator',
    slug: 'density',
    category: 'physics',
    short: 'Calculate density from mass and volume.',
    inputs: [
      { key: 'm', label: 'Mass', type: 'number', default: 10 },
      { key: 'v', label: 'Volume', type: 'number', default: 2 }
    ],
    compute: ({ m, v }) => ({ results: [{ label: 'Density', value: round(Number(m) / Number(v)) }] }),
    formula: 'd = m / V',
    intro: ['Calculate density.'],
    status: 'published',
    tests: [
      { name: 'den 1', inputs: { m: 10, v: 2 }, expect: { Density: 5 } },
      { name: 'den 2', inputs: { m: 20, v: 4 }, expect: { Density: 5 } }
    ]
  },
  {
    id: 'ohms-law',
    name: 'Ohms Law Calculator',
    slug: 'ohms-law',
    category: 'physics',
    short: 'Calculate voltage, current, or resistance.',
    inputs: [
      { key: 'v', label: 'Voltage', type: 'number', optional: true, default: 10 },
      { key: 'i', label: 'Current', type: 'number', optional: true, default: 2 },
      { key: 'r', label: 'Resistance', type: 'number', optional: true, default: 5 }
    ],
    compute: ({ v, i, r }) => {
      const numV = Number(v), numI = Number(i), numR = Number(r);
      if (!isNaN(numI) && !isNaN(numR)) return { results: [{ label: 'Voltage', value: round(numI * numR) }] };
      if (!isNaN(numV) && !isNaN(numI)) return { results: [{ label: 'Resistance', value: round(numV / numI) }] };
      if (!isNaN(numV) && !isNaN(numR)) return { results: [{ label: 'Current', value: round(numV / numR) }] };
      throw new Error('Please enter any two values.');
    },
    formula: 'V = I * R',
    intro: ['Calculate voltage, current, or resistance.'],
    status: 'published',
    tests: [
      { name: 'ohm 1', inputs: { i: 2, r: 5 }, expect: { Voltage: 10 } },
      { name: 'ohm 2', inputs: { v: 10, i: 2 }, expect: { Resistance: 5 } }
    ]
  },
  {
    id: 'projectile-motion',
    name: 'Projectile Motion Calculator',
    slug: 'projectile-motion',
    category: 'physics',
    short: 'Calculate flight time and max height.',
    inputs: [
      { key: 'v', label: 'Initial Velocity', type: 'number', default: 10 },
      { key: 'angle', label: 'Angle (degrees)', type: 'number', default: 45 }
    ],
    compute: ({ v, angle }) => {
      const v0 = Number(v);
      const theta = Number(angle) * (Math.PI / 180);
      const g = 9.81;
      const t = (2 * v0 * Math.sin(theta)) / g;
      const h = (v0 ** 2 * Math.sin(theta) ** 2) / (2 * g);
      return { results: [{ label: 'Time of Flight', value: round(t) }, { label: 'Max Height', value: round(h) }] };
    },
    formula: 't = 2v*sin(θ)/g, h = v^2*sin^2(θ)/2g',
    intro: ['Calculate projectile motion metrics.'],
    status: 'published',
    tests: [
      { name: 'proj 1', inputs: { v: 10, angle: 45 }, expect: { "Time of Flight": 1.44, "Max Height": 2.55 } },
      { name: 'proj 2', inputs: { v: 20, angle: 30 }, expect: { "Time of Flight": 2.04, "Max Height": 5.1 } }
    ]
  },
  {
    id: 'free-fall',
    name: 'Free Fall Calculator',
    slug: 'free-fall',
    category: 'physics',
    short: 'Calculate free fall time and velocity.',
    inputs: [
      { key: 'h', label: 'Height', type: 'number', default: 100 }
    ],
    compute: ({ h }) => {
      const height = Number(h);
      const g = 9.81;
      const t = Math.sqrt((2 * height) / g);
      const v = g * t;
      return { results: [{ label: 'Time', value: round(t) }, { label: 'Velocity', value: round(v) }] };
    },
    formula: 't = sqrt(2h/g), v = gt',
    intro: ['Calculate free fall time and velocity.'],
    status: 'published',
    tests: [
      { name: 'ff 1', inputs: { h: 100 }, expect: { Time: 4.52, Velocity: 44.29 } },
      { name: 'ff 2', inputs: { h: 50 }, expect: { Time: 3.19, Velocity: 31.32 } }
    ]
  }
];
"""

chemistry = """import type { CalculatorDef } from '@/lib/calc/types';
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
      { key: 'm1', label: 'M1', type: 'number', optional: true, default: 4 },
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
      { key: 'p', label: 'Pressure (atm)', type: 'number', optional: true, default: 1 },
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
"""

engineering = """import type { CalculatorDef } from '@/lib/calc/types';
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
"""

with open("src/calculators/physics.ts", "w", encoding="utf-8") as f:
    f.write(physics)
with open("src/calculators/chemistry.ts", "w", encoding="utf-8") as f:
    f.write(chemistry)
with open("src/calculators/engineering.ts", "w", encoding="utf-8") as f:
    f.write(engineering)
