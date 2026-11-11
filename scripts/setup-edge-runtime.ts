import fs from 'fs';
import path from 'path';

function processDir(dir: string) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      processDir(fullPath);
    } else if (item.name === 'page.tsx' || item.name === 'route.ts') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("export const runtime = 'nodejs'")) {
        content = content.replace("export const runtime = 'nodejs'", "export const runtime = 'edge'");
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Swapped to edge:', fullPath);
      } else if (!content.includes("export const runtime = 'edge'")) {
        // Only add edge runtime to dynamic pages/routes
        content = "export const runtime = 'edge';\n" + content;
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Added edge runtime:', fullPath);
      }
    }
  }
}

processDir('src/app');
