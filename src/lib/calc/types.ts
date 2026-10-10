/**
 * Core types for the calculator engine.
 * Calculator definitions are plain data plus a pure `compute` function.
 * UI components never contain formulas; they only render inputs and results.
 */

export type CategorySlug =
  | 'math'
  | 'finance'
  | 'business'
  | 'statistics'
  | 'date-time'
  | 'health-fitness'
  | 'education'
  | 'physics'
  | 'chemistry'
  | 'engineering'
  | 'construction'
  | 'real-estate'
  | 'automotive'
  | 'cooking'
  | 'technology'
  | 'everyday'
  | 'sports'
  | 'biology-agriculture';

export type CalculatorStatus = 'planned' | 'in-progress' | 'tested' | 'published';

export interface SelectOption {
  value: string;
  label: string;
}

interface BaseInput {
  /** Key used in the values object passed to compute(). */
  key: string;
  label: string;
  help?: string;
  /** Hide this input unless another input has one of the given values. */
  showIf?: { key: string; equals: string[] };
}

export interface NumberInput extends BaseInput {
  type: 'number';
  default?: number;
  min?: number;
  max?: number;
  step?: number | 'any';
  unit?: string;
  /** If true, the field may be left empty; compute receives NaN. */
  optional?: boolean;
  /** If true, the value must be a whole number. */
  integer?: boolean;
}

export interface SelectInput extends BaseInput {
  type: 'select';
  options: SelectOption[];
  default: string;
}

export interface DateInput extends BaseInput {
  type: 'date';
  /** ISO date YYYY-MM-DD. Use 'today' to default to the current date in the browser. */
  default?: string | 'today';
}

export interface TimeInput extends BaseInput {
  type: 'time';
  /** HH:MM, 24 hour */
  default?: string;
}

/** A list of numbers typed as comma, space, or newline separated text. */
export interface ListInput extends BaseInput {
  type: 'list';
  default?: string;
  minItems?: number;
}

/** Free text (used rarely, e.g. IP address). Never evaluated as code. */
export interface TextInput extends BaseInput {
  type: 'text';
  default?: string;
  placeholder?: string;
  maxLength?: number;
}

export type CalcInput = NumberInput | SelectInput | DateInput | TimeInput | ListInput | TextInput;

/**
 * Values passed to compute():
 * number -> number (NaN when optional and empty)
 * select/date/time/text -> string
 * list -> number[]
 */
export type CalcValue = number | string | number[];
export type CalcValues = Record<string, CalcValue>;

export interface ResultRow {
  label: string;
  value: number | string;
  unit?: string;
  /** Decimal places for numeric values. Default 2. */
  decimals?: number;
  /** Mark the main answer so the UI can emphasise it. */
  primary?: boolean;
  /** Format as currency-like money with grouping, no symbol. */
  money?: boolean;
}

export interface ResultTable {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}

export interface CalcOutput {
  results: ResultRow[];
  table?: ResultTable;
  notes?: string[];
}

/** Thrown by compute() for domain errors, e.g. division by zero. The message is shown to the user. */
export class CalcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalcError';
  }
}

export interface CalcTestCase {
  name: string;
  inputs: Record<string, CalcValue>;
  /** Expected values by result label. Numbers compared with tolerance. */
  expect?: Record<string, number | string>;
  /** Expect compute to throw CalcError. */
  throws?: boolean;
  tolerance?: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface CalculatorDef {
  id: string;
  name: string;
  /** URL slug, served at /{slug}/ */
  slug: string;
  category: CategorySlug;
  short: string;
  aliases?: string[];
  tags?: string[];
  inputs: CalcInput[];
  compute: (values: CalcValues) => CalcOutput;
  /** Plain text formula shown on the page. */
  formula: string;
  /** Short explanation paragraphs. */
  intro: string[];
  howTo?: string[];
  example?: string;
  assumptions?: string[];
  limitations?: string[];
  faqs?: FAQ[];
  related?: string[]; // calculator slugs
  articles?: string[]; // blog slugs
  seoTitle?: string;
  metaDescription?: string;
  status: CalculatorStatus;
  popular?: boolean;
  tests: CalcTestCase[];
}
