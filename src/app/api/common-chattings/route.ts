import { getSupabaseService } from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const supabaseService = getSupabaseService();

        const { data, error } = await supabaseService
            .from("common_chattings")
            .select(`
        *,
        users (
          id,
          full_name,
          profile_image_url
        )
      `)
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Error fetching common chattings:", error.message);
            return NextResponse.json(
                {
                    error: "Failed to fetch common chattings",
                    details: error.message,
                    data: null
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store'
                }
            }
        );

    } catch (error) {
        console.error("Common Chattings Error:", error);
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

        const { data, error } = await supabaseService
            .from("common_chattings")
            .insert([body])
            .select(`
        *,
        users (
          id,
          full_name,
          profile_image_url
        )
      `)
            .single();

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

        return NextResponse.json({ data }, { status: 201 });

    } catch (error) {
        console.error("Common Chatting Creation Error:", error);
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