import { notFound } from 'next/navigation';
import { getCalculators, categories } from '@/calculators';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const category = categories.find((c) => c.slug === p.slug);
  if (!category) return {};

  return {
    title: `${category.name} Calculators`,
    description: category.desc,
    alternates: {
      canonical: `https://www.allcalctool.com/category/${category.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const p = await params;
  const category = categories.find((c) => c.slug === p.slug);
  if (!category) notFound();

  const allCalculators = await getCalculators();
  const calcs = allCalculators.filter(c => c.category === category.slug && c.status === 'published');
  
  // Sort alphabetically
  calcs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-5xl mx-auto">
      <nav className="flex text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">Categories</span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-slate-800 font-medium">{category.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{category.name} Calculators</h1>
        <p className="text-lg text-slate-600">{category.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calcs.map(calc => (
          <Link key={calc.id} href={`/${calc.slug}/`} className="card p-6 hover:border-primary hover:shadow-md transition-all group flex flex-col">
            <h2 className="font-bold text-xl text-slate-900 group-hover:text-primary mb-2">{calc.name}</h2>
            <p className="text-sm text-slate-600 flex-grow">{calc.short}</p>
          </Link>
        ))}
      </div>
      
      {calcs.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-500">More calculators are coming to this category soon.</p>
        </div>
      )}
    </div>
  );
}
