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

  // Calculator.net 4-column layout mapping
  const financialCats = ['finance', 'business', 'real-estate'];
  const healthCats = ['health-fitness', 'sports', 'biology-agriculture'];
  const mathCats = ['math', 'statistics'];
  const otherCats = ['date-time', 'education', 'construction', 'automotive', 'cooking', 'technology', 'physics', 'chemistry', 'engineering'];

  const getLinksForCategories = (cats: string[]) => {
    return cats.flatMap(cat => byCategory[cat] || []).sort((a,b) => a.name.localeCompare(b.name));
  };

  const financialLinks = getLinksForCategories(financialCats);
  const healthLinks = getLinksForCategories(healthCats);
  const mathLinks = getLinksForCategories(mathCats);
  const otherLinks = getLinksForCategories(otherCats);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-8">
        <div className="bg-[#e7eef4] border border-[#a4c2e4] rounded p-6 mb-8 mx-auto max-w-3xl flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="mb-4 md:mb-0 text-left">
             <h2 className="text-[#0e4e7e] text-2xl font-bold mb-2">Free Online Calculators</h2>
             <p className="text-sm text-slate-700">Find the calculator you need quickly.</p>
          </div>
          <div className="w-full md:w-1/2">
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
          </div>
        </div>
      </section>

      {/* 4-Column Layout like Calculator.net */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        
        {/* Column 1: Financial */}
        <div>
           <div className="flex justify-center mb-4 h-24 items-center">
             <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow">
                <span className="text-2xl">💰</span>
             </div>
           </div>
           <h3 className="text-lg font-bold text-[#0e4e7e] border-b border-[#a4c2e4] pb-2 mb-3">Financial Calculators</h3>
           <ul className="flex flex-col gap-1.5 text-sm">
             {financialLinks.map(calc => (
               <li key={calc.id}>
                 <Link href={`/${calc.slug}/`} className="text-[#0e4e7e] hover:underline leading-tight block">
                   {calc.name}
                 </Link>
               </li>
             ))}
           </ul>
        </div>

        {/* Column 2: Fitness & Health */}
        <div>
           <div className="flex justify-center mb-4 h-24 items-center">
             <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow">
                <span className="text-2xl">🏃</span>
             </div>
           </div>
           <h3 className="text-lg font-bold text-[#0e4e7e] border-b border-[#a4c2e4] pb-2 mb-3">Fitness & Health Calculators</h3>
           <ul className="flex flex-col gap-1.5 text-sm">
             {healthLinks.map(calc => (
               <li key={calc.id}>
                 <Link href={`/${calc.slug}/`} className="text-[#0e4e7e] hover:underline leading-tight block">
                   {calc.name}
                 </Link>
               </li>
             ))}
           </ul>
        </div>

        {/* Column 3: Math */}
        <div>
           <div className="flex justify-center mb-4 h-24 items-center">
             <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow">
                <span className="text-2xl">🔢</span>
             </div>
           </div>
           <h3 className="text-lg font-bold text-[#0e4e7e] border-b border-[#a4c2e4] pb-2 mb-3">Math Calculators</h3>
           <ul className="flex flex-col gap-1.5 text-sm">
             {mathLinks.map(calc => (
               <li key={calc.id}>
                 <Link href={`/${calc.slug}/`} className="text-[#0e4e7e] hover:underline leading-tight block">
                   {calc.name}
                 </Link>
               </li>
             ))}
           </ul>
        </div>

        {/* Column 4: Other */}
        <div>
           <div className="flex justify-center mb-4 h-24 items-center">
             <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow">
                <span className="text-2xl">⚙️</span>
             </div>
           </div>
           <h3 className="text-lg font-bold text-[#0e4e7e] border-b border-[#a4c2e4] pb-2 mb-3">Other Calculators</h3>
           <ul className="flex flex-col gap-1.5 text-sm">
             {otherLinks.map(calc => (
               <li key={calc.id}>
                 <Link href={`/${calc.slug}/`} className="text-[#0e4e7e] hover:underline leading-tight block">
                   {calc.name}
                 </Link>
               </li>
             ))}
           </ul>
        </div>

      </div>

      <div className="flex justify-center mt-12 mb-12">
        <Link href="/categories/" className="bg-[#5a8647] hover:bg-[#4a6f3a] text-white px-6 py-2 rounded font-bold transition-colors">
          All Calculators &rarr;
        </Link>
      </div>

      {/* SEO Footer Text */}
      <div className="bg-[#eeeeee] p-6 text-xs text-slate-600 rounded-lg text-justify leading-relaxed">
        AllCalcTool.com's sole focus is to provide fast, comprehensive, convenient, free online calculators in a plethora of areas. Currently, we have over 150 calculators to help you "do the math" quickly in areas such as finance, fitness, health, math, and others, and we are still developing more. Our goal is to become the one-stop, go-to site for people who need to make quick calculations. Additionally, we believe the internet should be a source of free information. Therefore, all of our tools and services are completely free, with no registration required.
        <br/><br/>
        We coded and developed each calculator individually and put each one through strict, comprehensive testing. However, please inform us if you notice even the slightest error – your input is extremely valuable to us.
      </div>

    </div>
  );
}
