const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('src/calculators').filter(f => f.endsWith('.ts') && f !== 'index.ts');
for (const file of files) {
    const fullPath = path.join('src/calculators', file);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes("status: 'tested'")) {
        content = content.replace(/status: 'tested'/g, "status: 'published'");
        fs.writeFileSync(fullPath, content);
        console.log('Fixed ' + file);
    }
}
