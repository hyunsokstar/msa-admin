// C:\Users\terec\msa-admin\src\app\api\test-targets-archive\[id]\items\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestItem } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
    success?: boolean;
}

export const dynamic = 'force-dynamic';

// 특정 아카이브된 테스트 대상의 항목 목록 조회
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const supabase = getSupabaseService();
        const params = await context.params;
        const id = params.id;

        const { data, error } = await supabase
            .from('test_items_archive')
            .select('*')
            .eq('target_id', id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching archived test items:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}