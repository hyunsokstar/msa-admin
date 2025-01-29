import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface UpdateData {
    title?: string;
    content?: string;
    path?: string;
    order?: number;
    updated_at: string;
    [key: string]: string | number | undefined;  // 인덱스 시그니처 추가
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // URL에서 taskId와 reviewId 추출
        const urlParts = request.nextUrl.pathname.split("/");
        const reviewId = urlParts[urlParts.length - 1];
        const taskId = urlParts[urlParts.length - 3];

        if (!taskId || !reviewId) {
            return NextResponse.json(
                { error: "태스크 ID와 리뷰 ID가 필요합니다." },
                { status: 400 }
            );
        }

        // 현재 사용자 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        // 요청 본문 파싱
        const body = await request.json();

        // 기존 리뷰 존재 여부 확인
        const { data: existingReview, error: fetchError } = await supabase
            .from("task_code_reviews")
            .select(`
                *,
                writer:users(
                    id,
                    email,
                    full_name,
                    profile_image_url
                )
            `)
            .eq("id", reviewId)
            .eq("task_id", taskId)
            .single();

        if (fetchError || !existingReview) {
            return NextResponse.json(
                { error: "코드 리뷰를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 작성자만 수정 가능하도록 체크
        if (existingReview.writer.id !== session.user.id) {
            return NextResponse.json(
                { error: "코드 리뷰 수정 권한이 없습니다." },
                { status: 403 }
            );
        }

        // 업데이트할 데이터 준비
        const updateData: UpdateData = {
            title: body.title,
            content: body.content,
            path: body.path,
            order: body.order,
            updated_at: new Date().toISOString()
        };

        // null, undefined 값 제거
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // 데이터 업데이트
        const { data: updatedReview, error: updateError } = await supabase
            .from("task_code_reviews")
            .update(updateData)
            .eq("id", reviewId)
            .eq("task_id", taskId)
            .select(`
                *,
                writer:users(
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
                { error: "코드 리뷰 업데이트 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: updatedReview }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        // URL에서 taskId와 reviewId 추출
        const urlParts = request.nextUrl.pathname.split("/");
        const reviewId = urlParts[urlParts.length - 1];
        const taskId = urlParts[urlParts.length - 3];

        if (!taskId || !reviewId) {
            return NextResponse.json(
                { error: "태스크 ID와 리뷰 ID가 필요합니다." },
                { status: 400 }
            );
        }

        // 현재 사용자 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        // 기존 리뷰 존재 여부와 권한 확인
        const { data: existingReview, error: fetchError } = await supabase
            .from("task_code_reviews")
            .select(`
                *,
                writer:users(
                    id,
                    email,
                    full_name,
                    profile_image_url
                )
            `)
            .eq("id", reviewId)
            .eq("task_id", taskId)
            .single();

        if (fetchError || !existingReview) {
            return NextResponse.json(
                { error: "코드 리뷰를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 작성자만 삭제 가능하도록 체크
        if (existingReview.writer.id !== session.user.id) {
            return NextResponse.json(
                { error: "코드 리뷰 삭제 권한이 없습니다." },
                { status: 403 }
            );
        }

        // 리뷰 삭제
        const { error: deleteError } = await supabase
            .from("task_code_reviews")
            .delete()
            .eq("id", reviewId)
            .eq("task_id", taskId);

        if (deleteError) {
            console.error("Delete error:", deleteError);
            return NextResponse.json(
                { error: "코드 리뷰 삭제 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}