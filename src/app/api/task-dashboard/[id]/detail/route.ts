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
    const { data: task, error: taskError } = await supabase
      .from("task_dashboard")
      .select(`
       * ,
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
         task_id,
         ref_task_note
       ),
       ref_screen_images(*),
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

    // 완료된 항목이 맨 아래로 가도록 정렬
    if (task?.sub_todos) {
      task.sub_todos.sort((a: any, b: any) => {
        if (a.is_completed !== b.is_completed) {
          return a.is_completed ? 1 : -1;
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
    }

    const responseData: TaskDetail = {
      ...task,
      ref_images: task?.ref_screen_images || [],
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
