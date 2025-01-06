// app/api/issues/[id]/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { UpdateIssueDto } from '@/types/typeForTaskIssue'
<<<<<<< HEAD

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

=======
import { CreateIssueDto } from '@/types/typeForTaskIssue'


export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const id = request.nextUrl.searchParams.get('id');
>>>>>>> 916ed00e1c058867b1e6320f36daf23eca00975a
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
<<<<<<< HEAD
        manager_details:users!fk_issues_manager(id, full_name, profile_image_url),
        executor_details:users!issues_executor_fkey(id, full_name, profile_image_url)
=======
        assignee:users!assignee_id(id, full_name, profile_image_url),
        reporter:users!reporter_id(id, full_name, profile_image_url)
>>>>>>> 916ed00e1c058867b1e6320f36daf23eca00975a
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
<<<<<<< HEAD
=======
  }
}


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const offset = (page - 1) * pageSize;

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error, count } = await supabase
      .from('issues')
      .select(`
        *,
        assignee:users!assignee_id(id, full_name, profile_image_url),
        reporter:users!reporter_id(id, full_name, profile_image_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching issues:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        pageSize,
        total: count,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const issueData: CreateIssueDto = await request.json();

    const { data, error } = await supabase
      .from('issues')
      .insert([issueData])
      .select(`
        *,
        assignee:users!assignee_id(id, full_name, profile_image_url),
        reporter:users!reporter_id(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error('Error creating issue:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
// app/api/issues/[id]/route.ts에 추가
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const id = request.nextUrl.searchParams.get('id');

    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting issue:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Issue deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
>>>>>>> 916ed00e1c058867b1e6320f36daf23eca00975a
  }
}