import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestItem } from '@/types/typeForTestTarget';

// Generic ApiResponse type
type ApiResponse<T> = {
    data?: T;
    error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<TestItem[]>>> {
    try {
        // Extract target ID from the URL path
        const urlParts = request.nextUrl.pathname.split("/");
        // Assumes URL structure like /api/test-targets/[id]/items
        const targetId = urlParts[urlParts.length - 2];

        if (!targetId) {
            return NextResponse.json(
                { error: "Target ID is required." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        // Fetch items for the given target_id, joined with users table for assignee and issue_solver info
        const { data, error } = await supabase
            .from('test_items')
            .select(`
                *,
                assignee:users!test_items_assignee_id_fkey(id, full_name, profile_image_url),
                issue_solver:users!test_items_issue_solver_id_fkey(id, full_name, profile_image_url)
            `) // Select all columns and join with users table for both assignee and issue_solver
            .eq('target_id', targetId)
            .order('created_at'); // Order by creation time

        if (error) {
            console.error('Supabase error fetching items:', error);
            return NextResponse.json({ error: `Failed to fetch items: ${error.message}` }, { status: 500 });
        }

        // Return the fetched data
        return NextResponse.json({ data });

    } catch (error) {
        console.error('Error in GET /api/.../items:', error);
        return NextResponse.json(
            { error: 'Internal server error occurred while fetching items.' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<TestItem>>> {
    try {
        // Extract target ID from the URL path
        const urlParts = request.nextUrl.pathname.split("/");
        const targetId = urlParts[urlParts.length - 2];

        if (!targetId) {
            return NextResponse.json(
                { error: "Target ID is required to associate the item." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        // Parse the request body to get the new test item data
        const testItemData = await request.json();

        // Explicitly set the target_id based on the URL parameter for security/consistency
        testItemData.target_id = targetId;

        // Insert the new test item into the database
        const { data, error } = await supabase
            .from('test_items')
            .insert([testItemData])
            .select() // Select the newly created record
            .single(); // Expecting a single record to be inserted and returned

        if (error) {
            console.error('Supabase error adding test item:', error);
            return NextResponse.json({ error: `Failed to add test item: ${error.message}` }, { status: 500 });
        }

        // Return the newly created item data with a 201 Created status
        return NextResponse.json({ data }, { status: 201 });

    } catch (error) {
        console.error('Error in POST /api/.../items:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return NextResponse.json(
            { error: `Internal server error: ${errorMessage}` },
            { status: 500 }
        );
    }
}

// Update a test item (including completion status and issue_solver_id)
export async function PATCH(request: NextRequest): Promise<NextResponse<ApiResponse<TestItem>>> {
    try {
        // Extract item ID from the URL path
        const urlParts = request.nextUrl.pathname.split("/");
        const itemId = urlParts[urlParts.length - 1]; // Assuming URL structure like /api/test-items/[id]

        if (!itemId) {
            return NextResponse.json(
                { error: "Item ID is required for update." },
                { status: 400 }
            );
        }

        const supabase = getSupabaseService();

        // Parse the request body to get the update data
        const updateData = await request.json();
        
        // Update the test item in the database
        const { data, error } = await supabase
            .from('test_items')
            .update(updateData)
            .eq('id', itemId)
            .select(`
                *,
                assignee:users!test_items_assignee_id_fkey(id, full_name, profile_image_url),
                issue_solver:users!test_items_issue_solver_id_fkey(id, full_name, profile_image_url)
            `) // Include joined data in response
            .single();

        if (error) {
            console.error('Supabase error updating test item:', error);
            return NextResponse.json({ error: `Failed to update test item: ${error.message}` }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: "Item not found or update failed." }, { status: 404 });
        }

        // Return the updated item data
        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error('Error in PATCH /api/test-items/[id]:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return NextResponse.json(
            { error: `Internal server error: ${errorMessage}` },
            { status: 500 }
        );
    }
}