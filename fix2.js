const fs = require('fs');

['src/calculators/finance.ts', 'src/calculators/business.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("tests: [{ name: 'Basic',")) {
      const match = lines[i].match(/tests:\s*\[(.*?)\]/);
      if (match) {
        const test1 = match[1];
        const test2 = test1.replace("'Basic'", "'Basic 2'");
        lines[i] = `    tests: [${test1}, ${test2}]`;
      }
    }
  }
  fs.writeFileSync(file, lines.join('\n'));
  console.log('Fixed', file);
});
