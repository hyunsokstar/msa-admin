// ===== Route 핸들러들만 =====
// C:\Users\terec\msa-admin\src\app\api\personal-bookmarks\route.ts

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET - 즐겨찾기 목록 조회
export async function GET(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // 로그인한 유저 가져오기
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('user_bookmarks')
            .select(`
                id,
                url,
                description,
                user_id
            `)
            .eq('user_id', user.id)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching personal bookmarks:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error('Server error in GET /api/personal-bookmarks:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - 새 즐겨찾기 생성
export async function POST(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // 로그인한 유저 가져오기
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();

        // 필수 필드 검증
        if (!body.url) {
            return NextResponse.json({
                error: 'URL is required'
            }, { status: 400 });
        }

        // user_id 자동 설정
        const bookmarkData = {
            url: body.url,
            description: body.description || '',
            user_id: user.id,
        };

        const { data, error } = await supabase
            .from('user_bookmarks')
            .insert([bookmarkData])
            .select()
            .single();

        if (error) {
            console.error('Error creating bookmark:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 201 });

    } catch (error) {
        console.error('Server error in POST /api/personal-bookmarks:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - 즐겨찾기 수정
export async function PUT(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // 로그인한 유저 가져오기
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // 수정 가능한 필드만 추출
        const filteredUpdateData: any = {};
        if (updateData.url !== undefined) filteredUpdateData.url = updateData.url;
        if (updateData.description !== undefined) filteredUpdateData.description = updateData.description;

        const { data, error } = await supabase
            .from('user_bookmarks')
            .update(filteredUpdateData)
            .eq('id', id)
            .eq('user_id', user.id) // 본인 것만 수정 가능
            .select()
            .single();

        if (error) {
            console.error('Error updating bookmark:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({
                error: 'Bookmark not found or unauthorized'
            }, { status: 404 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error('Server error in PUT /api/personal-bookmarks:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - 즐겨찾기 삭제 (단일/다중 지원)
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // 로그인한 유저 가져오기
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ids } = body;

        // 단일 삭제
        if (id) {
            const { data, error } = await supabase
                .from('user_bookmarks')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id) // 본인 것만 삭제 가능
                .select()
                .single();

            if (error) {
                console.error('Error deleting bookmark:', error.message);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            if (!data) {
                return NextResponse.json({
                    error: 'Bookmark not found or unauthorized'
                }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Bookmark deleted successfully',
                data
            }, { status: 200 });
        }

        // 다중 삭제
        if (ids && Array.isArray(ids) && ids.length > 0) {
            const { data, error } = await supabase
                .from('user_bookmarks')
                .delete()
                .in('id', ids)
                .eq('user_id', user.id) // 본인 것만 삭제 가능
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
        }

        return NextResponse.json({
            error: 'Either id or ids array is required'
        }, { status: 400 });

    } catch (error) {
        console.error('Server error in DELETE /api/personal-bookmarks:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}