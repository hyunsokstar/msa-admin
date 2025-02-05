// app/api/common-chattings/route.ts
import { getSupabaseService } from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = getSupabaseService();

        const { data, error } = await supabase
            .from("common_chattings")
            .select(`
                id,
                message,
                created_at,
                message_type,
                is_left,
                user_id,
                recipient_id,
                sender:user_id (
                    id,
                    full_name,
                    profile_image_url
                ),
                recipient:recipient_id (
                    id,
                    full_name,
                    profile_image_url
                )
            `)
            .order('created_at', { ascending: true });

        if (error) {
            return NextResponse.json(
                {
                    error: "Failed to fetch common chattings",
                    details: error.message,
                    data: null
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            error: null,
            details: null
        });

    } catch (error) {
        console.error("Error fetching common chattings:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch common chattings",
                details: error instanceof Error ? error.message : "Unknown error",
                data: null
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabaseService = getSupabaseService();
        const body = await request.json();
        console.log('Request body:', body);

        // 1. 이전 메시지 조회
        const { data: lastMessage } = await supabaseService
            .from("common_chattings")
            .select('user_id, is_left')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // 2. is_left 값 결정
        let is_left = true;
        if (lastMessage) {
            is_left = lastMessage.user_id !== body.created_by ? !lastMessage.is_left : lastMessage.is_left;
        }

        // 3. 새 메시지 삽입
        const { data, error } = await supabaseService
            .from("common_chattings")
            .insert([{
                message: body.message,
                user_id: body.created_by,
                message_type: 'text',
                is_left: is_left,
                recipient_id: body.recipient_id
            }])
            .select(`
                *,
                users (
                    id,
                    full_name,
                    profile_image_url
                )
            `)
            .single();

        console.log('Supabase response:', data);

        if (error) {
            console.error("Error creating common chatting:", error.message);
            return NextResponse.json(
                {
                    error: "Failed to create common chatting",
                    details: error.message,
                    data: null
                },
                { status: 500 }
            );
        }

        // CommonChattingResponse 형식에 맞게 응답 반환
        return NextResponse.json({
            data: [data],
            error: null,
            details: null
        }, { status: 201 });

    } catch (error) {
        console.error("Common Chatting Creation Error:", error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
        return NextResponse.json(
            {
                error: "Failed to create common chatting",
                details: error instanceof Error ? error.message : "Unknown error",
                data: null
            },
            { status: 500 }
        );
    }
}