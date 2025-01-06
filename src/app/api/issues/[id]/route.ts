// app/api/issues/[id]/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { UpdateIssueDto } from '@/types/typeForTaskIssue'

// app/api/issues/[id]/route.ts
// ... 기존 imports 유지 ...

// PUT 메서드 아래에 추가
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // URL에서 ID 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting issue:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // URL에서 ID 추출 - note-collections 처럼 수정
    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData: UpdateIssueDto = await request.json();

    const { data, error } = await supabase
      .from('issues')
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(`
        *,
        manager_details:users!fk_issues_manager(id, full_name, profile_image_url),
        executor_details:users!issues_executor_fkey(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error('Error updating issue:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}