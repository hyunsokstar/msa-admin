// C:\Users\terec\msa-admin\src\app\api\test-items-archive\[id]\comments\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { v4 as uuidv4 } from 'uuid';

// 타입 정의
type ApiResponse<T> = {
    data?: T;
    error?: string;
    success?: boolean;
};

type CommentInput = {
    author_id: string;
    comment: string;
    ref_image?: string | null;
    ref_video?: string | null;
};

export const dynamic = 'force-dynamic';

/**
 * 아카이브된 테스트 항목의 댓글 목록을 조회하는 API
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const params = await context.params;
        const testItemId = params.id;

        if (!testItemId) {
            return NextResponse.json(
                { error: '테스트 항목 ID가 필요합니다.' },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        // 댓글 목록 조회 (작성자 정보 포함)
        const { data, error } = await supabase
            .from('comments_for_test_items_archive')
            .select(`
                id,
                test_item_id,
                author_id,
                comment,
                ref_image,
                ref_video,
                created_at,
                updated_at,
                author:author_id(id, full_name, profile_image_url)
            `)
            .eq('test_item_id', testItemId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('아카이브된 댓글 조회 중 오류:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            data,
            success: true
        });
    } catch (error: any) {
        console.error('아카이브된 댓글 조회 중 예외 발생:', error);
        return NextResponse.json(
            {
                error: '서버 내부 오류',
                success: false
            },
            { status: 500 }
        );
    }
}

/**
 * 아카이브된 테스트 항목에 댓글을 추가하는 API
 */
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const params = await context.params;
        const testItemId = params.id;

        if (!testItemId) {
            return NextResponse.json(
                { error: '테스트 항목 ID가 필요합니다.', success: false },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();
        const commentData: CommentInput = await request.json();

        // 필수 필드 검증
        if (!commentData.author_id || !commentData.comment) {
            return NextResponse.json(
                { error: '작성자 ID와 댓글 내용은 필수입니다.', success: false },
                { status: 400 }
            );
        }

        // 테스트 항목 존재 여부 확인
        const { data: testItem, error: testItemError } = await supabase
            .from('test_items_archive')
            .select('id')
            .eq('id', testItemId)
            .single();

        if (testItemError) {
            console.error('아카이브된 테스트 항목 조회 중 오류:', testItemError);

            if (testItemError.code === 'PGRST116') { // 결과가 없는 경우
                return NextResponse.json(
                    { error: '해당 아카이브된 테스트 항목을 찾을 수 없습니다.', success: false },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { error: testItemError.message, success: false },
                { status: 500 }
            );
        }

        // 댓글 ID 생성
        const commentId = uuidv4();

        // 댓글 생성
        const { data, error } = await supabase
            .from('comments_for_test_items_archive')
            .insert({
                id: commentId,
                test_item_id: testItemId,
                author_id: commentData.author_id,
                comment: commentData.comment,
                ref_image: commentData.ref_image || null,
                ref_video: commentData.ref_video || null
            })
            .select(`
                id,
                test_item_id,
                author_id,
                comment,
                ref_image,
                ref_video,
                created_at,
                updated_at,
                author:author_id(id, full_name, profile_image_url)
            `)
            .single();

        if (error) {
            console.error('아카이브된 댓글 생성 중 오류:', error);
            return NextResponse.json({
                error: error.message,
                success: false
            }, { status: 500 });
        }

        return NextResponse.json({
            data,
            success: true
        }, { status: 201 });
    } catch (error: any) {
        console.error('아카이브된 댓글 생성 중 예외 발생:', error);
        return NextResponse.json(
            {
                error: '서버 내부 오류: ' + (error.message || '알 수 없는 오류'),
                success: false
            },
            { status: 500 }
        );
    }
}

/**
 * 아카이브된 테스트 항목에서 특정 댓글 삭제 API (선택적)
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const params = await context.params;
        const testItemId = params.id;
        const url = new URL(request.url);
        const commentId = url.searchParams.get('commentId');

        if (!commentId) {
            return NextResponse.json(
                { error: '삭제할 댓글 ID가 필요합니다.', success: false },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        // 댓글 삭제
        const { error } = await supabase
            .from('comments_for_test_items_archive')
            .delete()
            .eq('id', commentId)
            .eq('test_item_id', testItemId);

        if (error) {
            console.error('아카이브된 댓글 삭제 중 오류:', error);
            return NextResponse.json({
                error: error.message,
                success: false
            }, { status: 500 });
        }

        return NextResponse.json({
            data: { id: commentId },
            success: true
        });
    } catch (error: any) {
        console.error('아카이브된 댓글 삭제 중 예외 발생:', error);
        return NextResponse.json(
            {
                error: '서버 내부 오류',
                success: false
            },
            { status: 500 }
        );
    }
}