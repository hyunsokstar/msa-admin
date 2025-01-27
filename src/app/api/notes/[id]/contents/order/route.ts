// app/api/notes/[id]/contents/order/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface OrderChangeItem {
  id: number;
  order: number;
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { id: noteId } = await context.params;
    const { items }: { items: OrderChangeItem[] } = await request.json();

    console.log('Updating note contents order:', { noteId, items });

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // 모든 업데이트 작업을 Promise 배열로 생성
    const updatePromises = items.map(item =>
      supabase
        .from("note_contents")
        .update({ order: item.order })
        .eq("id", item.id)
        .eq("note_id", noteId)
        .select()
    );

    // 모든 업데이트를 병렬로 실행
    const results = await Promise.all(updatePromises);

    // 에러 체크
    const errors = results
      .map((result, index) => result.error ? { error: result.error, index } : null)
      .filter(Boolean);

    if (errors.length > 0) {
      console.error("Error updating note contents order:", errors);
      return NextResponse.json(
        { error: "Failed to update some items order" },
        { status: 500 }
      );
    }

    const updatedData = results.map(result => result.data).flat();

    return NextResponse.json(
      { data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
