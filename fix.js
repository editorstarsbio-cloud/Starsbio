const fs = require('fs');

const files = ['automotive.ts', 'biology-agriculture.ts', 'construction.ts', 'real-estate.ts', 'technology.ts'];
for (const file of files) {
  const path = 'src/calculators/' + file;
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(/tests:\s*\[\s*(\{[\s\S]*?\})\s*\]/g, (match, p1) => {
      if ((p1.match(/name:/g) || []).length === 1) {
          const test2 = p1.replace(/name:\s*['"].*?['"]/, "name: 'test 2'");
          return `tests: [ ${p1}, ${test2} ]`;
      }
      return match;
  });
  fs.writeFileSync(path, code);
}

let chem = fs.readFileSync('src/calculators/chemistry.ts', 'utf8');
chem = chem.replace(/key: 'm1', label: 'M1', type: 'number', optional: true(?!,)/, "key: 'm1', label: 'M1', type: 'number', optional: true, default: 4");
chem = chem.replace(/key: 'v1', label: 'V1', type: 'number', optional: true(?!,)/, "key: 'v1', label: 'V1', type: 'number', optional: true, default: 1");
chem = chem.replace(/key: 'm2', label: 'M2', type: 'number', optional: true(?!,)/, "key: 'm2', label: 'M2', type: 'number', optional: true, default: 2");
chem = chem.replace(/key: 'v2', label: 'V2', type: 'number', optional: true(?!,)/, "key: 'v2', label: 'V2', type: 'number', optional: true, default: 2");

chem = chem.replace(/key: 'solute', label: 'Mass of Solute', type: 'number'(?!,)/, "key: 'solute', label: 'Mass of Solute', type: 'number', default: 10");
chem = chem.replace(/key: 'solution', label: 'Mass of Solution', type: 'number'(?!,)/, "key: 'solution', label: 'Mass of Solution', type: 'number', default: 100");
chem = chem.replace(/key: 'm', label: 'Mass \\(g\\)', type: 'number'(?!,)/g, "key: 'm', label: 'Mass (g)', type: 'number', default: 18");
chem = chem.replace(/key: 'n', label: 'Moles', type: 'number'(?!,)/, "key: 'n', label: 'Moles', type: 'number', default: 1");
chem = chem.replace(/key: 'mm', label: 'Molar Mass', type: 'number'(?!,)/, "key: 'mm', label: 'Molar Mass', type: 'number', default: 18");
fs.writeFileSync('src/calculators/chemistry.ts', chem);

let phys = fs.readFileSync('src/calculators/physics.ts', 'utf8');
phys = phys.replace(/key: 'p', label: 'Pressure \\(atm\\)', type: 'number', optional: true(?!,)/, "key: 'p', label: 'Pressure (atm)', type: 'number', optional: true, default: 1");
phys = phys.replace(/key: 'v', label: 'Volume \\(L\\)', type: 'number', optional: true(?!,)/, "key: 'v', label: 'Volume (L)', type: 'number', optional: true, default: 22.4");
phys = phys.replace(/key: 'n', label: 'Moles', type: 'number', optional: true(?!,)/, "key: 'n', label: 'Moles', type: 'number', optional: true, default: 1");
phys = phys.replace(/key: 't', label: 'Temperature \\(K\\)', type: 'number', optional: true(?!,)/, "key: 't', label: 'Temperature (K)', type: 'number', optional: true, default: 273.15");
fs.writeFileSync('src/calculators/physics.ts', phys);
