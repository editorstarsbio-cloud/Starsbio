import { Celebrity, Category, CelebritySource, CelebrityRelationship } from '@/types/database';
import { getPublicSupabase } from './supabase';
import { parseDate, normalizeText } from './utils';

// High-quality editorial fallback records ensuring a rich, error-free demonstration
// and testable UI even before live Supabase credentials are configured by the user.
export const SAMPLE_CELEBRITIES: Celebrity[] = [
  {
    id: 'c101-vin-diesel',
    name: 'Vin Diesel',
    normalized_name: 'vin diesel',
    slug: 'vin-diesel',
    birth_date: '1967-07-18',
    death_date: null,
    birthplace: 'Alameda, California, United States',
    biography: 'Vin Diesel is an American actor, director, and producer renowned worldwide for portraying Dominic Toretto in the Fast & Furious franchise and voicing Groot in the Marvel Cinematic Universe. Known for his deep voice and charismatic action screen presence, Diesel established himself among the highest-grossing film stars globally.',
    primary_profession: 'Movie Actor',
    zodiac_sign: 'Cancer',
    image_url: null,
    image_alt: 'Vin Diesel portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Vin Diesel — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Discover Vin Diesel\'s biography, dynamic age calculation, zodiac traits, career highlights, and Fast & Furious legacy.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c102-arsenio-hall',
    name: 'Arsenio Hall',
    normalized_name: 'arsenio hall',
    slug: 'arsenio-hall',
    birth_date: '1956-02-12',
    death_date: null,
    birthplace: 'Cleveland, Ohio, United States',
    biography: 'Arsenio Hall is an acclaimed American comedian, actor, and groundbreaking late-night talk show host. His show, The Arsenio Hall Show, became a cultural milestone of the late 1980s and early 1990s, famous for dynamic guest interviews and its iconic fist-pumping "woof woof" crowd salute.',
    primary_profession: 'TV Show Host',
    zodiac_sign: 'Aquarius',
    image_url: null,
    image_alt: 'Arsenio Hall portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Arsenio Hall — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Discover Arsenio Hall\'s biography, age, talk show legacy, and entertainment career highlights.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c103-taylor-swift',
    name: 'Taylor Swift',
    normalized_name: 'taylor swift',
    slug: 'taylor-swift',
    birth_date: '1989-12-13',
    death_date: null,
    birthplace: 'West Reading, Pennsylvania, United States',
    biography: 'Taylor Swift is a prolific American singer-songwriter whose narrative songwriting and cultural impact have redefined modern popular music. With historic Grammy Album of the Year wins and the monumental worldwide Eras Tour, Swift stands as one of the best-selling music artists of all time.',
    primary_profession: 'Pop Singer',
    zodiac_sign: 'Sagittarius',
    image_url: null,
    image_alt: 'Taylor Swift portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Taylor Swift — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Explore Taylor Swift\'s verified birthday, age, zodiac sign, career discography, and biographical milestones.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c104-zendaya',
    name: 'Zendaya',
    normalized_name: 'zendaya',
    slug: 'zendaya',
    birth_date: '1996-09-01',
    death_date: null,
    birthplace: 'Oakland, California, United States',
    biography: 'Zendaya is an acclaimed American actress and singer who garnered widespread acclaim for her roles in Euphoria, Dune, and Spider-Man. She has earned multiple Primetime Emmy Awards, becoming one of the youngest lead acting winners in Emmy history.',
    primary_profession: 'Movie Actress',
    zodiac_sign: 'Virgo',
    image_url: null,
    image_alt: 'Zendaya portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Zendaya — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Learn about Zendaya\'s birthday, age, career breakthroughs in Dune and Euphoria, and life milestones.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c105-leonardo-dicaprio',
    name: 'Leonardo DiCaprio',
    normalized_name: 'leonardo dicaprio',
    slug: 'leonardo-dicaprio',
    birth_date: '1974-11-11',
    death_date: null,
    birthplace: 'Los Angeles, California, United States',
    biography: 'Leonardo DiCaprio is an Academy Award-winning American actor and film producer recognized for his versatile performances in Titanic, Inception, The Wolf of Wall Street, and The Revenant. Beyond cinema, he is a dedicated environmental conservation advocate.',
    primary_profession: 'Movie Actor',
    zodiac_sign: 'Scorpio',
    image_url: null,
    image_alt: 'Leonardo DiCaprio portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Leonardo DiCaprio — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Explore Leonardo DiCaprio\'s birthday, age, filmography, Academy Award milestones, and environmental advocacy.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c106-albert-einstein',
    name: 'Albert Einstein',
    normalized_name: 'albert einstein',
    slug: 'albert-einstein',
    birth_date: '1879-03-14',
    death_date: '1955-04-18',
    birthplace: 'Ulm, Kingdom of Württemberg, German Empire',
    biography: 'Albert Einstein was a theoretical physicist widely acknowledged to be one of the greatest and most influential physicists of all time. Best known for developing the theory of relativity, he also made critical contributions to the theory of quantum mechanics and received the 1921 Nobel Prize in Physics.',
    primary_profession: 'Physicist',
    zodiac_sign: 'Pisces',
    image_url: null,
    image_alt: 'Albert Einstein portrait placeholder',
    status: 'published',
    content_rights_status: 'public_domain_historical',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Albert Einstein — Birthday, Age at Death, Bio & Facts | StarBirthday',
    meta_description: 'Discover Albert Einstein\'s birthday (March 14, 1879), age at death, groundbreaking physics achievements, and legacy.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c107-cristiano-ronaldo',
    name: 'Cristiano Ronaldo',
    normalized_name: 'cristiano ronaldo',
    slug: 'cristiano-ronaldo',
    birth_date: '1985-02-05',
    death_date: null,
    birthplace: 'Funchal, Madeira, Portugal',
    biography: 'Cristiano Ronaldo is a Portuguese professional footballer considered one of the greatest football players in sports history. A five-time Ballon d\'Or winner, he has captured numerous domestic and international titles with Manchester United, Real Madrid, Juventus, and Portugal.',
    primary_profession: 'Soccer Player',
    zodiac_sign: 'Aquarius',
    image_url: null,
    image_alt: 'Cristiano Ronaldo portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Cristiano Ronaldo — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Find Cristiano Ronaldo\'s birthday, age, career trophy statistics, and football records.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'c108-beyonce',
    name: 'Beyoncé',
    normalized_name: 'beyonce',
    slug: 'beyonce',
    birth_date: '1981-09-04',
    death_date: null,
    birthplace: 'Houston, Texas, United States',
    biography: 'Beyoncé Knowles-Carter is an American singer, songwriter, and businesswoman. Rising to fame with Destiny\'s Child, she became a towering cultural icon with critically acclaimed solo albums including Dangerously in Love, Lemonade, and Renaissance. She is the most awarded artist in Grammy history.',
    primary_profession: 'Pop Singer',
    zodiac_sign: 'Virgo',
    image_url: null,
    image_alt: 'Beyoncé portrait placeholder',
    status: 'published',
    content_rights_status: 'cleared_public_domain_profile',
    fact_check_status: 'verified',
    source_verified_at: '2026-01-15T00:00:00Z',
    seo_title: 'Beyoncé — Birthday, Age, Bio & Facts | StarBirthday',
    meta_description: 'Explore Beyoncé\'s verified birthday, age, musical achievements, record-setting Grammy milestones, and biography.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
];

export const SAMPLE_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Movie Actor', slug: 'movie-actor', description: 'Celebrated actors across blockbuster cinema, independent films, and television.', created_at: '', updated_at: '' },
  { id: 'cat-2', name: 'Movie Actress', slug: 'movie-actress', description: 'Award-winning leading actresses shaping stage, television, and film.', created_at: '', updated_at: '' },
  { id: 'cat-3', name: 'Pop Singer', slug: 'pop-singer', description: 'Chart-topping musical artists, vocalists, and international performers.', created_at: '', updated_at: '' },
  { id: 'cat-4', name: 'TV Show Host', slug: 'tv-show-host', description: 'Influential presenters, talk show hosts, and broadcast journalists.', created_at: '', updated_at: '' },
  { id: 'cat-5', name: 'Soccer Player', slug: 'soccer-player', description: 'World-class football athletes competing across top international leagues.', created_at: '', updated_at: '' },
  { id: 'cat-6', name: 'Physicist', slug: 'physicist', description: 'Pioneering scientific minds and historic Nobel Prize laureates.', created_at: '', updated_at: '' },
];

