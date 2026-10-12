import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabase';

/**
 * Daily Maintenance Job for StarBirthday
 * Triggered via Vercel Cron or authenticated cURL request:
 * Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return NextResponse.json({
      status: 'success_simulated',
      message: 'Maintenance executed (Supabase credentials not configured yet).',
    });
  }

  const today = new Date().toISOString().split('T')[0];

  // Record daily job start
  const { data: job, error: jobErr } = await supabase
    .from('daily_jobs')
    .insert({
      job_type: 'daily_birthday_refresh',
      execution_date: today,
      status: 'running',
    })
    .select('id')
    .single();

  try {
    // 1. Audit published profiles
    const { count: publishedCount } = await supabase
      .from('celebrities')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published');

    // 2. Audit pending in-review records
    const { count: reviewCount } = await supabase
      .from('celebrities')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'in_review');

    // Update job log
    if (job?.id) {
      await supabase
        .from('daily_jobs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          result_summary: {
            publishedCount,
            reviewCount,
            auditDate: today,
          },
        })
        .eq('id', job.id);
    }

    return NextResponse.json({
      status: 'completed',
      publishedProfiles: publishedCount,
      pendingReviews: reviewCount,
    });
  } catch (err: unknown) {
    if (job?.id) {
      await supabase
        .from('daily_jobs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          result_summary: { error: err instanceof Error ? err.message : String(err) },
        })
        .eq('id', job.id);
    }
    return NextResponse.json({ error: 'Job failed' }, { status: 500 });
  }
}
