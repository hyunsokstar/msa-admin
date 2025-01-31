import { NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        const id = request.nextUrl.pathname.split("/").pop();
        const { content } = await request.json();

        if (!id) {
            return Response.json(
                { error: "SubTodo ID is required" },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { error } = await supabase
            .from("sub_todos")
            .update({
                content,
                updated_at: new Date().toISOString(),
                // updated_by: session.user.id
            })
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
            return Response.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return Response.json({ success: true });

    } catch (error) {
        console.error("Server error:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        const id = request.nextUrl.pathname.split("/").pop();

        if (!id) {
            return Response.json(
                { error: "SubTodo ID is required" },
                { status: 400 }
            );
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return Response.json(
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
            return Response.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return Response.json({ success: true });

    } catch (error) {
        console.error("Server error:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}