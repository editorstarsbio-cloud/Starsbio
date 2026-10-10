const fs = require('fs');
const path = require('path');

const layoutTsxPath = path.join('src', 'app', 'layout.tsx');
let content = fs.readFileSync(layoutTsxPath, 'utf8');

const newHeader = `<header className="bg-[#0e4e7e] sticky top-0 z-10 shadow-sm border-b-4 border-[#0e4e7e]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-end h-14">
              <div className="flex-shrink-0 pb-2">
                <Link href="/" className="font-bold text-2xl text-white tracking-tight">
                  AllCalcTool<span className="text-gray-300 text-lg">.com</span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-1 h-full items-end">
                <Link href="/category/finance/" className="text-white hover:bg-white hover:text-black font-bold text-xs px-3 py-2 uppercase border-t-4 border-[#5a8647] rounded-t-sm transition-colors h-10 flex items-center">
                  Financial
                </Link>
                <Link href="/category/health-fitness/" className="text-white hover:bg-white hover:text-black font-bold text-xs px-3 py-2 uppercase border-t-4 border-[#3b934b] rounded-t-sm transition-colors h-10 flex items-center">
                  Fitness & Health
                </Link>
                <Link href="/category/math/" className="text-white hover:bg-white hover:text-black font-bold text-xs px-3 py-2 uppercase border-t-4 border-[#125ba7] rounded-t-sm transition-colors h-10 flex items-center">
                  Math
                </Link>
                <Link href="/category/other/" className="text-white hover:bg-white hover:text-black font-bold text-xs px-3 py-2 uppercase border-t-4 border-slate-500 rounded-t-sm transition-colors h-10 flex items-center">
                  Other
                </Link>
              </nav>
            </div>
          </div>
        </header>`;

const newFooter = `<footer className="bg-[#eeeeee] border-t border-slate-300 mt-auto text-xs text-slate-600 text-center py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-2">
            <Link href="/about/" className="hover:underline">about us</Link> | 
            <Link href="/sitemap/" className="hover:underline">sitemap</Link> | 
            <Link href="/terms/" className="hover:underline">terms of use</Link> | 
            <Link href="/privacy/" className="hover:underline">privacy policy</Link>
            <span className="ml-2">&copy; 2024 AllCalcTool.com</span>
          </div>
        </footer>`;

const headerStart = content.indexOf('<header');
const headerEnd = content.indexOf('</header>') + 9;
content = content.substring(0, headerStart) + newHeader + content.substring(headerEnd);

const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>') + 9;
content = content.substring(0, footerStart) + newFooter + content.substring(footerEnd);

// Also remove bg-white from body if any
content = content.replace('bg-white', 'bg-white');

fs.writeFileSync(layoutTsxPath, content);
console.log("Updated layout.tsx header and footer");
