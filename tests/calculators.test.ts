import { describe, expect, it } from 'vitest';
import type { CalculatorDef } from '@/lib/calc/types';
import { CalcError } from '@/lib/calc/types';
import { defaultValues, parseInputs, runCalculator } from '@/lib/calc/engine';

// Load every category module directly so this suite also works while the registry is being assembled.
const modules = import.meta.glob('../src/calculators/*.ts', { eager: true }) as Record<string, Record<string, CalculatorDef[]>>;
const only = process.env.CALC_FILE; // optional: run one file, e.g. CALC_FILE=math
const all: CalculatorDef[] = Object.entries(modules)
  .filter(([path]) => !path.includes('index.ts') && (!only || path.endsWith(`/${only}.ts`)))
  .flatMap(([, mod]) => Object.entries(mod).filter(([k, v]) => k.endsWith('Calculators') && Array.isArray(v)).flatMap(([, v]) => v) as CalculatorDef[]);

describe('calculator definitions', () => {
  it('have unique ids and slugs', () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();
    for (const c of all) {
      expect(ids.has(c.id), `duplicate id ${c.id}`).toBe(false);
      expect(slugs.has(c.slug), `duplicate slug ${c.slug}`).toBe(false);
      ids.add(c.id);
      slugs.add(c.slug);
      expect(c.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});

for (const c of all) {
  describe(`${c.name} (${c.slug})`, () => {
    it('has required metadata', () => {
      expect(c.name.length).toBeGreaterThan(3);
      expect(c.short.length).toBeGreaterThan(20);
      expect(c.intro.length).toBeGreaterThan(0);
      expect(c.formula.length).toBeGreaterThan(0);
      expect(c.inputs.length).toBeGreaterThan(0);
      if (c.status === 'published') expect(c.tests.length, 'published calculators need tests').toBeGreaterThan(0);
      const text = JSON.stringify({ n: c.name, s: c.short, i: c.intro, h: c.howTo, e: c.example, a: c.assumptions, l: c.limitations, f: c.faqs });
      expect(text.includes('\u2014'), 'no em dashes').toBe(false);
    });

    it('computes with default values', () => {
      const r = runCalculator(c, defaultValues(c.inputs));
      if (!r.ok) throw new Error(`defaults failed: ${r.message} ${JSON.stringify(r.errors)}`);
      expect(r.output.results.length).toBeGreaterThan(0);
    });

    it('rejects an empty required number field', () => {
      const firstNum = c.inputs.find((i) => i.type === 'number' && !i.optional && !i.showIf);
      if (!firstNum) return;
      const raw = { ...defaultValues(c.inputs), [firstNum.key]: '' };
      expect(Object.keys(parseInputs(c.inputs, raw).errors)).toContain(firstNum.key);
      const raw2 = { ...defaultValues(c.inputs), [firstNum.key]: 'abc' };
      expect(Object.keys(parseInputs(c.inputs, raw2).errors)).toContain(firstNum.key);
    });

    if (!c.tests || !Array.isArray(c.tests)) {
      it(`has tests array`, () => {
        expect(Array.isArray(c.tests)).toBe(true);
      });
      return;
    }

    for (const t of c.tests) {
      it(`case: ${t.name}`, () => {
        if (t.throws) {
          expect(() => c.compute(t.inputs)).toThrow(CalcError);
          return;
        }
        const out = c.compute(t.inputs);
        for (const [label, want] of Object.entries(t.expect ?? {})) {
          const row = out.results.find((r) => r.label === label);
          expect(row, `missing result "${label}"`).toBeDefined();
          if (typeof want === 'number') {
            expect(typeof row!.value).toBe('number');
            const tol = t.tolerance ?? 0.005;
            expect(Math.abs((row!.value as number) - want), `${label}: got ${row!.value}, want ${want}`).toBeLessThanOrEqual(tol * Math.max(1, Math.abs(want)) );
          } else {
            expect(String(row!.value)).toBe(want);
          }
        }
      });
    }
  });
}
