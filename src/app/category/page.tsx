import Link from 'next/link';
import { categories } from '@/calculators';

export const metadata = {
  title: 'All Calculator Categories - AllCalcTool.com',
  description: 'Browse our complete list of calculator categories including Math, Finance, Health & Fitness, Physics, Engineering, and more.',
  alternates: {
    canonical: 'https://www.allcalctool.com/category/',
  }
};

export default function CategoryIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Calculator Categories</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Browse our collection of hundreds of free calculators across mathematics, finance, health, science, and everyday life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <Link key={cat.slug} href={`/category/${cat.slug}/`} className="card p-6 hover:shadow-md transition-all flex flex-col h-full group border border-slate-200 rounded-xl bg-white">
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary mb-2 flex items-center justify-between">
              {cat.name}
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h2>
            <p className="text-sm text-slate-600 flex-grow">
              {cat.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
