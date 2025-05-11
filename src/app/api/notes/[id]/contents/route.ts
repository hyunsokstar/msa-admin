// app/api/notes/[id]/note-contents/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const params = await context.params;
    const noteId = params.id;
    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get('pageNum') || '1'));

    // 페이지 번호 목록 가져오기
    const { data: pageData } = await supabase
      .from("note_contents")
      .select('page')
      .eq("note_id", noteId)
      .not('page', 'is', null);

    // unique한 페이지 번호 배열 추출 및 정렬
    const pages = Array.from(new Set(pageData?.map(item => item.page)))
      .filter(page => page !== null)
      .sort((a, b) => a - b);

    // 현재 페이지의 데이터를 가져오기
    const { data, error } = await supabase
      .from("note_contents")
      .select(`
        *,
        writer:users(id, full_name, profile_image_url)
      `)
      .eq("note_id", noteId)
      .eq("page", page)
      .order('order', { ascending: true });

    if (error) {
      console.error("Error fetching note contents:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data: data || [],
        pages: pages
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



// POST
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    const params = await context.params;
    const noteId = params.id;

    console.log('Creating note content:', { noteId, body });

    const { data, error } = await supabase
      .from("note_contents")
      .insert([{
        ...body,
        note_id: noteId
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating note content:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    const contentId = body.id;

    console.log('Updating note content:', { contentId, body });

    const { data, error } = await supabase
      .from("note_contents")
      .update(body)
      .eq("id", contentId)
      .select()
      .single();

    if (error) {
      console.error("Error updating note content:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // id는 /contents/?id=... 형태로 Query Param에서 가져옴
    const contentId = request.nextUrl.searchParams.get('id');

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    console.log('Deleting note content:', { contentId });

    const { error } = await supabase
      .from("note_contents")
      .delete()
      .eq("id", contentId);

    if (error) {
      console.error("Error deleting note content:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}