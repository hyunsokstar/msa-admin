// app/api/task-dashboard/[id]/code-reviews/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const taskId = context.params.id;
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
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data: review });
    } catch (error) {
        console.error('Error creating code review:', error);
        return NextResponse.json(
            { error: 'Failed to create code review' },
            { status: 500 }
        );
    }
}