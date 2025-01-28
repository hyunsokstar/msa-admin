// src/app/api/task-dashboard/[id]/api-specs/[specId]/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RouteParams {
    params: Promise<{
        id: string;
        specId: string;
    }>
}

export async function PUT(request: NextRequest, context: RouteParams) {
    try {
        // params와 cookies를 await로 처리
        const params = await context.params;
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore
        });

        const taskId = params.id;
        const specId = params.specId;

        console.log('Task ID:', taskId, 'Spec ID:', specId);

        if (!specId || !taskId) {
            return NextResponse.json(
                { error: "필수 파라미터가 누락되었습니다." },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json(
                { error: "Content-Type must be application/json" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const updateData = {
            ...body,
            task_id: taskId,
            updated_at: new Date().toISOString()
        };

        console.log('Update Data:', updateData);

        const { data: updatedSpec, error: updateError } = await supabase
            .from("task_api_mappings")
            .update(updateData)
            .eq("id", specId)
            .eq("task_id", taskId)
            .select()
            .single();

        if (updateError) {
            console.error("Update error:", updateError);
            return NextResponse.json(
                { error: "API 스펙 업데이트 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: updatedSpec });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
    try {
        const params = await context.params;
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore
        });

        const taskId = params.id;
        const specId = params.specId;

        console.log('Delete - Task ID:', taskId, 'Spec ID:', specId);

        if (!specId || !taskId) {
            return NextResponse.json(
                { error: "필수 파라미터가 누락되었습니다." },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        const { error: deleteError } = await supabase
            .from("task_api_mappings")
            .delete()
            .eq("id", specId)
            .eq("task_id", taskId);

        if (deleteError) {
            console.error("Delete error:", deleteError);
            return NextResponse.json(
                { error: "API 스펙 삭제 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}