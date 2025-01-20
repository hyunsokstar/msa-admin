// app/api/task-dashboard/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // 관계 쿼리 수정
    const { data, error } = await supabase
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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return NextResponse.json(
        { 
          error: "Failed to fetch tasks",
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
    console.error("Task Dashboard Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch task dashboard",
        details: error instanceof Error ? error.message : "Unknown error",
        data: null
      },
      { status: 500 }
    );
  }
}