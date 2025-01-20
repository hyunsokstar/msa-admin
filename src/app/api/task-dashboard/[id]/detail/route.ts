// /app/api/task-dashboard/[id]/detail/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // URL에서 taskId 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const taskId = urlParts[urlParts.length - 2];

    if (!taskId) {
      return NextResponse.json(
        { 
          error: "Task ID is required",
          details: "Valid task ID must be provided",
          data: null 
        }, 
        { status: 400 }
      );
    }

    // 태스크 조회
    const { data: task, error: taskError } = await supabase
      .from("task_dashboard")
      .select(`
        *,
        created_by_user:users!task_dashboard_created_by_fkey(
          id,
          full_name,
          profile_image_url
        ),
        updated_by_user:users!task_dashboard_updated_by_fkey(
          id,
          full_name,
          profile_image_url
        )
      `)
      .eq("id", taskId)
      .single();

    if (taskError) {
      console.error("Task fetch error:", taskError);
      return NextResponse.json(
        {
          error: "Failed to fetch task details",
          details: taskError.message,
          data: null
        },
        { status: 404 }
      );
    }

    // sub todos 조회
    const { data: subTodos, error: subTodosError } = await supabase
      .from("sub_todos")
      .select(`
        id,
        title,
        description,
        is_complete,
        created_at,
        updated_at,
        task_id
      `)
      .eq("task_id", taskId)
      .order("created_at", { ascending: true });

    if (subTodosError) {
      console.error("Sub todos fetch error:", subTodosError);
      return NextResponse.json(
        {
          error: "Failed to fetch sub todos",
          details: subTodosError.message,
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          ...task,
          sub_todos: subTodos || [],
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        data: null
      },
      { status: 500 }
    );
  }
}