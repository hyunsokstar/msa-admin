// app/api/task-dashboard/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 쿠키 처리를 await로 수정
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 관계 쿼리 수정
    const { data, error } = await supabase
      .from("task_dashboard")
      .select(`
        *,
        created_by_user:users!created_by(id, full_name, profile_image_url),
        updated_by_user:users!updated_by(id, full_name, profile_image_url)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error("Task Dashboard Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch task dashboard" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from("task_dashboard")
      .select("order")
      .eq("status", status)
      .order("order", { ascending: false })
      .limit(1)
      .single();

    if (maxOrderError && maxOrderError.code !== "PGRST116") {
      console.error("Error fetching max order:", maxOrderError);
      return NextResponse.json({ error: maxOrderError.message }, { status: 500 });
    }

    const newOrder = (maxOrderData?.order || 0) + 1;

    const { data, error } = await supabase
      .from("task_dashboard")
      .update({
        status,
        order: newOrder,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id
      })
      .eq("id", id)
      .select(`
        *,
        created_by_user:users!created_by(id, full_name, profile_image_url),
        updated_by_user:users!updated_by(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error("Error updating task:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error("Task Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update task status" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      description, 
      screen_url, 
      isArchived, 
      figmaUrl, 
      createdBy 
    } = body;

    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from("task_dashboard")
      .select("order")
      .eq("status", "ready")
      .order("order", { ascending: false })
      .limit(1)
      .single();

    if (maxOrderError && maxOrderError.code !== "PGRST116") {
      console.error("Error fetching max order:", maxOrderError);
      return NextResponse.json({ error: maxOrderError.message }, { status: 500 });
    }

    const newOrder = (maxOrderData?.order || 0) + 1;

    const { data, error } = await supabase
      .from("task_dashboard")
      .insert([
        {
          title,
          description,
          screen_url,
          figma_url: figmaUrl,
          created_by: createdBy,
          is_archived: isArchived,
          status: "ready",
          order: newOrder,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          updated_by: session.user.id
        }
      ])
      .select(`
        *,
        created_by_user:users!created_by(id, full_name, profile_image_url),
        updated_by_user:users!updated_by(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error("Error creating task:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error("Task Creation Error:", error);
    return NextResponse.json(
      { error: "Failed to create task dashboard" },
      { status: 500 }
    );
  }
}