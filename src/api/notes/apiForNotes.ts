// src/app/api/notes/[id]/contents/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // URL에서 id와 페이지 정보 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const noteId = urlParts[urlParts.length - 2];
    const pageNum = Number(request.nextUrl.searchParams.get('pageNum')) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 10;
    
    // 전체 개수 조회
    const { count } = await supabase
      .from("note_contents")
      .select('*', { count: 'exact', head: true })
      .eq("note_id", noteId);

    // 페이지네이션된 데이터 조회
    const { data, error } = await supabase
      .from("note_contents")
      .select(`
        *,
        writer:users(id, full_name, profile_image_url)
      `)
      .eq("note_id", noteId)
      .order("order", { ascending: true })
      .range((pageNum - 1) * pageSize, pageNum * pageSize - 1);

    if (error) {
      console.error("Error fetching note contents:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      pagination: {
        current: pageNum,
        pageSize,
        total: count
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}