/**
 * Repository queries with automatic fallback to verified in-memory dataset when Supabase is unconfigured or in offline mode.
 */
export async function getCelebrityBySlug(slug: string): Promise<Celebrity | null> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (data) return data as Celebrity;
  }

  // Fallback to sample data
  const found = SAMPLE_CELEBRITIES.find((c) => c.slug === slug && c.status === 'published');
  return found || null;
}

export async function getCelebritiesBornOn(month: number, day: number, limit = 50): Promise<Celebrity[]> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('status', 'published')
      .filter('birth_date', 'like', `%-` + `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
      .limit(limit);

    if (data && data.length > 0) return data as Celebrity[];
  }

  // In-memory filter
  const targetPattern = `-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return SAMPLE_CELEBRITIES.filter((c) => c.status === 'published' && c.birth_date.endsWith(targetPattern)).slice(0, limit);
}

export async function getCelebritiesByZodiac(sign: string, limit = 50): Promise<Celebrity[]> {
  const normalizedSign = sign.toLowerCase();
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('status', 'published')
      .ilike('zodiac_sign', sign)
      .limit(limit);

    if (data && data.length > 0) return data as Celebrity[];
  }

  return SAMPLE_CELEBRITIES.filter(
    (c) => c.status === 'published' && c.zodiac_sign?.toLowerCase() === normalizedSign
  ).slice(0, limit);
}

