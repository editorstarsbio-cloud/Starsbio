import { Celebrity, Category } from '@/types/database';
import { normalizeText } from './utils';
import celebritiesData from '@/data/celebrities.json';
import categoriesData from '@/data/categories.json';

// In-memory typed datasets
const allCelebrities: Celebrity[] = celebritiesData as unknown as Celebrity[];
const allCategories: Category[] = categoriesData as unknown as Category[];

// Fast indexed maps for instant O(1) lookups
const slugIndex = new Map<string, Celebrity>();
const birthdayIndex = new Map<string, Celebrity[]>();
const zodiacIndex = new Map<string, Celebrity[]>();
const categoryIndex = new Map<string, Celebrity[]>();

for (const c of allCelebrities) {
  slugIndex.set(c.slug, c);

  // Index by MM-DD
  const parts = c.birth_date.split('-');
  if (parts.length === 3) {
    const key = `${parts[1]}-${parts[2]}`;
    const list = birthdayIndex.get(key) || [];
    list.push(c);
    birthdayIndex.set(key, list);
  }

  // Index by zodiac
  if (c.zodiac_sign) {
    const zKey = c.zodiac_sign.toLowerCase();
    const list = zodiacIndex.get(zKey) || [];
    list.push(c);
    zodiacIndex.set(zKey, list);
  }

  // Index by profession
  if (c.primary_profession) {
    const pKey = c.primary_profession.toLowerCase();
    const list = categoryIndex.get(pKey) || [];
    list.push(c);
    categoryIndex.set(pKey, list);
  }
}

export async function getCelebrityBySlug(slug: string): Promise<Celebrity | null> {
  return slugIndex.get(slug) || null;
}

export async function getCelebritiesBornOn(month: number, day: number, limit = 50): Promise<Celebrity[]> {
  const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const list = birthdayIndex.get(key) || [];
  return list.slice(0, limit);
}

export async function getCelebritiesByZodiac(sign: string, limit = 50): Promise<Celebrity[]> {
  const list = zodiacIndex.get(sign.toLowerCase()) || [];
  return list.slice(0, limit);
}

export async function getCelebritiesByCategory(
  categorySlug: string,
  limit = 50
): Promise<{ category: Category | null; celebrities: Celebrity[] }> {
  const category = allCategories.find((c) => c.slug === categorySlug) || null;
  if (!category) {
    return { category: null, celebrities: [] };
  }

  const list = categoryIndex.get(category.name.toLowerCase()) || [];
  return {
    category,
    celebrities: list.slice(0, limit),
  };
}

export async function searchCelebrities(query: string, limit = 50): Promise<Celebrity[]> {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  const results: Celebrity[] = [];
  for (const c of allCelebrities) {
    if (c.normalized_name.includes(normalized) || normalizeText(c.primary_profession || '').includes(normalized)) {
      results.push(c);
      if (results.length >= limit) break;
    }
  }

  return results;
}

export async function getFeaturedCelebrities(limit = 8): Promise<Celebrity[]> {
  return allCelebrities.slice(0, limit);
}

export async function getAllCategories(): Promise<Category[]> {
  return allCategories;
}

export async function getRelatedCelebrities(celebrity: Celebrity, limit = 4): Promise<Celebrity[]> {
  if (!celebrity.primary_profession) return [];
  const list = categoryIndex.get(celebrity.primary_profession.toLowerCase()) || [];
  return list.filter((c) => c.id !== celebrity.id).slice(0, limit);
}
