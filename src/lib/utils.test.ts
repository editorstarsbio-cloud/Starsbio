import { describe, it, expect } from 'vitest';
import {
  calculateAge,
  parseDate,
  generateSlug,
  normalizeText,
  isLeapYear,
  getZodiacSignFromDate,
  validateZodiacMatch,
} from '@/lib/utils';
import { validateAndTransformRow, ExcelRow } from '@/scripts/importCelebrities';

describe('Utility Functions: Dates & Age Calculations', () => {
  it('correctly parses ISO and various date formats', () => {
    expect(parseDate('1990-05-15')).toBe('1990-05-15');
    expect(parseDate('1967-7-18')).toBe('1967-07-18');
    expect(parseDate('invalid-date')).toBeNull();
    expect(parseDate(null)).toBeNull();
  });

  it('correctly identifies leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2023)).toBe(false);
  });

  it('accurately calculates dynamic ages for living figures', () => {
    const ageResult = calculateAge('1990-01-01', null, '2026-05-01');
    expect(ageResult).not.toBeNull();
    expect(ageResult?.age).toBe(36);
    expect(ageResult?.isDeceased).toBe(false);
  });

  it('accurately calculates age at death for deceased figures', () => {
    // Albert Einstein: 1879-03-14 to 1955-04-18 (passed at age 76)
    const result = calculateAge('1879-03-14', '1955-04-18');
    expect(result).not.toBeNull();
    expect(result?.age).toBe(76);
    expect(result?.isDeceased).toBe(true);
  });

  it('handles leap day (Feb 29) birthdays safely', () => {
    const leapBirth = parseDate('2000-02-29');
    expect(leapBirth).toBe('2000-02-29');

    // Age on Feb 28 of non-leap year (e.g. 2023)
    const ageBefore = calculateAge('2000-02-29', null, '2023-02-28');
    expect(ageBefore?.age).toBe(22);

    // Age on March 1 of non-leap year
    const ageAfter = calculateAge('2000-02-29', null, '2023-03-01');
    expect(ageAfter?.age).toBe(23);
  });
});

describe('Astrological & Zodiac Validation', () => {
  it('identifies correct zodiac sign for calendar dates', () => {
    expect(getZodiacSignFromDate(7, 18)).toBe('Cancer');
    expect(getZodiacSignFromDate(2, 12)).toBe('Aquarius');
    expect(getZodiacSignFromDate(12, 13)).toBe('Sagittarius');
    expect(getZodiacSignFromDate(9, 1)).toBe('Virgo');
    expect(getZodiacSignFromDate(1, 15)).toBe('Capricorn');
  });

  it('flags mismatches between Excel sign and astronomical birth date', () => {
    expect(validateZodiacMatch('1967-07-18', 'Cancer')).toBe(true);
    expect(validateZodiacMatch('1967-07-18', 'Aries')).toBe(false);
  });
});

describe('Slug & Normalization', () => {
  it('normalizes names and strips accents properly', () => {
    expect(normalizeText('Beyoncé Knowles')).toBe('beyonce knowles');
    expect(normalizeText('Robert Downey, Jr.')).toBe('robert downey jr');
  });

  it('generates clean URL slugs', () => {
    expect(generateSlug('Vin Diesel')).toBe('vin-diesel');
    expect(generateSlug('Leonardo DiCaprio')).toBe('leonardo-dicaprio');
    expect(generateSlug('P!nk')).toBe('p-nk');
  });
});

describe('Excel Import Row Transformation & Validation', () => {
  const seenSlugs = new Map<string, number>();

  it('successfully transforms a valid celebrity row', () => {
    const row: ExcelRow = {
      Name: 'Vin Diesel',
      'Born Date': '1967-07-18',
      Birthplace: 'Alameda, California, United States',
      'Category / Job Title': 'Movie Actor',
      'Birth Sign': 'Cancer',
      'Bio / About': 'Actor known for Fast & Furious.',
    };

    const res = validateAndTransformRow(row, 2, seenSlugs);
    expect(res.error).toBeUndefined();
    expect(res.entity).toBeDefined();
    expect(res.entity?.name).toBe('Vin Diesel');
    expect(res.entity?.slug).toBe('vin-diesel');
    expect(res.entity?.birth_date).toBe('1967-07-18');
    expect(res.entity?.zodiac_sign).toBe('Cancer');
    expect(res.entity?.status).toBe('in_review'); // Safe default
  });

  it('rejects invalid or missing birth dates', () => {
    const badRow: ExcelRow = {
      Name: 'Sample Person',
      'Born Date': 'not-a-date',
    };

    const res = validateAndTransformRow(badRow, 3, seenSlugs);
    expect(res.error).toBeDefined();
    expect(res.entity).toBeUndefined();
  });

  it('rejects rows where death date precedes birth date', () => {
    const invertedRow: ExcelRow = {
      Name: 'Time Traveler',
      'Born Date': '1990-01-01',
      'Death Date': '1980-01-01',
    };

    const res = validateAndTransformRow(invertedRow, 4, seenSlugs);
    expect(res.error).toContain('Death date (1980-01-01) is earlier than birth date (1990-01-01)');
  });
});
