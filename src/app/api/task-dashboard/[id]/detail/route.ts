// /app/api/task-dashboard/[id]/detail/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 1. params 검증
    const taskId = await Promise.resolve(context.params.id);
    
    if (!taskId || taskId === 'undefined' || !isValidUUID(taskId)) {
      return NextResponse.json({
        error: "Invalid Task ID",
        details: "A valid UUID is required",
        data: null
      }, { status: 400 });
    }

    // 2. cookies 비동기 처리
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient(
      { cookies: () => cookieStore },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    // 3. 세션 검증 추가
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({
        error: "Unauthorized",
        details: "Valid session required",
        data: null
      }, { status: 401 });
    }

    // 4. 태스크 조회
    const { data: task, error: taskError } = await supabase
      .from("task_dashboard")
      .select(`
        *,
        created_by:users!task_dashboard_created_by_fkey(
          id,
          full_name,
          profile_image_url
        ),
        updated_by:users!task_dashboard_updated_by_fkey(
          id,
          full_name,
          profile_image_url
        )
      `)
      .eq("id", taskId)
      .single();

    if (taskError) {
      console.error("Task fetch error:", taskError);
      return NextResponse.json({
        error: "Failed to fetch task details",
        details: taskError.message,
        data: null
      }, { status: 404 });
    }

    // 5. sub todos 조회
    const { data: subTodos, error: subTodosError } = await supabase
      .from("sub_todos")
      .select("*")
      .eq("task_id", taskId)
      .order("created_at", { ascending: true });

    if (subTodosError) {
      console.error("Sub todos fetch error:", subTodosError);
      return NextResponse.json({
        error: "Failed to fetch sub todos",
        details: subTodosError.message,
        data: null
      }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        ...task,
        sub_todos: subTodos || [],
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
      data: null
    }, { status: 500 });
  }
}

// UUID 검증 함수
function isValidUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}