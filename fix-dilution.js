const fs = require('fs');
let chem = fs.readFileSync('src/calculators/chemistry.ts', 'utf8');
chem = chem.replace(/key: 'm1', label: 'M1', type: 'number', optional: true, default: 4/, "key: 'm1', label: 'M1', type: 'number', optional: true");
fs.writeFileSync('src/calculators/chemistry.ts', chem);
