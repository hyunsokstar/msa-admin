// app/api/sub-todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { id } = context.params;
        const { content } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "SubTodo ID is required" },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { error } = await supabase
            .from("sub_todos")
            .update({
                content,
                updated_at: new Date().toISOString(),
                updated_by: session.user.id
            })
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { id } = context.params;

        if (!id) {
            return NextResponse.json(
                { error: "SubTodo ID is required" },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { error } = await supabase
            .from("sub_todos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}