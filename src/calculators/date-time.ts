import type { CalculatorDef } from '../lib/calc/types';
import { assert, round, num, parseDate, formatDate, daysBetween, addDays, parseTime, minutesToHM } from '../lib/calc/helpers';

export const dateTimeCalculators: CalculatorDef[] = [
  {
    id: 'date-difference',
    name: 'Date Difference',
    slug: 'date-difference',
    category: 'date-time',
    short: 'Days between two dates.',
    inputs: [
      { key: 'start', label: 'Start Date', type: 'date', default: '2023-01-01' },
      { key: 'end', label: 'End Date', type: 'date', default: '2023-12-31' }
    ],
    compute: (raw) => {
      const s = parseDate(raw.start as string), e = parseDate(raw.end as string);
      return { results: [{ label: 'Days', value: daysBetween(s, e), primary: true }] };
    },
    formula: 'End - Start',
    intro: ['Days between.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '2023-01-01', end: '2023-01-02' }, expect: { Days: 1 } },
      { name: 't2', inputs: { start: '2023-01-10', end: '2023-01-01' }, expect: { Days: -9 } }
    ]
  },
  {
    id: 'age',
    name: 'Age Calculator',
    slug: 'age',
    category: 'date-time',
    short: 'Calculate age from a birth date.',
    inputs: [
      { key: 'birth', label: 'Birth Date', type: 'date', default: '1990-01-01' },
      { key: 'target', label: 'Target Date', type: 'date', default: '2023-01-01' }
    ],
    compute: (raw) => {
      const b = parseDate(raw.birth as string), t = parseDate(raw.target as string);
      assert(t >= b, 'Target must be after birth');
      let age = t.getUTCFullYear() - b.getUTCFullYear();
      if (t.getUTCMonth() < b.getUTCMonth() || (t.getUTCMonth() === b.getUTCMonth() && t.getUTCDate() < b.getUTCDate())) {
          age--;
      }
      return { results: [{ label: 'Age (Years)', value: age, primary: true }] };
    },
    formula: 'Years between',
    intro: ['Age.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { birth: '1990-01-01', target: '2020-01-01' }, expect: { 'Age (Years)': 30 } },
      { name: 't2', inputs: { birth: '1990-05-05', target: '2020-01-01' }, expect: { 'Age (Years)': 29 } }
    ]
  },
  {
    id: 'business-days',
    name: 'Business Days Calculator',
    slug: 'business-days',
    category: 'date-time',
    short: 'Business days between dates.',
    inputs: [
      { key: 'start', label: 'Start Date', type: 'date', default: '2023-01-01' },
      { key: 'end', label: 'End Date', type: 'date', default: '2023-01-10' }
    ],
    compute: (raw) => {
      const s = parseDate(raw.start as string), e = parseDate(raw.end as string);
      let count = 0;
      let cur = s;
      const step = s <= e ? 1 : -1;
      while (cur.getTime() !== e.getTime()) {
          const day = cur.getUTCDay();
          if (day !== 0 && day !== 6) count += step;
          cur = addDays(cur, step);
      }
      return { results: [{ label: 'Business Days', value: count, primary: true }] };
    },
    formula: 'Days excluding weekends',
    intro: ['Business days.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '2023-01-02', end: '2023-01-06' }, expect: { 'Business Days': 4 } },
      { name: 't2', inputs: { start: '2023-01-06', end: '2023-01-09' }, expect: { 'Business Days': 1 } }
    ]
  },
  {
    id: 'add-business-days',
    name: 'Add Business Days',
    slug: 'add-business-days',
    category: 'date-time',
    short: 'Add business days to date.',
    inputs: [
      { key: 'start', label: 'Start Date', type: 'date', default: '2023-01-02' },
      { key: 'days', label: 'Days to Add', type: 'number', default: 5 }
    ],
    compute: (raw) => {
      let cur = parseDate(raw.start as string);
      let days = num(raw.days);
      const step = days >= 0 ? 1 : -1;
      days = Math.abs(days);
      while (days > 0) {
          cur = addDays(cur, step);
          const d = cur.getUTCDay();
          if (d !== 0 && d !== 6) days--;
      }
      return { results: [{ label: 'Result Date', value: formatDate(cur), primary: true }] };
    },
    formula: 'Add excluding weekends',
    intro: ['Add BD.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '2023-01-02', days: 4 }, expect: { 'Result Date': '2023-01-06' } },
      { name: 't2', inputs: { start: '2023-01-06', days: 1 }, expect: { 'Result Date': '2023-01-09' } }
    ]
  },
  {
    id: 'time-duration',
    name: 'Time Duration',
    slug: 'time-duration',
    category: 'date-time',
    short: 'Duration between times.',
    inputs: [
      { key: 'start', label: 'Start Time', type: 'time', default: '09:00' },
      { key: 'end', label: 'End Time', type: 'time', default: '17:30' }
    ],
    compute: (raw) => {
      let s = parseTime(raw.start as string), e = parseTime(raw.end as string);
      if (e < s) e += 24 * 60;
      const diff = e - s;
      return { results: [{ label: 'Duration', value: minutesToHM(diff), primary: true }] };
    },
    formula: 'End - Start',
    intro: ['Time diff.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '09:00', end: '17:30' }, expect: { Duration: '8 h 30 min' } },
      { name: 't2', inputs: { start: '23:00', end: '01:00' }, expect: { Duration: '2 h 0 min' } }
    ]
  },
  {
    id: 'date-add',
    name: 'Add to Date',
    slug: 'date-add',
    category: 'date-time',
    short: 'Add or subtract days from a date.',
    inputs: [
      { key: 'start', label: 'Start Date', type: 'date', default: '2023-01-01' },
      { key: 'days', label: 'Days', type: 'number', default: 30 }
    ],
    compute: (raw) => {
      const s = parseDate(raw.start as string), d = num(raw.days);
      return { results: [{ label: 'Result Date', value: formatDate(addDays(s, d)), primary: true }] };
    },
    formula: 'Start + Days',
    intro: ['Add days.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '2023-01-01', days: 10 }, expect: { 'Result Date': '2023-01-11' } },
      { name: 't2', inputs: { start: '2023-01-31', days: 1 }, expect: { 'Result Date': '2023-02-01' } }
    ]
  },
  {
    id: 'hours',
    name: 'Hours Calculator',
    slug: 'hours',
    category: 'date-time',
    short: 'Calculate decimal hours from times.',
    inputs: [
      { key: 'start', label: 'Start Time', type: 'time', default: '09:00' },
      { key: 'end', label: 'End Time', type: 'time', default: '17:30' },
      { key: 'break', label: 'Break (minutes)', type: 'number', default: 30 }
    ],
    compute: (raw) => {
      let s = parseTime(raw.start as string), e = parseTime(raw.end as string);
      if (e < s) e += 24 * 60;
      const b = num(raw.break);
      let diff = e - s - b;
      if (diff < 0) diff = 0;
      return { results: [{ label: 'Decimal Hours', value: round(diff / 60, 2), primary: true }] };
    },
    formula: '(End - Start - Break) / 60',
    intro: ['Hours worked.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '09:00', end: '17:30', break: 30 }, expect: { 'Decimal Hours': 8 } },
      { name: 't2', inputs: { start: '08:00', end: '12:15', break: 0 }, expect: { 'Decimal Hours': 4.25 } }
    ]
  },
  {
    id: 'day-of-week',
    name: 'Day of Week',
    slug: 'day-of-week',
    category: 'date-time',
    short: 'Find day of the week.',
    inputs: [
      { key: 'date', label: 'Date', type: 'date', default: '2023-01-01' }
    ],
    compute: (raw) => {
      const d = parseDate(raw.date as string);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return { results: [{ label: 'Day', value: days[d.getUTCDay()], primary: true }] };
    },
    formula: 'Lookup day',
    intro: ['Find day.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { date: '2023-01-01' }, expect: { Day: 'Sunday' } },
      { name: 't2', inputs: { date: '2023-01-02' }, expect: { Day: 'Monday' } }
    ]
  },
  {
    id: 'week-number',
    name: 'Week Number',
    slug: 'week-number',
    category: 'date-time',
    short: 'Find ISO week number.',
    inputs: [
      { key: 'date', label: 'Date', type: 'date', default: '2023-01-01' }
    ],
    compute: (raw) => {
      const d = parseDate(raw.date as string);
      const target = new Date(d.valueOf());
      const dayNr = (d.getUTCDay() + 6) % 7;
      target.setUTCDate(target.getUTCDate() - dayNr + 3);
      const firstThursday = target.valueOf();
      target.setUTCMonth(0, 1);
      if (target.getUTCDay() !== 4) {
          target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
      }
      const week = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
      return { results: [{ label: 'Week Number', value: week, primary: true }] };
    },
    formula: 'ISO 8601',
    intro: ['ISO week.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { date: '2023-01-01' }, expect: { 'Week Number': 52 } },
      { name: 't2', inputs: { date: '2023-01-02' }, expect: { 'Week Number': 1 } }
    ]
  },
  {
    id: 'time-add',
    name: 'Add to Time',
    slug: 'time-add',
    category: 'date-time',
    short: 'Add or subtract minutes from a given time.',
    inputs: [
      { key: 'start', label: 'Start Time', type: 'time', default: '09:00' },
      { key: 'mins', label: 'Minutes to Add', type: 'number', default: 45 }
    ],
    compute: (raw) => {
      let s = parseTime(raw.start as string);
      let add = num(raw.mins);
      let total = (s + add) % (24 * 60);
      if (total < 0) total += 24 * 60;
      const h = Math.floor(total / 60);
      const m = total % 60;
      const res = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      return { results: [{ label: 'Result Time', value: res, primary: true }] };
    },
    formula: 'Start + Minutes',
    intro: ['Time math.'],
    status: 'published',
    tests: [
      { name: 't1', inputs: { start: '09:00', mins: 45 }, expect: { 'Result Time': '09:45' } },
      { name: 't2', inputs: { start: '23:30', mins: 45 }, expect: { 'Result Time': '00:15' } }
    ]
  }
];
