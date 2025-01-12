// app/api/notes/[id]/contents/order/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface OrderChangeItem {
  id: number;
  order: number;
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const noteId = context.params.id;
    const body = await request.json();
    const items: OrderChangeItem[] = body.items;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // 모든 업데이트 작업을 Promise 배열로 생성
    const updatePromises = items.map(item => 
      supabase
        .from('note_contents')
        .update({ order: item.order })
        .eq('id', item.id)
        .eq('note_id', noteId)
    );

    // 모든 업데이트를 병렬로 실행
    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: 'Order updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}