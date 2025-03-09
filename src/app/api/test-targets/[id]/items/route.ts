import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestItem } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<TestItem[]>>> {
    try {
        // URL에서 ID 추출
        const urlParts = request.nextUrl.pathname.split("/");
        // test-targets/[id]/items 구조에서 ID는 urlParts[urlParts.length - 2]에 위치
        const targetId = urlParts[urlParts.length - 2];

        if (!targetId) {
            return NextResponse.json(
                { error: "Target ID가 필요합니다." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        const { data, error } = await supabase
            .from('test_items')
            .select('*')
            .eq('target_id', targetId)
            .order('category')
            .order('created_at');

        if (error) {
            console.error('Supabase error:', error);
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

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<TestItem>>> {
    try {
        // URL에서 ID 추출
        const urlParts = request.nextUrl.pathname.split("/");
        // test-targets/[id]/items 구조에서 ID는 urlParts[urlParts.length - 2]에 위치
        const targetId = urlParts[urlParts.length - 2];

        if (!targetId) {
            return NextResponse.json(
                { error: "Target ID가 필요합니다." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();
        const testItem = await request.json();

        // Ensure the target_id in the path matches the one in the request body
        testItem.target_id = targetId;

        const { data, error } = await supabase
            .from('test_items')
            .insert([testItem])
            .select()
            .single();

        if (error) {
            console.error('Error adding test item:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}