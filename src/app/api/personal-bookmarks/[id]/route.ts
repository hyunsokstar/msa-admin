

// ===== 2. 동적 라우트 파일 =====
// C:\Users\terec\msa-admin\src\app\api\personal-bookmarks\[id]\route.ts

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// PUT - 즐겨찾기 수정
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { id } = params;

        // 수정 가능한 필드만 추출
        const filteredUpdateData: any = {};
        if (body.url !== undefined) filteredUpdateData.url = body.url;
        if (body.description !== undefined) filteredUpdateData.description = body.description;

        const { data, error } = await supabase
            .from('user_bookmarks')
            .update(filteredUpdateData)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating bookmark:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'Bookmark not found or unauthorized' }, { status: 404 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error('Server error in PUT /api/personal-bookmarks/[id]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE - 단일 즐겨찾기 삭제
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const { id } = params;

        const { data, error } = await supabase
            .from('user_bookmarks')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            console.error('Error deleting bookmark:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'Bookmark not found or unauthorized' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Bookmark deleted successfully', data }, { status: 200 });

    } catch (error) {
        console.error('Server error in DELETE /api/personal-bookmarks/[id]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

