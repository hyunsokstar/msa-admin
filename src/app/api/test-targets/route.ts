// C:\Users\terec\msa-admin\src\app\api\test-targets\route.ts

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

        const { data, error } = await supabase
            .from('test_targets')
            .select('*')
            .order('created_at', { ascending: false });

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