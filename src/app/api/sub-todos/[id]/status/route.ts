// app/api/sub-todos/[id]/status/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const params = await context.params;
        const { is_completed } = await request.json();

        const { data, error } = await supabase
            .from("sub_todos")
            .update({ is_completed })
            .eq("id", params.id)
            .select()
            .single();

        if (error) {
            console.error("Error updating sub todo status:", error);
            return NextResponse.json(
                { error: "Failed to update status" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data },
            { status: 200 }
        );
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}