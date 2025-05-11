// C:\Users\terec\msa-admin\src\app\api\test-targets-archive\batch-delete\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';

type ApiResponse<T> = {
    data?: T;
    error?: string;
    success?: boolean;
}

// 여러 아카이브 항목 일괄 삭제
export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse<any>>> {
    try {
        const supabase = getSupabaseService();
        const { targetIds } = await request.json();

        if (!targetIds || !Array.isArray(targetIds) || targetIds.length === 0) {
            return NextResponse.json(
                { error: 'Invalid or missing targetIds', success: false },
                { status: 400 }
            );
        }

        // Supabase에서는 in 필터로 여러 ID를 동시에 삭제 가능
        const { error } = await supabase
            .from('test_targets_archive')
            .delete()
            .in('id', targetIds);

        if (error) {
            console.error('Error batch deleting archived targets:', error);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}