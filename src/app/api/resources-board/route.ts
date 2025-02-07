// src/app/api/resources-board/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');

        const offset = (page - 1) * pageSize;

        const supabase = createRouteHandlerClient({ cookies });

        const { data, error, count } = await supabase
            .from('resources_board')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1);

        if (error) {
            console.error('Error fetching resources board:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            data,
            pagination: {
                currentPage: page,
                pageSize,
                total: count,
                totalPages: Math.ceil((count || 0) / pageSize)
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}