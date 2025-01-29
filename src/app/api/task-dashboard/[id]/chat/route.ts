// app/api/task-dashboard/[id]/chat/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { message } = await request.json();
        const taskId = params.id;

        // Get user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: '인증이 필요합니다.' },
                { status: 401 }
            );
        }

        // Insert chat message
        const { data, error } = await supabase
            .from('task_chattings')
            .insert({
                task_id: taskId,
                message: message,
                created_by: session.user.id,
            })
            .select('*, created_by_user:created_by(id, full_name, profile_image_url)')
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Chat creation error:', error);
        return NextResponse.json(
            { error: '메시지 전송에 실패했습니다.' },
            { status: 500 }
        );
    }
}