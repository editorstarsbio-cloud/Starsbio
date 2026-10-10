const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src/content/blog/articles');
const indexFile = path.join(__dirname, 'src/content/blog/index.ts');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.ts'));

let imports = "import type { Article, BlogCategorySlug } from './types';\n";
let allArray = "export const getArticles = async (): Promise<Article[]> => {\n  const all: Article[] = [\n";

files.forEach((file, idx) => {
  const name = file.replace('.ts', '');
  const camelName = name.replace(/-([a-z0-9])/g, g => g[1].toUpperCase()) + 'Article';
  imports += `import { article as ${camelName} } from './articles/${name}';\n`;
  allArray += `    ${camelName}${idx < files.length - 1 ? ',' : ''}\n`;
});

allArray += "  ];\n  return all.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());\n};\n";

const categories = `export const blogCategories: { slug: BlogCategorySlug; name: string }[] = [
  { slug: 'math-guides', name: 'Math Guides' },
  { slug: 'finance-guides', name: 'Finance Guides' },
  { slug: 'business-calculations', name: 'Business Calculations' },
  { slug: 'health-fitness', name: 'Health & Fitness' },
  { slug: 'education', name: 'Education' },
  { slug: 'date-time', name: 'Date & Time' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'automotive', name: 'Automotive' },
  { slug: 'cooking', name: 'Cooking' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'statistics', name: 'Statistics' },
  { slug: 'everyday-calculations', name: 'Everyday Calculations' },
  { slug: 'science', name: 'Science' }
];\n`;

const finalContent = imports + "\n" + allArray + "\n" + categories;

fs.writeFileSync(indexFile, finalContent);
console.log('index.ts generated');
