import { ZodiacSignInfo } from '@/types/database';

export const SITE_CONFIG = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'StarsBio',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.starsbio.co.uk').replace(/\/$/, ''),
  timezone: process.env.SITE_TIMEZONE || 'Europe/London',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'editor.starsbio@gmail.com',
  legalEntity: 'StarsBio Media Ltd.',
  registeredAddress: '71-75 Shelton Street, Covent Garden',
  cityPostalCountry: 'London, WC2H 9JQ, United Kingdom',
  governingLaw: 'Laws of England and Wales (UK GDPR & DPA 2018)',
  defaultSeoTitle: 'StarsBio — Celebrity Birthdays, Biographies & Profiles',
  defaultMetaDescription:
    'Discover verified birthdays, dynamic age calculations, zodiac profiles, life milestones, and factual biographies of global celebrities, creators, and public figures on StarsBio.',
};

/**
 * Normalizes text for matching and indexing (lowercase, trims, replaces non-alphanumerics with single spaces)
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Creates URL-friendly slug
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Safely parses and validates date strings (YYYY-MM-DD or supported formats).
 * Returns 'YYYY-MM-DD' or null if invalid.
 */
export function parseDate(dateVal: unknown): string | null {
  if (!dateVal) return null;

  if (typeof dateVal === 'string') {
    const trimmed = dateVal.trim();
    // Match ISO YYYY-MM-DD
    const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      if (isValidDateParts(year, month, day)) {
        return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }
    }

    // Try generic Date parsing for strings like 'July 18, 1967'
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      const year = parsed.getUTCFullYear();
      const month = parsed.getUTCMonth() + 1;
      const day = parsed.getUTCDate();
      if (isValidDateParts(year, month, day)) {
        return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }
    }
  } else if (typeof dateVal === 'number') {
    // Excel serial date number conversion (1900 date system)
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const millisPerDay = 24 * 60 * 60 * 1000;
    const jsDate = new Date(excelEpoch.getTime() + dateVal * millisPerDay);
    if (!isNaN(jsDate.getTime())) {
      const year = jsDate.getUTCFullYear();
      const month = jsDate.getUTCMonth() + 1;
      const day = jsDate.getUTCDate();
      if (isValidDateParts(year, month, day)) {
        return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }
    }
  }

  return null;
}

/**
 * Checks valid calendar date considering leap years
 */
