import dotenv from 'dotenv';
import { getAdminSupabase } from '../lib/supabase';

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  let status = 'published';
  let limit = 100;
  let confirm = false;

  for (const arg of args) {
    if (arg.startsWith('--status=')) {
      status = arg.split('=')[1];
    } else if (arg.startsWith('--limit=')) {
      limit = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--confirm') {
      confirm = true;
    }
  }

  if (!confirm) {
    console.log('DRY-RUN: Pass --confirm to execute approvals in database.');
    console.log(`Would approve up to ${limit} celebrities to status "${status}".`);
    return;
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    console.error('Supabase credentials missing.');
    process.exit(1);
  }

  const { data, error } = await supabase
    .from('celebrities')
    .update({
      status,
      published_at: new Date().toISOString(),
      fact_check_status: 'verified',
    })
    .eq('status', 'in_review')
    .limit(limit)
    .select('id, name, slug');

  if (error) {
    console.error('Approval update failed:', error.message);
    process.exit(1);
  }

  console.log(`Successfully approved and published ${data?.length || 0} celebrities:`);
  data?.forEach((c) => console.log(` - ${c.name} (${c.slug})`));
}

main();
