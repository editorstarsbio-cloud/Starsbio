const fs = require('fs');

let stat = fs.readFileSync('src/calculators/statistics.ts', 'utf8');
stat = stat.replace(/short: 'Calculate variance\.',/, "short: 'Calculate the variance of a dataset.',");
stat = stat.replace(/short: 'Calculate nCr\.',/, "short: 'Calculate combinations (nCr) for items.',");
stat = stat.replace(/short: 'Calculate nPr\.',/, "short: 'Calculate permutations (nPr) for items.',");
stat = stat.replace(/short: 'Calculate quartiles\.',/, "short: 'Calculate quartiles for a data set.',");
fs.writeFileSync('src/calculators/statistics.ts', stat);

let dt = fs.readFileSync('src/calculators/date-time.ts', 'utf8');
dt = dt.replace(/short: 'Calculate age\.',/, "short: 'Calculate age from a birth date.',");
dt = dt.replace(/short: 'Add days to a date\.',/, "short: 'Add or subtract days from a date.',");
dt = dt.replace(/short: 'Add minutes to time\.',/, "short: 'Add or subtract minutes from a given time.',");
fs.writeFileSync('src/calculators/date-time.ts', dt);
