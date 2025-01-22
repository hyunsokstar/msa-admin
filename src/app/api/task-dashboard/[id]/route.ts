import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const taskId = context.params.id;

        // 요청 본문 파싱
        const body = await request.json();

        // 현재 사용자 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        // 기존 태스크 존재 여부 확인
        const { data: existingTask, error: fetchError } = await supabase
            .from("task_dashboard")
            .select()
            .eq("id", taskId)
            .single();

        if (fetchError || !existingTask) {
            return NextResponse.json(
                { error: "태스크를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 업데이트할 데이터 준비
        const updateData: { [key: string]: any } = {
            title: body.title,
            description: body.description,
            screen_url: body.screen_url,
            figma_url: body.figma_url,
            is_archived: body.is_archived,
            status: body.status,
            order: body.order,
            updated_at: new Date().toISOString(),
            updated_by: session.user.id
        };

        // null, undefined 값 제거
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // 데이터 업데이트
        const { data: updatedTask, error: updateError } = await supabase
            .from("task_dashboard")
            .update(updateData)
            .eq("id", taskId)
            .select(`
                *,
                created_by (
                    id,
                    email,
                    full_name,
                    profile_image_url
                ),
                updated_by (
                    id,
                    email,
                    full_name,
                    profile_image_url
                )
            `)
            .single();

        if (updateError) {
            console.error("Update error:", updateError);
            return NextResponse.json(
                { error: "태스크 업데이트 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: updatedTask }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const taskId = context.params.id;

        // 요청 본문 파싱
        const body = await request.json();

        // 현재 사용자 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        // 기존 태스크 존재 여부 확인
        const { data: existingTask, error: fetchError } = await supabase
            .from("task_dashboard")
            .select()
            .eq("id", taskId)
            .single();

        if (fetchError || !existingTask) {
            return NextResponse.json(
                { error: "태스크를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 업데이트할 데이터 준비
        const updateData: { [key: string]: any } = {
            title: body.title,
            description: body.description,
            screen_url: body.screen_url,
            figma_url: body.figma_url,
            is_archived: body.is_archived,
            status: body.status,
            order: body.order,
            updated_at: new Date().toISOString(),
            updated_by: session.user.id
        };

        // null, undefined 값 제거
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // 데이터 업데이트
        const { data: updatedTask, error: updateError } = await supabase
            .from("task_dashboard")
            .update(updateData)
            .eq("id", taskId)
            .select(`
                *,
                created_by (
                    id,
                    email,
                    full_name,
                    profile_image_url
                ),
                updated_by (
                    id,
                    email,
                    full_name,
                    profile_image_url
                )
            `)
            .single();

        if (updateError) {
            console.error("Update error:", updateError);
            return NextResponse.json(
                { error: "태스크 업데이트 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: updatedTask }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}