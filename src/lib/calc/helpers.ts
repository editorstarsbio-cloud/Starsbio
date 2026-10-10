import Decimal from 'decimal.js';
import { CalcError } from './types';

/** Round to n decimal places using decimal arithmetic (half away from zero). */
export function round(value: number, places = 2): number {
  if (!Number.isFinite(value)) return value;
  return new Decimal(value).toDecimalPlaces(places, Decimal.ROUND_HALF_UP).toNumber();
}

/** Money helpers built on decimal.js so cents do not drift. */
export const money = {
  add: (...xs: number[]) => xs.reduce((a, b) => new Decimal(a).plus(b).toNumber(), 0),
  sub: (a: number, b: number) => new Decimal(a).minus(b).toNumber(),
  mul: (a: number, b: number) => new Decimal(a).times(b).toNumber(),
  div: (a: number, b: number) => {
    if (b === 0) throw new CalcError('Cannot divide by zero.');
    return new Decimal(a).div(b).toNumber();
  },
  cents: (a: number) => round(a, 2),
};

export function assert(cond: unknown, message: string): asserts cond {
  if (!cond) throw new CalcError(message);
}

export function num(v: unknown): number {
  return typeof v === 'number' ? v : Number(v);
}

export function str(v: unknown): string {
  return typeof v === 'string' ? v : String(v);
}

export function list(v: unknown): number[] {
  return Array.isArray(v) ? (v as number[]) : [];
}

export function sum(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}

export function mean(xs: number[]): number {
  assert(xs.length > 0, 'Enter at least one number.');
  return sum(xs) / xs.length;
}

export function median(xs: number[]): number {
  assert(xs.length > 0, 'Enter at least one number.');
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Sample (n-1) or population (n) variance. */
export function variance(xs: number[], sample: boolean): number {
  const n = xs.length;
  assert(n > (sample ? 1 : 0), sample ? 'Sample variance needs at least two numbers.' : 'Enter at least one number.');
  const m = mean(xs);
  return sum(xs.map((x) => (x - m) ** 2)) / (sample ? n - 1 : n);
}

export function factorial(n: number): number {
  assert(Number.isInteger(n) && n >= 0, 'Factorial needs a whole number 0 or greater.');
  assert(n <= 170, 'Values above 170 overflow standard numbers.');
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/** Standard normal CDF (Abramowitz and Stegun 7.1.26 via erf, error < 1.5e-7). */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.3275911 * (Math.abs(z) / Math.SQRT2));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y);
}

/** Inverse standard normal (Acklam's algorithm, relative error about 1e-9). */
export function normalInv(p: number): number {
  assert(p > 0 && p < 1, 'Probability must be between 0 and 1.');
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let q: number, r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= 1 - pl) {
    q = p - 0.5;
    r = q * q;
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

/** Monthly loan payment for principal P, annual rate in percent, n months. */
export function loanPayment(principal: number, annualRatePct: number, months: number): number {
  assert(months > 0, 'The term must be greater than zero.');
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/** Parse an ISO date (YYYY-MM-DD) as a UTC date so day math ignores time zones and DST. */
export function parseDate(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  assert(m, 'Enter a valid date.');
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  assert(d.getUTCMonth() === +m[2] - 1, 'Enter a valid date.');
  return d;
}

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const DAY_MS = 86_400_000;

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * DAY_MS);
}

/** Add calendar months, clamping to the last day of the target month. */
export function addMonths(d: Date, n: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const target = new Date(Date.UTC(y, m, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  return new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), Math.min(d.getUTCDate(), lastDay)));
}

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Parse HH:MM into minutes after midnight. */
export function parseTime(t: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t);
  assert(m && +m[1] < 24 && +m[2] < 60, 'Enter a valid time (HH:MM).');
  return +m[1] * 60 + +m[2];
}

export function minutesToHM(mins: number): string {
  const sign = mins < 0 ? '-' : '';
  const a = Math.abs(Math.round(mins));
  return `${sign}${Math.floor(a / 60)} h ${a % 60} min`;
}

/** Seconds to H:MM:SS */
export function hms(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
