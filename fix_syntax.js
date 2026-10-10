const fs = require('fs');

for (const file of ['src/app/page.tsx', 'src/app/[slug]/page.tsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
}
console.log('Fixed syntax errors');
