// C:\Users\terec\msa-admin\src\app\api\personal-bookmarks\bulk-delete\route.ts

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// DELETE - 다중 즐겨찾기 삭제
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Invalid or empty ids array' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('user_bookmarks')
            .delete()
            .in('id', ids)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.error('Error bulk deleting bookmarks:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            message: `${data.length} bookmarks deleted successfully`,
            deletedCount: data.length,
            data
        }, { status: 200 });

    } catch (error) {
        console.error('Server error in DELETE /api/personal-bookmarks/bulk-delete:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}