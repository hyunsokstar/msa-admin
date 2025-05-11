// C:\Users\terec\msa-admin\src\app\api\test-items-archive\[id]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestItem } from '@/types/typeForTestTarget';


export async function PATCH(request: NextRequest) {
    try {
        // URL에서 ID 추출
        const urlParts = request.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];

        console.log("Request URL:", request.nextUrl.pathname);
        console.log("Extracted ID:", id);

        if (!id) {
            return NextResponse.json(
                { error: "ID가 필요합니다." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();
        const updates = await request.json();

        console.log('Received PATCH request for item ID:', id);
        console.log('Update data:', updates);

        // 먼저 해당 ID가 테이블에 존재하는지 확인
        const { data: existingItem, error: checkError } = await supabase
            .from('test_items_archive')
            .select('id')
            .eq('id', id)
            .single();

        if (checkError) {
            console.error('Error checking item existence:', checkError);
            return NextResponse.json({ error: `Item with ID ${id} not found: ${checkError.message}` }, { status: 404 });
        }

        console.log('Item exists:', existingItem);

        const { data, error } = await supabase
            .from('test_items_archive')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating test item (PATCH):', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error in PATCH handler:', error);
        return NextResponse.json(
            { error: 'Internal server error in PATCH handler' },
            { status: 500 }
        );
    }
}