export function isValidDateParts(year: number, month: number, day: number): boolean {
  if (year < 1000 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  const daysInMonths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonths[month - 1];
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Calculates dynamic age for living or deceased person based on target date (defaulting to current date in timezone).
 */
export function calculateAge(
  birthDateStr: string,
  deathDateStr?: string | null,
  referenceDateStr?: string
): { age: number; isDeceased: boolean } | null {
  const birth = parseDate(birthDateStr);
  if (!birth) return null;

  const [bYear, bMonth, bDay] = birth.split('-').map(Number);
  const isDeceased = Boolean(deathDateStr && parseDate(deathDateStr));

  let refYear: number;
  let refMonth: number;
  let refDay: number;

  if (isDeceased && deathDateStr) {
    const death = parseDate(deathDateStr);
    if (!death) return null;
    [refYear, refMonth, refDay] = death.split('-').map(Number);
  } else if (referenceDateStr) {
    const ref = parseDate(referenceDateStr);
    if (!ref) return null;
    [refYear, refMonth, refDay] = ref.split('-').map(Number);
  } else {
    // Current date
    const now = new Date();
    refYear = now.getUTCFullYear();
    refMonth = now.getUTCMonth() + 1;
    refDay = now.getUTCDate();
  }

  let age = refYear - bYear;
  if (refMonth < bMonth || (refMonth === bMonth && refDay < bDay)) {
    age--;
  }

  return { age: Math.max(0, age), isDeceased };
}

/**
 * Zodiac signs astronomical calendar reference
 */
export const ZODIAC_SIGNS: Record<string, ZodiacSignInfo> = {
  Aries: {
    sign: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dateRange: 'March 21 – April 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    description: 'Aries is the first astrological sign in the zodiac, associated with leadership, bold initiative, and high energy.',
  },
  Taurus: {
    sign: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dateRange: 'April 20 – May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    description: 'Taurus is an earth sign known for grounded reliability, steadfast focus, and appreciation of craftsmanship.',
  },
  Gemini: {
    sign: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dateRange: 'May 21 – June 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    description: 'Gemini is an air sign characterized by expressive communication, curiosity, and versatile interests.',
  },
  Cancer: {
    sign: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dateRange: 'June 21 – July 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    description: 'Cancer is a cardinal water sign associated with intuitive empathy, emotional depth, and devotion.',
  },
  Leo: {
    sign: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dateRange: 'July 23 – August 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    description: 'Leo is a vibrant fire sign known for natural presence, creativity, charisma, and warmth.',
  },
  Virgo: {
    sign: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dateRange: 'August 23 – September 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    description: 'Virgo is an earth sign defined by analytical precision, diligence, attention to detail, and methodical work.',
  },
  Libra: {
    sign: 'Libra',
    symbol: '♎',
    element: 'Air',
    dateRange: 'September 23 – October 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    description: 'Libra is an air sign known for diplomatic balance, aesthetic appreciation, and harmony.',
  },
  Scorpio: {
    sign: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dateRange: 'October 23 – November 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    description: 'Scorpio is a water sign associated with intensity, determination, strategic depth, and resilience.',
  },
  Sagittarius: {
    sign: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dateRange: 'November 22 – December 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    description: 'Sagittarius is an adventurous fire sign marked by philosophical outlook, optimism, and love of exploration.',
  },
  Capricorn: {
    sign: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dateRange: 'December 22 – January 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    description: 'Capricorn is an earth sign known for ambitious discipline, pragmatic leadership, and long-term endurance.',
  },
  Aquarius: {
    sign: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dateRange: 'January 20 – February 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    description: 'Aquarius is an innovative air sign characterized by visionary originality and humanitarian drive.',
  },
  Pisces: {
    sign: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dateRange: 'February 19 – March 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    description: 'Pisces is a compassionate water sign associated with artistic imagination, empathy, and intuitive perception.',
  },
};

/**
 * Determines zodiac sign from month and day based on established calendar boundaries.
 */
export function getZodiacSignFromDate(month: number, day: number): string | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  for (const info of Object.values(ZODIAC_SIGNS)) {
    if (info.startMonth === info.endMonth) {
      if (month === info.startMonth && day >= info.startDay && day <= info.endDay) {
        return info.sign;
      }
    } else if (info.startMonth > info.endMonth) {
      // Crossing year boundary (e.g., Capricorn: Dec 22 to Jan 19)
      if ((month === info.startMonth && day >= info.startDay) || (month === info.endMonth && day <= info.endDay)) {
        return info.sign;
      }
    } else {
      if (
        (month === info.startMonth && day >= info.startDay) ||
        (month === info.endMonth && day <= info.endDay)
      ) {
        return info.sign;
      }
    }
  }

  return null;
}

/**
 * Validates whether an assigned zodiac sign matches birth date.
 */
export function validateZodiacMatch(birthDateStr: string, signToCheck: string): boolean {
  const parsed = parseDate(birthDateStr);
  if (!parsed || !signToCheck) return false;

  const [, mStr, dStr] = parsed.split('-');
  const computed = getZodiacSignFromDate(parseInt(mStr, 10), parseInt(dStr, 10));
  if (!computed) return false;

  return computed.toLowerCase() === signToCheck.trim().toLowerCase();
}

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getMonthName(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) return '';
  return MONTH_NAMES[monthNumber - 1];
}

export function getDaysInMonth(monthNumber: number, leap = true): number {
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[monthNumber - 1] || 31;
}
