import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, list, sum } from '../lib/calc/helpers';

export const educationCalculators: CalculatorDef[] = [
  {
    id: 'grade',
    name: 'Grade Calculator',
    slug: 'grade',
    category: 'education',
    short: 'Calculate your grade.',
    inputs: [
      { key: 'earned', label: 'Points Earned', type: 'number', default: 85 },
      { key: 'total', label: 'Total Points', type: 'number', default: 100 }
    ],
    compute: (raw) => {
      const e = num(raw.earned), t = num(raw.total);
      assert(t > 0, 'Total > 0');
      const pct = (e / t) * 100;
      let letter = 'F';
      if(pct >= 90) letter = 'A';
      else if(pct >= 80) letter = 'B';
      else if(pct >= 70) letter = 'C';
      else if(pct >= 60) letter = 'D';
      return { results: [
        { label: 'Percentage', value: round(pct, 2), primary: true, unit: '%' },
        { label: 'Letter Grade', value: letter }
      ] };
    },
    formula: '(Earned / Total) * 100',
    intro: ['Find your grade.'],
    status: 'published',
    tests: [
      { name: 'A', inputs: { earned: 95, total: 100 }, expect: { Percentage: 95, 'Letter Grade': 'A' } },
      { name: 'C', inputs: { earned: 75, total: 100 }, expect: { Percentage: 75, 'Letter Grade': 'C' } }
    ]
  },
  {
    id: 'weighted-grade',
    name: 'Weighted Grade',
    slug: 'weighted-grade',
    category: 'education',
    short: 'Calculate weighted grade.',
    inputs: [
      { key: 'grades', label: 'Grades (%)', type: 'list', default: '85, 90, 80' },
      { key: 'weights', label: 'Weights (%)', type: 'list', default: '20, 30, 50' }
    ],
    compute: (raw) => {
      const g = list(raw.grades), w = list(raw.weights);
      assert(g.length === w.length && g.length > 0, 'Must match');
      let t = 0, tw = 0;
      for(let i=0; i<g.length; i++){ t += g[i]*w[i]; tw += w[i]; }
      assert(tw > 0, 'Total weight > 0');
      return { results: [{ label: 'Weighted Grade', value: round(t / tw, 2), primary: true, unit: '%' }] };
    },
    formula: 'Sum(Grade * Weight) / Sum(Weight)',
    intro: ['Weighted grade.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { grades: [100, 50], weights: [50, 50] }, expect: { 'Weighted Grade': 75 } },
      { name: 't2', inputs: { grades: [90, 80], weights: [60, 40] }, expect: { 'Weighted Grade': 86 } }
    ]
  },
  {
    id: 'gpa',
    name: 'GPA Calculator',
    slug: 'gpa',
    category: 'education',
    short: 'Calculate semester GPA.',
    inputs: [
      { key: 'points', label: 'Grade Points', type: 'list', default: '4, 3, 4, 2' },
      { key: 'credits', label: 'Credits', type: 'list', default: '3, 3, 4, 3' }
    ],
    compute: (raw) => {
      const p = list(raw.points), c = list(raw.credits);
      assert(p.length === c.length && p.length > 0, 'Must match');
      let t = 0, tc = 0;
      for(let i=0; i<p.length; i++){ t += p[i]*c[i]; tc += c[i]; }
      assert(tc > 0, 'Total credits > 0');
      return { results: [{ label: 'GPA', value: round(t / tc, 2), primary: true }] };
    },
    formula: 'Total Grade Points / Total Credits',
    intro: ['Calculate GPA.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { points: [4, 3], credits: [3, 3] }, expect: { GPA: 3.5 } },
      { name: 't2', inputs: { points: [4, 4], credits: [3, 4] }, expect: { GPA: 4 } }
    ]
  },
  {
    id: 'final-grade',
    name: 'Final Grade Calculator',
    slug: 'final-grade',
    category: 'education',
    short: 'What you need on the final.',
    inputs: [
      { key: 'current', label: 'Current Grade (%)', type: 'number', default: 85 },
      { key: 'target', label: 'Target Grade (%)', type: 'number', default: 90 },
      { key: 'weight', label: 'Final Exam Weight (%)', type: 'number', default: 20 }
    ],
    compute: (raw) => {
      const cur = num(raw.current), tar = num(raw.target), w = num(raw.weight) / 100;
      assert(w > 0 && w < 1, 'Weight between 0 and 100 exclusive');
      const req = (tar - (1 - w) * cur) / w;
      return { results: [{ label: 'Required Grade', value: round(req, 2), primary: true, unit: '%' }] };
    },
    formula: '(Target - (1 - Weight) * Current) / Weight',
    intro: ['Final grade.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { current: 85, target: 90, weight: 20 }, expect: { 'Required Grade': 110 } },
      { name: 't2', inputs: { current: 90, target: 90, weight: 20 }, expect: { 'Required Grade': 90 } }
    ]
  },
  {
    id: 'test-score',
    name: 'Test Score Calculator',
    slug: 'test-score',
    category: 'education',
    short: 'Calculate test score from correct/wrong.',
    inputs: [
      { key: 'total', label: 'Total Questions', type: 'number', default: 50 },
      { key: 'wrong', label: 'Wrong Answers', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      const t = num(raw.total), w = num(raw.wrong);
      assert(t > 0 && w >= 0 && w <= t, 'Invalid counts');
      const c = t - w;
      const pct = (c / t) * 100;
      return { results: [{ label: 'Score', value: round(pct, 2), primary: true, unit: '%' }] };
    },
    formula: '((Total - Wrong) / Total) * 100',
    intro: ['Test score.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { total: 50, wrong: 5 }, expect: { Score: 90 } },
      { name: 't2', inputs: { total: 100, wrong: 0 }, expect: { Score: 100 } }
    ]
  },
  {
    id: 'cumulative-gpa',
    name: 'Cumulative GPA',
    slug: 'cumulative-gpa',
    category: 'education',
    short: 'Calculate cumulative GPA.',
    inputs: [
      { key: 'cgpa', label: 'Current CGPA', type: 'number', default: 3.5 },
      { key: 'ccredits', label: 'Current Credits', type: 'number', default: 60 },
      { key: 'sgpa', label: 'Semester GPA', type: 'number', default: 3.8 },
      { key: 'scredits', label: 'Semester Credits', type: 'number', default: 15 }
    ],
    compute: (raw) => {
      const cg = num(raw.cgpa), cc = num(raw.ccredits), sg = num(raw.sgpa), sc = num(raw.scredits);
      assert(cc >= 0 && sc >= 0 && (cc + sc) > 0, 'Invalid credits');
      const res = (cg * cc + sg * sc) / (cc + sc);
      return { results: [{ label: 'New CGPA', value: round(res, 2), primary: true }] };
    },
    formula: '(CGPA*CC + SGPA*SC) / (CC+SC)',
    intro: ['Cum GPA.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { cgpa: 3.5, ccredits: 60, sgpa: 4.0, scredits: 15 }, expect: { 'New CGPA': 3.6 } },
      { name: 't2', inputs: { cgpa: 3.0, ccredits: 30, sgpa: 2.0, scredits: 30 }, expect: { 'New CGPA': 2.5 } }
    ]
  },
  {
    id: 'attendance-percentage',
    name: 'Attendance Percentage',
    slug: 'attendance-percentage',
    category: 'education',
    short: 'Calculate attendance %.',
    inputs: [
      { key: 'attended', label: 'Classes Attended', type: 'number', default: 45 },
      { key: 'total', label: 'Total Classes', type: 'number', default: 50 }
    ],
    compute: (raw) => {
      const a = num(raw.attended), t = num(raw.total);
      assert(t > 0 && a >= 0 && a <= t, 'Invalid classes');
      const pct = (a / t) * 100;
      return { results: [{ label: 'Attendance', value: round(pct, 2), primary: true, unit: '%' }] };
    },
    formula: '(Attended / Total) * 100',
    intro: ['Attendance.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { attended: 45, total: 50 }, expect: { Attendance: 90 } },
      { name: 't2', inputs: { attended: 50, total: 50 }, expect: { Attendance: 100 } }
    ]
  }
];
