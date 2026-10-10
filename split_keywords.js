const fs = require('fs');

const lines = fs.readFileSync('massive_keywords.csv', 'utf8').split('\n');

const blogKeywords = [];
const calcKeywords = [];

for (const line of lines) {
    if (!line.trim() || line.trim() === 'Keyword') continue;
    const kw = line.replace(/"/g, '').toLowerCase();
    
    // Blog keywords (Informational)
    if (kw.includes('how ') || kw.includes('formula') || kw.includes('what is') || kw.includes('guide') || kw.includes('meaning') || kw.includes('vs') || kw.includes('difference')) {
        blogKeywords.push(line);
    } 
    // Calculator keywords (Transactional)
    else if (kw.includes('calculator') || kw.includes('converter') || kw.includes('tool') || kw.includes('generator')) {
        calcKeywords.push(line);
    } else {
        // Fallback: If it's something like "mortgage rate", it's probably better for blog, but we'll categorize based on keywords.
        // Let's put ambiguous ones in calculator keywords.
        calcKeywords.push(line);
    }
}

fs.writeFileSync('blog_keywords.csv', 'Keyword\n' + blogKeywords.join('\n'));
fs.writeFileSync('calculator_keywords.csv', 'Keyword\n' + calcKeywords.join('\n'));

console.log(`Split successfully: ${blogKeywords.length} Blog Keywords and ${calcKeywords.length} Calculator Keywords.`);
