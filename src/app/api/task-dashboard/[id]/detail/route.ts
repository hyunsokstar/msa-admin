// /app/api/task-dashboard/[id]/detail/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const params = await context.params;
    const taskId = params.id;

    if (!taskId) {
      return NextResponse.json(
        { error: "Invalid Task ID", details: "Task ID is required", data: null },
        { status: 400 }
      );
    }

    // Task query
    const { data: task, error: taskError } = await supabase
      .from("task_dashboard")
      .select(`
    *,
    created_by:users!task_dashboard_created_by_fkey(
      id,
      full_name,
      profile_image_url
    ),
    updated_by_user:users!task_dashboard_updated_by_fkey(
      id,
      full_name,
      profile_image_url
    ),
    sub_todos(
      id,
      content,
      is_completed,
      created_at,
      updated_at,
      task_id
    ),
    task_api_mappings(*)  // 추가된 부분
  `)
      .eq("id", taskId)
      .single();

    if (taskError) {
      return NextResponse.json(
        { error: "Failed to fetch task details", details: taskError.message, data: null },
        { status: 404 }
      );
    }

    // Sub todos query
    const { data: subTodos, error: subTodosError } = await supabase
      .from("sub_todos")
      .select(`
       id,
       content,
       is_completed,
       created_at,
       updated_at,
       task_id
     `)
      .eq("task_id", taskId)
      .order("created_at", { ascending: true });

    if (subTodosError) {
      return NextResponse.json(
        { error: "Failed to fetch sub todos", details: subTodosError.message, data: null },
        { status: 404 }
      );
    }

    // Reference images query
    const { data: refImages, error: refImagesError } = await supabase
      .from("ref_screen_images")
      .select("*")
      .eq("task_id", taskId)
      .order("sort_order", { ascending: true });

    if (refImagesError) {
      return NextResponse.json(
        { error: "Failed to fetch reference images", details: refImagesError.message, data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          ...task,
          sub_todos: subTodos || [],
          ref_images: refImages || [],
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const params = await context.params;
    const taskId = params.id;

    if (!taskId) {
      return NextResponse.json(
        {
          error: "Invalid Task ID",
          details: "Task ID is required",
          data: null,
        },
        { status: 400 }
      );
    }

    // sub todos 삭제
    const { error: subTodosError } = await supabase
      .from("sub_todos")
      .delete()
      .eq("task_id", taskId);

    if (subTodosError) {
      console.error("Sub todos deletion error:", subTodosError);
      return NextResponse.json(
        {
          error: "Failed to delete sub todos",
          details: subTodosError.message,
          data: null,
        },
        { status: 500 }
      );
    }

    // 태스크 삭제
    const { error: taskError } = await supabase
      .from("task_dashboard")
      .delete()
      .eq("id", taskId);

    if (taskError) {
      console.error("Task deletion error:", taskError);
      return NextResponse.json(
        {
          error: "Failed to delete task",
          details: taskError.message,
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        data: null,
      },
      { status: 500 }
    );
  }
}