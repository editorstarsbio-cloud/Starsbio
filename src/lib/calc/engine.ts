import type { CalcInput, CalcValues, CalculatorDef, CalcOutput } from './types';
import { CalcError } from './types';

export type RawValues = Record<string, string>;

export interface ParseResult {
  values: CalcValues;
  errors: Record<string, string>;
}

/** Visible inputs given current raw values (respects showIf). */
export function visibleInputs(inputs: CalcInput[], raw: RawValues): CalcInput[] {
  return inputs.filter((i) => !i.showIf || i.showIf.equals.includes(raw[i.showIf.key] ?? defaultRaw(inputs.find((x) => x.key === i.showIf!.key)!)));
}

export function todayIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function defaultRaw(input: CalcInput): string {
  switch (input.type) {
    case 'number':
      return input.default === undefined ? '' : String(input.default);
    case 'select':
      return input.default;
    case 'date':
      return input.default === 'today' ? todayIso() : (input.default ?? '');
    default:
      return input.default ?? '';
  }
}

export function defaultValues(inputs: CalcInput[]): RawValues {
  return Object.fromEntries(inputs.map((i) => [i.key, defaultRaw(i)]));
}

const NUM_RE = /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i;

/** Parse a number typed by a user. Accepts thousands separators ("1,250.5"). Never evaluates expressions. */
export function parseNumber(s: string): number {
  const t = s.trim().replace(/,(?=\d{3}(\D|$))/g, '').replace(/\s/g, '');
  if (!NUM_RE.test(t)) return NaN;
  return Number(t);
}

export function parseList(s: string): number[] {
  const parts = s
    .split(/[\s,;]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.map((p) => (NUM_RE.test(p) ? Number(p) : NaN));
}

/** Validate and convert raw string values into typed values. */
export function parseInputs(inputs: CalcInput[], raw: RawValues): ParseResult {
  const values: CalcValues = {};
  const errors: Record<string, string> = {};
  for (const input of visibleInputs(inputs, raw)) {
    const r = (raw[input.key] ?? '').trim();
    switch (input.type) {
      case 'number': {
        if (r === '') {
          if (input.optional) {
            values[input.key] = NaN;
            break;
          }
          errors[input.key] = `Enter a value for ${input.label.toLowerCase()}.`;
          break;
        }
        const n = parseNumber(r);
        if (!Number.isFinite(n)) {
          errors[input.key] = 'Enter a valid number.';
        } else if (input.min !== undefined && n < input.min) {
          errors[input.key] = `Must be at least ${input.min}.`;
        } else if (input.max !== undefined && n > input.max) {
          errors[input.key] = `Must be no more than ${input.max}.`;
        } else if (input.integer && !Number.isInteger(n)) {
          errors[input.key] = 'Enter a whole number.';
        } else {
          values[input.key] = n;
        }
        break;
      }
      case 'select':
        if (!input.options.some((o) => o.value === r)) errors[input.key] = 'Choose an option.';
        else values[input.key] = r;
        break;
      case 'date':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(r)) errors[input.key] = 'Enter a valid date.';
        else values[input.key] = r;
        break;
      case 'time':
        if (!/^\d{1,2}:\d{2}$/.test(r)) errors[input.key] = 'Enter a valid time.';
        else values[input.key] = r;
        break;
      case 'list': {
        const xs = parseList(r);
        if (xs.some((x) => !Number.isFinite(x))) errors[input.key] = 'Use numbers separated by commas, spaces, or new lines.';
        else if (xs.length < (input.minItems ?? 1)) errors[input.key] = `Enter at least ${input.minItems ?? 1} number${(input.minItems ?? 1) > 1 ? 's' : ''}.`;
        else values[input.key] = xs;
        break;
      }
      case 'text':
        if (input.maxLength && r.length > input.maxLength) errors[input.key] = `Use at most ${input.maxLength} characters.`;
        else values[input.key] = r;
        break;
    }
  }
  return { values, errors };
}

export type RunResult = { ok: true; output: CalcOutput } | { ok: false; errors: Record<string, string>; message?: string };

/** Full pipeline used by the UI: parse, validate, compute, catch domain errors. */
export function runCalculator(def: CalculatorDef, raw: RawValues): RunResult {
  const { values, errors } = parseInputs(def.inputs, raw);
  if (Object.keys(errors).length) return { ok: false, errors, message: 'Please fix the highlighted fields.' };
  try {
    const output = def.compute(values);
    for (const row of output.results) {
      if (typeof row.value === 'number' && !Number.isFinite(row.value)) {
        return { ok: false, errors: {}, message: 'These inputs produce a result that is undefined or too large to show. Try different values.' };
      }
    }
    return { ok: true, output };
  } catch (e) {
    if (e instanceof CalcError) return { ok: false, errors: {}, message: e.message };
    return { ok: false, errors: {}, message: 'Something went wrong with these inputs. Please check them and try again.' };
  }
}
