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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Initialize Supabase
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body and parameters
    const { imageUrls } = await request.json();
    const params = await context.params;
    const taskId = params.id;

    if (!imageUrls?.length) {
      return NextResponse.json({ error: "No image URLs provided" }, { status: 400 });
    }

    const supabase = getSupabaseService();

    // Insert data into the database
    const { error: dbError } = await supabase
      .from("ref_screen_images")
      .insert(
        imageUrls.map((url: string, index: number) => ({
          task_id: taskId,
          image_url: url,
          sort_order: index,
          created_by: session.user.id,
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
