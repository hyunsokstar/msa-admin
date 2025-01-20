// app/api/task-dashboard/[id]/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // URL에서 ID 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 요청에서 JSON 데이터 파싱
    const body = await request.json();
    console.log('Update task body:', body);

    // Supabase 서비스 인스턴스 가져오기
    const supabaseService = getSupabaseService();

    // 데이터 업데이트
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id,
      })
      .eq('id', id)
      .select('*, created_by(*), updated_by(*)')
      .single();

    // 에러 처리
    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 성공 시 응답 반환
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Task Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // URL에서 ID 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabaseService = getSupabaseService();
    const { error } = await supabaseService
      .from('task_dashboard')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Task Delete Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}