// C:\Users\terec\msa-admin\src\app\api\task-dashboard\[id]\reference-image\route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuth, getSupabaseService } from "@/lib/supabase/serverClient";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrls } = await request.json();
    const taskId = params.id;
    
    if (!imageUrls?.length) {
      return NextResponse.json({ error: 'No image URLs provided' }, { status: 400 });
    }

    const supabase = getSupabaseService();
    
    const { error: dbError } = await supabase
      .from('ref_screen_images')
      .insert(
        imageUrls.map((url: string, index: number) => ({
          task_id: taskId,
          image_url: url,
          sort_order: index,
          created_by: session.user.id,
        }))
      );

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error saving images:', error);
    return NextResponse.json(
      { error: 'Failed to save images' },
      { status: 500 }
    );
  }
}