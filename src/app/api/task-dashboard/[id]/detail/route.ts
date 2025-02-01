// /app/api/task-dashboard/[id]/detail/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { TaskDetail } from "@/types/task/typeForTaskDetail";

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
    // Task query 부분 수정
    // app/api/task-dashboard/[id]/detail/route.ts
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
      task_result_image,
      is_completed,
      created_at,
      updated_at,
      task_id
    ),
    task_api_mappings(*),
    task_code_reviews(
      id,
      content,
      path,
      title,
      created_at,
      updated_at,
      page,
      order,
      writer:users(
        id,
        full_name,
        profile_image_url
      )
    ),
    task_chattings!left(
      id,
      message,
      created_at,
      created_by,
      is_left,
      created_by_user:users(
        id,
        full_name,
        profile_image_url
      )
    )
      `)
      .eq("id", taskId)
      .single();

    if (taskError) {
      return NextResponse.json(
        { error: "Failed to fetch task details", details: taskError.message, data: null },
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

    const responseData: TaskDetail = {
      ...task,
      ref_images: refImages || [],
    } as TaskDetail;

    return NextResponse.json(
      {
        data: responseData,
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

    // task_api_mappings 삭제
    const { error: apiMappingsError } = await supabase
      .from("task_api_mappings")
      .delete()
      .eq("task_id", taskId);

    if (apiMappingsError) {
      console.error("API mappings deletion error:", apiMappingsError);
      return NextResponse.json(
        {
          error: "Failed to delete API mappings",
          details: apiMappingsError.message,
          data: null,
        },
        { status: 500 }
      );
    }

    // 참조 이미지 삭제
    const { error: refImagesError } = await supabase
      .from("ref_screen_images")
      .delete()
      .eq("task_id", taskId);

    if (refImagesError) {
      console.error("Reference images deletion error:", refImagesError);
      return NextResponse.json(
        {
          error: "Failed to delete reference images",
          details: refImagesError.message,
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