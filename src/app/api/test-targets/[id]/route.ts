// C:\Users\terec\msa-admin\src\app\api\test-targets\[id]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestTarget } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<TestTarget>>> {
    try {
        const supabase = getSupabaseService();
        const id = params.id;

        const { data, error } = await supabase
            .from('test_targets')
            .select('*')
            .eq('id', id)
            .single();

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

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<TestTarget>>> {
    try {
        const supabase = getSupabaseService();
        const id = params.id;
        const updates = await request.json();

        const { data, error } = await supabase
            .from('test_targets')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating test target:', error);
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
    try {
        const supabase = getSupabaseService();
        const id = params.id;

        const { error } = await supabase
            .from('test_targets')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting test target:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data: null }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}