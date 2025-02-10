// src/app/api/task-history/route.ts
import { getSupabaseService } from "@/lib/supabase/serverClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const supabaseService = getSupabaseService();

        const { data, error } = await supabaseService
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
            .eq('is_archived', true)  // 아카이브된 작업만 조회
            .order("updated_at", { ascending: false });  // 최신 순으로 정렬

        if (error) {
            console.error("Error fetching task history:", error.message);
            return NextResponse.json(
                {
                    error: "Failed to fetch task history",
                    details: error.message,
                    data: null
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store'
                }
            }
        );

    } catch (error) {
        console.error("Task History Error:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch task history",
                details: error instanceof Error ? error.message : "Unknown error",
                data: null
            },
            { status: 500 }
        );
    }
}

// POST /api/task-history
export async function POST(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const body = await request.json();
        const { taskIds } = body; // 클라이언트에서 보낸 task ID 리스트

        if (!taskIds || taskIds.length === 0) {
            return NextResponse.json({ error: "No task IDs provided." }, { status: 400 });
        }

        // 1. task_dashboard에서 해당 task 가져오기
        const { data: tasks, error: fetchError } = await supabase
            .from("task_dashboard")
            .select("*")
            .in("id", taskIds);

        if (fetchError || !tasks) {
            console.error("Error fetching tasks:", fetchError);
            return NextResponse.json({ error: fetchError?.message || "Failed to fetch tasks" }, { status: 500 });
        }

        // 2. task_history 테이블에 데이터 삽입
        const { error: insertError } = await supabase
            .from("task_history")
            .insert(tasks.map(task => ({
                id: task.id, // 원본 ID 유지
                title: task.title,
                description: task.description,
                screen_url: task.screen_url,
                status: task.status,
                created_by: task.created_by,
                updated_by: task.updated_by,
                created_at: task.created_at,
                updated_at: task.updated_at,
                is_archived: task.is_archived,
                figma_url: task.figma_url
            })));

        if (insertError) {
            console.error("Error inserting into task_history:", insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        // 3. task_dashboard에서 해당 데이터 삭제
        const { error: deleteError } = await supabase
            .from("task_dashboard")
            .delete()
            .in("id", taskIds);

        if (deleteError) {
            console.error("Error deleting from task_dashboard:", deleteError);
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}