import type { CalculatorDef } from '@/lib/calc/types';
import { round, normalCdf, normalInv } from '@/lib/calc/helpers';

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
      { key: 'speed', label: 'Speed', type: 'number', optional: true },
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
      { key: 'velocity', label: 'Velocity', type: 'number', optional: true }
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
    short: 'Calculate force using Newton\'s second law.',
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
      { key: 'r', label: 'Resistance', type: 'number', optional: true }
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
