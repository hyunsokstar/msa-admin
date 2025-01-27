// app/api/task-dashboard/[id]/api-specs/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        
        const urlParts = request.nextUrl.pathname.split("/");
        const taskId = urlParts[urlParts.length - 2];
        const body = await request.json();

        if (!taskId) {
            return NextResponse.json(
                { error: "Invalid Task ID", details: "Task ID is required", data: null },
                { status: 400 }
            );
        }

        // Insert new API spec
        const { data, error } = await supabase
            .from('task_api_mappings')
            .insert([
                {
                    task_id: taskId,
                    method: body.method,
                    endpoint: body.endpoint,
                    description: body.description || null,
                    request_spec: body.request_spec || {},
                    response_spec: body.response_spec || {},
                    headers: body.headers || {}
                }
            ])
            .select(`
                *,
                task:task_dashboard(id)
            `)
            .single();

        if (error) {
            console.error('Error creating API spec:', error);
            return NextResponse.json(
                { error: "Failed to create API spec", details: error.message, data: null },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                data,
                message: "API specification created successfully"
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown error",
                data: null
            },
            { status: 500 }
        );
    }
}