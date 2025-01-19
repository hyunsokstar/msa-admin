// app/api/task-dashboard/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAuth = getSupabaseAuth();
    
    // 인증 체크
    const {
      data: { session }
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 데이터 조회
    const supabaseService = getSupabaseService();
    // created_by, updated_by가 외래키라면 이렇게 관계까지 확장해서 가져올 수 있음
    // 단순히 모든 컬럼만 필요하면 .select('*') 만 써도 무방
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .select('*, created_by(*), updated_by(*)')
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

export async function PATCH(request: Request) {
  try {
    const supabaseAuth = getSupabaseAuth();
    
    // 인증 체크
    const {
      data: { session }
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    // 데이터 업데이트
    const supabaseService = getSupabaseService();
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Task Update Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to update task status' },
      { status: 500 }
    );
  }
}
