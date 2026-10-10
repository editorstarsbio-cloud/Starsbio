import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Calculator } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | AllCalcTool.com',
    default: 'AllCalcTool.com - Free Online Calculators',
  },
  description: 'A comprehensive directory of free, easy-to-use calculators for math, finance, health, cooking, physics, and more.',
  metadataBase: new URL('https://www.allcalctool.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-dark transition-colors">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-xl text-slate-900 tracking-tight">
                    AllCalc<span className="text-primary">Tool</span>
                  </span>
                </Link>
                <nav className="hidden md:ml-10 md:flex md:space-x-8">
                  <Link href="/#all" className="text-slate-600 hover:text-slate-900 font-medium px-1 py-5">
                    All Calculators
                  </Link>
                  <Link href="/category/" className="text-slate-600 hover:text-slate-900 font-medium px-1 py-5">
                    Categories
                  </Link>
                  <Link href="/blog/" className="text-slate-600 hover:text-slate-900 font-medium px-1 py-5">
                    Blog
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg text-slate-900">AllCalcTool</span>
                </Link>
                <p className="text-sm text-slate-500">
                  Free, accurate, and easy-to-use calculators for everyday math, finance, health, and science.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Top Categories</h3>
                <ul className="space-y-3">
                  <li><Link href="/category/math/" className="text-sm text-slate-600 hover:text-primary">Math</Link></li>
                  <li><Link href="/category/finance/" className="text-sm text-slate-600 hover:text-primary">Finance</Link></li>
                  <li><Link href="/category/health-fitness/" className="text-sm text-slate-600 hover:text-primary">Health & Fitness</Link></li>
                  <li><Link href="/category/everyday/" className="text-sm text-slate-600 hover:text-primary">Everyday</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Legal & Info</h3>
                <ul className="space-y-3">
                  <li><Link href="/about/" className="text-sm text-slate-600 hover:text-primary">About Us</Link></li>
                  <li><Link href="/contact/" className="text-sm text-slate-600 hover:text-primary">Contact</Link></li>
                  <li><Link href="/privacy/" className="text-sm text-slate-600 hover:text-primary">Privacy Policy</Link></li>
                  <li><Link href="/terms/" className="text-sm text-slate-600 hover:text-primary">Terms of Use</Link></li>
                  <li><Link href="/disclaimer/" className="text-sm text-slate-600 hover:text-primary">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} AllCalcTool.com. All rights reserved.
              </p>
              <p className="text-sm text-slate-400 mt-4 md:mt-0">
                Not professional, medical, or financial advice.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
