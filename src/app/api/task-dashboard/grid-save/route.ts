// src/app/api/task-dashboard/grid-save/route.ts
import { TaskDashboardForUpdate } from '@/types/task/typeForTaskDashboard';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) { // PUT 메서드 사용
    try {
        const cookieStore = cookies(); // cookieStore 변수 선언
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore }); // 화살표 함수로 cookies 전달
        const body = await request.json();
        const tasks = body.tasks as TaskDashboardForUpdate[]; // 클라이언트에서 tasks 배열 받기

        if (!tasks || !Array.isArray(tasks)) {
            return NextResponse.json({ error: 'Invalid request body: Tasks array is missing or not an array' }, { status: 400 });
        }

        for (const task of tasks) {
            const { id, ...updates } = task; // task id와 업데이트할 데이터 분리

            if (!id) {
                console.warn("Task ID is missing, skipping update for:", task);
                continue; // id가 없으면 업데이트 스킵 (에러 처리 방식은 필요에 따라 수정)
            }

            // Let's try updating only title and description for now to isolate the issue
            const simpleUpdates = {
                title: updates.title,
                description: updates.description,
                status: updates.status, // Keep status for now, or remove if still errors
                is_archived: updates.is_archived, // Keep is_archived for now, or remove if still errors
                // created_by_user: updates.created_by_user // Comment out created_by_user for now
            };


            const { error } = await supabase
                .from('task_dashboard')
                .update(simpleUpdates) // Use simpleUpdates instead of updates
                .eq('id', id); // id 기준으로 업데이트

            if (error) {
                console.error('Error updating task dashboard:', error.message, task);
                return NextResponse.json({ error: `Failed to update task: ${error.message} for task ID: ${id}` }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true, message: 'Tasks updated successfully' }, { status: 200 }); // 성공 응답
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}