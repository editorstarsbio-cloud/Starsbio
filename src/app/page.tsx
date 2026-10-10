import Link from 'next/link';
import { getCalculators, categories } from '@/calculators';
import Search from '@/components/Search';

export default async function HomePage() {
  const allCalculators = await getCalculators();
  const published = allCalculators.filter(c => c.status === 'published');
  
  // Group by category
  const byCategory = published.reduce((acc, calc) => {
    if (!acc[calc.category]) acc[calc.category] = [];
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof published>);

  const popular = published.filter(c => c.popular).slice(0, 8);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Every Calculator You Need,<br/>
          <span className="text-primary">In One Place.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          Free, fast, and highly accurate calculators for everyday math, finance, health, science, and more.
        </p>
        
        <Search 
          items={published.map(c => ({
            slug: c.slug,
            name: c.name,
            short: c.short,
            category: c.category,
            aliases: c.aliases,
            tags: c.tags
          }))}
        />
      </section>

      {/* Popular Calculators */}
      {popular.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map(calc => (
              <Link key={calc.id} href={`/${calc.slug}/`} className="card p-5 hover:border-primary hover:shadow-md transition-all group">
                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">{calc.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{calc.short}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(cat => byCategory[cat.slug]?.length > 0).map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}/`} className="card p-6 hover:shadow-md transition-all flex flex-col h-full group">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary mb-2">{cat.name}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{cat.desc}</p>
              <span className="text-sm font-medium text-primary">
                {byCategory[cat.slug]?.length || 0} calculators &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Calculators Directory */}
      <section id="all">
        <h2 className="text-3xl font-bold mb-8">All Calculators A-Z</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          {categories.filter(cat => byCategory[cat.slug]?.length > 0).map(cat => (
            <div key={cat.slug} className="mb-10 last:mb-0">
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                {cat.name}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {byCategory[cat.slug].sort((a,b) => a.name.localeCompare(b.name)).map(calc => (
                  <li key={calc.id}>
                    <Link href={`/${calc.slug}/`} className="text-slate-600 hover:text-primary hover:underline text-sm md:text-base">
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
