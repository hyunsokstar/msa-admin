// src/app/api/test-targets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestTarget } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<TestTarget[]>>> {
    try {
        const supabase = getSupabaseService();

        // 기본 테스트 대상 정보 가져오기
        const { data: testTargets, error } = await supabase
            .from('test_targets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 각 테스트 대상의 아이템 개수 가져오기
        const targetsWithCounts = await Promise.all(
            testTargets.map(async (target: TestTarget) => {
                const { count, error: countError } = await supabase
                    .from('test_items')
                    .select('*', { count: 'exact', head: true })
                    .eq('target_id', target.id);

                if (countError) {
                    console.error(`Error getting count for target ${target.id}:`, countError);
                    return { ...target, item_count: 0 };
                }

                return { ...target, item_count: count || 0 };
            })
        );

        return NextResponse.json({ data: targetsWithCounts });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse<TestTarget>>> {
    try {
        const supabase = getSupabaseService();
        const testTarget = await request.json();

        const { data, error } = await supabase
            .from('test_targets')
            .insert([testTarget])
            .select()
            .single();

        if (error) {
            console.error('Error adding test target:', error);
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