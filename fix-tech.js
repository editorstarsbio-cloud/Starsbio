const fs = require('fs');
let txt = fs.readFileSync('src/calculators/technology.ts', 'utf8');
txt = txt.replace(/category: 'technology',/g, "category: 'technology',\n    status: 'published',");
fs.writeFileSync('src/calculators/technology.ts', txt);
console.log('Fixed technology.ts');