export async function getCelebritiesByCategory(categorySlug: string, limit = 50): Promise<{ category: Category | null; celebrities: Celebrity[] }> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data: catData } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (catData) {
      const { data: celebs } = await supabase
        .from('celebrities')
        .select('*')
        .eq('status', 'published')
        .ilike('primary_profession', catData.name)
        .limit(limit);

      return {
        category: catData as Category,
        celebrities: (celebs as Celebrity[]) || [],
      };
    }
  }

  const category = SAMPLE_CATEGORIES.find((c) => c.slug === categorySlug) || null;
  const celebrities = category
    ? SAMPLE_CELEBRITIES.filter(
        (c) => c.status === 'published' && c.primary_profession?.toLowerCase() === category.name.toLowerCase()
      ).slice(0, limit)
    : [];

  return { category, celebrities };
}

export async function searchCelebrities(query: string, limit = 30): Promise<Celebrity[]> {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('status', 'published')
      .ilike('name', `%${query}%`)
      .limit(limit);

    if (data && data.length > 0) return data as Celebrity[];
  }

  return SAMPLE_CELEBRITIES.filter(
    (c) => c.status === 'published' && (c.normalized_name.includes(normalized) || normalizeText(c.primary_profession || '').includes(normalized))
  ).slice(0, limit);
}

export async function getFeaturedCelebrities(limit = 8): Promise<Celebrity[]> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (data && data.length > 0) return data as Celebrity[];
  }

  return SAMPLE_CELEBRITIES.filter((c) => c.status === 'published').slice(0, limit);
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data && data.length > 0) return data as Category[];
  }
  return SAMPLE_CATEGORIES;
}

export async function getRelatedCelebrities(celebrity: Celebrity, limit = 4): Promise<Celebrity[]> {
  const supabase = getPublicSupabase();
  if (supabase) {
    // Attempt to query related entities or share same primary profession
    const { data } = await supabase
      .from('celebrities')
      .select('*')
      .eq('status', 'published')
      .neq('id', celebrity.id)
      .eq('primary_profession', celebrity.primary_profession || '')
      .limit(limit);

    if (data && data.length > 0) return data as Celebrity[];
  }

  return SAMPLE_CELEBRITIES.filter(
    (c) => c.status === 'published' && c.id !== celebrity.id && c.primary_profession === celebrity.primary_profession
  ).slice(0, limit);
}
