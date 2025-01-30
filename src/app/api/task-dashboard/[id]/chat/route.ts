// app/api/task-dashboard/[id]/chat/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        // Get taskId from URL
        const urlParts = request.nextUrl.pathname.split('/');
        const taskId = urlParts[urlParts.length - 2];

        // Get message from request body
        const { message } = await request.json();

        if (!taskId) {
            return NextResponse.json(
                { error: 'Invalid Task ID', details: 'Task ID is required' },
                { status: 400 }
            );
        }

        // Get user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: '인증이 필요합니다.' },
                { status: 401 }
            );
        }

        // 1. 이전 메시지 조회
        const { data: lastMessage } = await supabase
            .from('task_chattings')
            .select('created_by, is_left')
            .eq('task_id', taskId)  // 같은 task의 채팅만 조회
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // 2. is_left 값 결정
        let is_left = true;
        if (lastMessage) {
            is_left = lastMessage.created_by !== session.user.id
                ? !lastMessage.is_left
                : lastMessage.is_left;
        }

        // 3. 새 메시지 삽입
        const { data, error } = await supabase
            .from('task_chattings')
            .insert({
                task_id: taskId,
                message: message,
                created_by: session.user.id,
                is_left: is_left  // 계산된 is_left 값 저장
            })
            .select('*, created_by_user:created_by(id, full_name, profile_image_url)')
            .single();

        if (error) {
            console.error('Error creating chat message:', error);
            return NextResponse.json(
                { error: '메시지 전송에 실패했습니다.', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                data,
                message: '메시지가 성공적으로 전송되었습니다.'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            {
                error: '메시지 전송 중 오류가 발생했습니다.',
                details: error instanceof Error ? error.message : '알 수 없는 오류'
            },
            { status: 500 }
        );
    }
}