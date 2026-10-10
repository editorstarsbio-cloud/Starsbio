const fs = require('fs');
const path = require('path');
const articlesDir = path.join(__dirname, 'src/content/blog/articles');

const validCategories = new Set([
  'math-guides', 'finance-guides', 'business-calculations', 'health-fitness',
  'education', 'date-time', 'construction', 'real-estate', 'automotive',
  'cooking', 'technology', 'statistics', 'everyday-calculations', 'science'
]);

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filepath = path.join(articlesDir, file);
  let txt = fs.readFileSync(filepath, 'utf8');
  
  // Find category match
  const match = txt.match(/category:\s*'([^']+)'/);
  if (match) {
    let cat = match[1];
    if (!validCategories.has(cat)) {
      console.log(`Fixing category in ${file}: ${cat}`);
      // Simple mapping
      let newCat = cat;
      if (cat === 'construction-guides') newCat = 'construction';
      else if (cat === 'health-and-fitness') newCat = 'health-fitness';
      else if (cat === 'math') newCat = 'math-guides';
      else if (cat === 'finance') newCat = 'finance-guides';
      else if (cat === 'science-guides') newCat = 'science';
      else if (cat === 'business') newCat = 'business-calculations';
      else if (cat === 'technology-guides') newCat = 'technology';
      
      if (validCategories.has(newCat)) {
        txt = txt.replace(/category:\s*'[^']+'/, `category: '${newCat}'`);
        fs.writeFileSync(filepath, txt);
      } else {
        console.log(`Unknown category mapping for ${cat} in ${file}`);
        txt = txt.replace(/category:\s*'[^']+'/, `category: 'math-guides'`); // fallback
        fs.writeFileSync(filepath, txt);
      }
    }
  }
});
console.log('Categories checked');
