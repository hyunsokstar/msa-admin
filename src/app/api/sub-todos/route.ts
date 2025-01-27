// app/api/sub-todos/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { task_id, content } = await request.json();

        const { data, error } = await supabase
            .from("sub_todos")
            .insert({ task_id, content })
            .select()
            .single();

        if (error) {
            console.error("Error creating sub todo:", error);
            return NextResponse.json(
                { error: "Failed to create sub todo" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data },
            { status: 201 }
        );
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}