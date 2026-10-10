import type { CalculatorDef, CalcValues, CalcOutput } from '../lib/calc/types';
import { round, assert, num } from '../lib/calc/helpers';

export const sportsCalculators: CalculatorDef[] = [
  {
    id: 'pace',
    name: 'Pace Calculator',
    slug: 'pace',
    category: 'sports',
    short: 'Calculate your running pace.',
    inputs: [
      { key: 'distance', type: 'number', label: 'Distance', unit: 'km', default: 5 },
      { key: 'minutes', type: 'number', label: 'Time (Minutes)', default: 25 }
    ],
    compute: (v: CalcValues): CalcOutput => {
      const d = num(v.distance);
      const m = num(v.minutes);
      assert(d > 0 && m > 0, 'Distance and time must be positive.');
      const pace = m / d;
      const paceMins = Math.floor(pace);
      const paceSecs = Math.round((pace - paceMins) * 60);
      return {
        results: [
          { label: 'Pace', value: `${paceMins}:${paceSecs.toString().padStart(2, '0')} /km`, primary: true }
        ]
      };
    },
    formula: 'Pace = Time / Distance',
    intro: ['Calculate your running pace based on time and distance.'],
    status: 'tested',
    tests: [
      { name: '5k in 25 mins', inputs: { distance: 5, minutes: 25 }, expect: { 'Pace': '5:00 /km' } },
      { name: '10k in 55 mins', inputs: { distance: 10, minutes: 55 }, expect: { 'Pace': '5:30 /km' } }
    ]
  },
  {
    id: 'race-time-predictor',
    name: 'Race Time Predictor',
    slug: 'race-time-predictor',
    category: 'sports',
    short: 'Predict race time based on previous results.',
    inputs: [
      { key: 't1', type: 'number', label: 'Previous Time (Minutes)', default: 25 },
      { key: 'd1', type: 'number', label: 'Previous Distance', unit: 'km', default: 5 },
      { key: 'd2', type: 'number', label: 'Target Distance', unit: 'km', default: 10 }
    ],
    compute: (v) => {
      const t1 = num(v.t1);
      const d1 = num(v.d1);
      const d2 = num(v.d2);
      assert(t1 > 0 && d1 > 0 && d2 > 0, 'Values must be positive.');
      // Riegel's formula: T2 = T1 * (D2 / D1)^1.06
      const t2 = t1 * Math.pow(d2 / d1, 1.06);
      return { results: [{ label: 'Predicted Time', value: round(t2, 1), unit: 'minutes', primary: true }] };
    },
    formula: 'Riegel\'s formula: T2 = T1 * (D2 / D1)^1.06',
    intro: ['Predict your time for a race based on a past performance.'],
    status: 'tested',
    tests: [
      { name: '5k to 10k', inputs: { t1: 25, d1: 5, d2: 10 }, expect: { 'Predicted Time': 52.1 }, tolerance: 0.2 },
      { name: '10k to half', inputs: { t1: 50, d1: 10, d2: 21.1 }, expect: { 'Predicted Time': 110.3 }, tolerance: 0.2 }
    ]
  },
  {
    id: 'win-percentage',
    name: 'Win Percentage Calculator',
    slug: 'win-percentage',
    category: 'sports',
    short: 'Calculate the winning percentage of a sports team.',
    inputs: [
      { key: 'wins', type: 'number', label: 'Wins', default: 10 },
      { key: 'losses', type: 'number', label: 'Losses', default: 5 },
      { key: 'ties', type: 'number', label: 'Ties', default: 0 }
    ],
    compute: (v) => {
      const w = num(v.wins);
      const l = num(v.losses);
      const t = num(v.ties);
      const total = w + l + t;
      assert(total > 0, 'Total games must be positive.');
      const pct = (w + 0.5 * t) / total * 100;
      return { results: [{ label: 'Win Percentage', value: round(pct, 2), unit: '%', primary: true }] };
    },
    formula: 'Win % = (Wins + 0.5 * Ties) / Total Games * 100',
    intro: ['Calculate the winning percentage of a sports team.'],
    status: 'tested',
    tests: [
      { name: 'No ties', inputs: { wins: 10, losses: 5, ties: 0 }, expect: { 'Win Percentage': 66.67 } },
      { name: 'With ties', inputs: { wins: 10, losses: 5, ties: 1 }, expect: { 'Win Percentage': 65.63 } }
    ]
  },
  {
    id: 'batting-average',
    name: 'Batting Average',
    slug: 'batting-average',
    category: 'sports',
    short: 'Calculate baseball batting average.',
    inputs: [
      { key: 'hits', type: 'number', label: 'Hits', default: 50 },
      { key: 'atBats', type: 'number', label: 'At Bats', default: 150 }
    ],
    compute: (v) => {
      const h = num(v.hits);
      const ab = num(v.atBats);
      assert(ab > 0, 'At bats must be positive.');
      assert(h <= ab, 'Hits cannot exceed at bats.');
      return { results: [{ label: 'Batting Average', value: (h / ab).toFixed(3).replace(/^0/, ''), primary: true }] };
    },
    formula: 'AVG = Hits / At Bats',
    intro: ['Calculate a baseball player\'s batting average.'],
    status: 'tested',
    tests: [
      { name: 'Good', inputs: { hits: 50, atBats: 150 }, expect: { 'Batting Average': '.333' } },
      { name: 'Perfect', inputs: { hits: 10, atBats: 10 }, expect: { 'Batting Average': '1.000' } }
    ]
  },
  {
    id: 'era',
    name: 'Earned Run Average (ERA)',
    slug: 'era',
    category: 'sports',
    short: 'Calculate baseball earned run average.',
    inputs: [
      { key: 'earnedRuns', type: 'number', label: 'Earned Runs', default: 30 },
      { key: 'innings', type: 'number', label: 'Innings Pitched', default: 90 }
    ],
    compute: (v) => {
      const er = num(v.earnedRuns);
      const ip = num(v.innings);
      assert(ip > 0, 'Innings pitched must be positive.');
      const era = (er * 9) / ip;
      return { results: [{ label: 'ERA', value: round(era, 2), primary: true }] };
    },
    formula: 'ERA = 9 * Earned Runs / Innings Pitched',
    intro: ['Calculate a pitcher\'s earned run average (ERA).'],
    status: 'tested',
    tests: [
      { name: 'Average', inputs: { earnedRuns: 30, innings: 90 }, expect: { 'ERA': 3.00 } },
      { name: 'High', inputs: { earnedRuns: 50, innings: 100 }, expect: { 'ERA': 4.50 } }
    ]
  },
  {
    id: 'points-per-game',
    name: 'Points Per Game',
    slug: 'points-per-game',
    category: 'sports',
    short: 'Calculate average points per game.',
    inputs: [
      { key: 'points', type: 'number', label: 'Total Points', default: 500 },
      { key: 'games', type: 'number', label: 'Games Played', default: 20 }
    ],
    compute: (v) => {
      const p = num(v.points);
      const g = num(v.games);
      assert(g > 0, 'Games played must be positive.');
      return { results: [{ label: 'Points Per Game', value: round(p / g, 1), primary: true }] };
    },
    formula: 'PPG = Total Points / Games Played',
    intro: ['Calculate average points per game.'],
    status: 'tested',
    tests: [
      { name: 'Test 1', inputs: { points: 500, games: 20 }, expect: { 'Points Per Game': 25.0 } },
      { name: 'Test 2', inputs: { points: 81, games: 3 }, expect: { 'Points Per Game': 27.0 } }
    ]
  },
  {
    id: 'one-rep-max',
    name: 'One Rep Max',
    slug: 'one-rep-max',
    category: 'sports',
    short: 'Estimate your one rep maximum lift.',
    inputs: [
      { key: 'weight', type: 'number', label: 'Weight Lifted', unit: 'kg', default: 100 },
      { key: 'reps', type: 'number', label: 'Reps', default: 5 }
    ],
    compute: (v) => {
      const w = num(v.weight);
      const r = num(v.reps);
      assert(w > 0 && r > 0, 'Values must be positive.');
      const orm = w * (1 + r / 30);
      return { results: [{ label: 'Estimated 1RM (Epley)', value: round(orm, 1), unit: 'kg', primary: true }] };
    },
    formula: '1RM = Weight * (1 + Reps / 30) [Epley Formula]',
    intro: ['Estimate your one-rep max for weightlifting.'],
    status: 'tested',
    tests: [
      { name: 'Squat', inputs: { weight: 100, reps: 5 }, expect: { 'Estimated 1RM (Epley)': 116.7 } },
      { name: 'Bench', inputs: { weight: 80, reps: 8 }, expect: { 'Estimated 1RM (Epley)': 101.3 } }
    ]
  }
];
