// app/api/task-dashboard/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAuth = getSupabaseAuth();
    
    // 인증 체크
    const { data: { session }} = await supabaseAuth.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // 데이터 조회
    const supabaseService = getSupabaseService();
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });

  } catch (error: any) {
    console.error('Task Dashboard Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch task dashboard' }, 
      { status: 500 }
    );
  }
}

