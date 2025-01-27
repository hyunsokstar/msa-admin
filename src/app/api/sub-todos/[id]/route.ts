// C:\Users\terec\msa-admin\src\app\api\sub-todos\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "SubTodo ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("sub_todos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting subtodo:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// app/api/sub-todos/[id]/route.ts
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const { id } = params;
        const { content } = await request.json();

        const { error } = await supabase
            .from("sub_todos")
            .update({ content })
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}