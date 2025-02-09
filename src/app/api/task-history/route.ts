// src/app/api/task-history/route.ts
import { getSupabaseService } from "@/lib/supabase/serverClient";
import { NextResponse } from "next/server";

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