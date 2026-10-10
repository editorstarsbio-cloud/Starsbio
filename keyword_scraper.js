const fs = require('fs');
const https = require('http'); // The suggest API uses http usually, or we can use fetch

const SEED_KEYWORDS = [
    "calculator",
    "how to calculate",
    "formula for",
    "percent calculator",
    "interest calculator",
    "mortgage calculator",
    "math calculator",
    "health calculator",
    "finance calculator"
];

const SUFFIXES = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

async function fetchSuggestions(query) {
    const url = `http://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[1] || [];
    } catch (e) {
        return [];
    }
}

async function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function main() {
    console.log("Starting Keyword Scraper using Node.js...");
    const allKeywords = new Set();
    const stream = fs.createWriteStream("massive_keywords.csv", { flags: 'w' });
    stream.write("Keyword\n");

    for (const seed of SEED_KEYWORDS) {
        console.log(`Scraping base: ${seed}`);
        
        // Direct
        const direct = await fetchSuggestions(seed);
        for (const s of direct) {
            if (!allKeywords.has(s)) {
                allKeywords.add(s);
                stream.write(`"${s.replace(/"/g, '""')}"\n`);
            }
        }

        // Suffixes
        for (const suffix of SUFFIXES) {
            const query = `${seed} ${suffix}`;
            const suggestions = await fetchSuggestions(query);
            for (const s of suggestions) {
                if (!allKeywords.has(s)) {
                    allKeywords.add(s);
                    stream.write(`"${s.replace(/"/g, '""')}"\n`);
                }
            }
            await delay(100); // 100ms delay to avoid blocking
        }
    }
    
    stream.end();
    console.log(`\nDone! Successfully saved ${allKeywords.size} unique keywords to 'massive_keywords.csv'`);
}

main();
