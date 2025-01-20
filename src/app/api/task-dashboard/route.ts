// app/api/task-dashboard/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAuth = getSupabaseAuth();
    
    const {
      data: { session }
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseService = getSupabaseService();
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
    
    const {
      data: { session }
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    const supabaseService = getSupabaseService();
    
    // 해당 status의 최대 order 값 조회
    const { data: maxOrderData, error: maxOrderError } = await supabaseService
      .from('task_dashboard')
      .select('order')
      .eq('status', status)
      .order('order', { ascending: false })
      .limit(1)
      .single();

    if (maxOrderError && maxOrderError.code !== 'PGRST116') { // PGRST116는 결과가 없는 경우
      throw maxOrderError;
    }

    const newOrder = (maxOrderData?.order || 0) + 1;

    // 데이터 업데이트
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .update({ 
        status,
        order: newOrder,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id
      })
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

export async function POST(request: Request) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const {
      data: { session },
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, screen_url, isArchived, figmaUrl, createdBy } = body;

    const supabaseService = getSupabaseService();

    // ready 상태의 최대 order 값 조회
    const { data: maxOrderData, error: maxOrderError } = await supabaseService
      .from('task_dashboard')
      .select('order')
      .eq('status', 'ready')
      .order('order', { ascending: false })
      .limit(1)
      .single();

    if (maxOrderError && maxOrderError.code !== 'PGRST116') { // PGRST116는 결과가 없는 경우
      throw maxOrderError;
    }

    const newOrder = (maxOrderData?.order || 0) + 1;

    const { data, error } = await supabaseService
      .from('task_dashboard')
      .insert([
        {
          title,
          description,
          screen_url: screen_url,
          figma_url: figmaUrl,
          created_by: createdBy,
          is_archived: isArchived,
          status: 'ready',
          order: newOrder,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          updated_by: session.user.id
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Task Creation Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to create task dashboard' },
      { status: 500 }
    );
  }
}