// src\app\api\task-dashboard\[id]\reference-image\route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuth, getSupabaseService } from "@/lib/supabase/serverClient";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: imageId } = await context.params;
    
    const supabase = getSupabaseService();
    
    const { error: dbError } = await supabase
      .from("ref_screen_images")
      .delete()
      .match({ 
        id: imageId,
      });

    if (dbError) {
      console.error("Database error:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

// src/app/api/task-dashboard/[id]/reference-image/route.ts

// src/app/api/task-dashboard/[id]/reference-image/route.ts

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrls } = await request.json();
    const params = await context.params;
    const taskId = params.id;

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json({ error: "No image URLs provided" }, { status: 400 });
    }

    const supabase = getSupabaseService();

    const { error: dbError } = await supabase
      .from("ref_screen_images")
      .insert(
        imageUrls.map((url: string, index: number) => ({
          task_id: taskId,
          image_url: url,
          sort_order: index,
          created_by: session.user.id
        }))
      );

    if (dbError) {
      console.error("Database error:", dbError.message);
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to save images" },
      { status: 500 }
    );
  }
}
