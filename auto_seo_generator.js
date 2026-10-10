const fs = require('fs');
const path = require('path');

// ==========================================
// 🔴 IMPORTANT: PUT YOUR GEMINI API KEY HERE
// ==========================================
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

// Delay function to avoid API rate limits
const delay = ms => new Promise(res => setTimeout(res, ms));

async function generateContent(slug) {
    const prompt = `
You are an elite Technical SEO and Content Expert. I need a VIP, highly-optimized, long-form Markdown article (1000 - 1500 words) for my tool: ${slug.replace(/-/g, ' ')}.

Goal: Outrank Omni Calculator, Calculator.net, and Bankrate by filling their content gaps, providing deep educational value, and using semantic SEO (GEO & LLMO).

Requirements:
- Write entirely in Markdown. Do not use HTML tags.
- Use ## and ### for headings.
- Include an "About" section, "How it Works" (with the exact math formula using $$ for block math and $ for inline), "Real-World Examples", and a comprehensive "Frequently Asked Questions" section.
- Provide strong, factual information.
- PROHIBITED WORDS: Do NOT use the words: delve, tapestry, multifaceted, pivotal, crucial, leverage, robust, utilize, facilitate, comprehensive, enhance, engage, elevate, seamless, unlock, empower, navigate, realm, landscape, game-changer, cutting-edge, furthermore, moreover. No fluff.

Output ONLY the markdown content. No intro, no chat.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7 }
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error(`API Error for ${slug}:`, data.error.message);
            return null;
        }

        const text = data.candidates[0].content.parts[0].text;
        return text;
    } catch (e) {
        console.error(`Network Error for ${slug}:`, e.message);
        return null;
    }
}

async function main() {
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        console.error("❌ ERROR: Please put your Gemini API Key in the file first!");
        console.log("Get a free key here: https://aistudio.google.com/app/apikey");
        return;
    }

    const calcDir = path.join(__dirname, 'src', 'calculators');
    const contentDir = path.join(__dirname, 'src', 'content', 'calculators');

    // Create content dir if it doesn't exist
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }

    const files = fs.readdirSync(calcDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    
    let totalFound = 0;
    let totalGenerated = 0;

    for (const file of files) {
        const content = fs.readFileSync(path.join(calcDir, file), 'utf8');
        // Extract all slugs using regex
        const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
        let match;
        
        while ((match = slugRegex.exec(content)) !== null) {
            const slug = match[1];
            totalFound++;
            
            const mdPath = path.join(contentDir, `${slug}.md`);
            if (fs.existsSync(mdPath)) {
                console.log(`✅ Skipping ${slug} - Already exists.`);
                continue;
            }

            console.log(`⏳ Generating VIP SEO Content for: ${slug}...`);
            const markdown = await generateContent(slug);

            if (markdown) {
                fs.writeFileSync(mdPath, markdown);
                console.log(`🎉 Successfully saved: ${slug}.md`);
                totalGenerated++;
                // Wait 5 seconds before next request to avoid free tier rate limits (15 RPM)
                console.log("Sleeping for 5 seconds to prevent rate limits...");
                await delay(5000); 
            }
        }
    }

    console.log(`\n======================================`);
    console.log(`Done! Found ${totalFound} calculators.`);
    console.log(`Generated ${totalGenerated} new VIP SEO articles.`);
    console.log(`======================================`);
}

main();
