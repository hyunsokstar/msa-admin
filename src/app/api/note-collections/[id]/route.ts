// app/api/note-collections/[id]/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const id = request.nextUrl.searchParams.get('id');
    const body = await request.json();

    const { data, error } = await supabase
      .from("note_collections")
      .update({ name: body.name })
      .eq("id", id)
      .select(`
        *,
        writer:users(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error("Error updating note collection:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // URL에서 ID 추출
    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("note_collections")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error deleting note collection:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
