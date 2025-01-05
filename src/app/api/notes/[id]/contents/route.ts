// src/app/api/notes/[id]/contents/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // cookies()를 직접 전달하도록 수정
    const supabase = createRouteHandlerClient({ cookies });
    
    // params에서 직접 id 추출
    const noteId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('pageNum') || '1'));
    
    // 데이터 조회
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
      { data: data || [] }, 
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

// POST 메서드도 동일한 패턴으로 추가
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    const noteId = params.id;

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

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const body = await request.json();
    const contentId = body.id;

    const { data, error } = await supabase
      .from("note_contents")
      .update(body)
      .eq("id", contentId)
      .select()
      .single();

    if (error) {
      console.error("Error updating note content:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const contentId = request.nextUrl.searchParams.get('id');

    if (!contentId) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("note_contents")
      .delete()
      .eq("id", contentId);

    if (error) {
      console.error("Error deleting note content:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}