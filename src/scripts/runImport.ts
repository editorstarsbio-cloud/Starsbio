import { runCelebrityImport } from './importCelebrities';

async function main() {
  const args = process.argv.slice(2);
  let filePath = 'famous_birthdays_all.xlsx';
  let dryRun = false;
  let autoPublish = false;
  let limit: number | undefined;

  for (const arg of args) {
    if (arg.startsWith('--file=')) {
      filePath = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--auto-publish') {
      autoPublish = true;
    } else if (arg.startsWith('--limit=')) {
      limit = parseInt(arg.split('=')[1], 10);
    }
  }

  try {
    const summary = await runCelebrityImport({
      filePath,
      dryRun,
      limit,
      autoPublish,
    });

    if (summary.errors.length > 0) {
      console.log(`\nSample Validation Errors (${Math.min(5, summary.errors.length)} of ${summary.errors.length}):`);
      summary.errors.slice(0, 5).forEach((e) => {
        console.log(`  - Row ${e.row} [${e.name || 'Unknown'}]: ${e.message}`);
      });
    }

    process.exit(summary.failed > 0 ? 1 : 0);
  } catch (err: unknown) {
    console.error('Fatal import error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
