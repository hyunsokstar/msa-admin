// app/api/task-dashboard/[id]/code-reviews/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        // URL에서 task ID 추출
        const urlParts = request.nextUrl.pathname.split('/');
        const taskId = urlParts[urlParts.length - 2];

        const data = await request.json();

        const { data: review, error } = await supabase
            .from('task_code_reviews')
            .insert([
                {
                    task_id: taskId,
                    title: data.title,
                    content: data.content,
                    path: data.path,
                    writer: data.writer,
                    order: data.order
                }
            ])
            .select(`
                *,
                writer:users(id, email, full_name)
            `)
            .single();

        if (error) {
            console.error('Error creating code review:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: review }, { status: 201 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}