// app/api/task-dashboard/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// app/api/task-dashboard/route.ts
export async function GET() {
  try {
    const supabaseAuth = getSupabaseAuth();
    
    const { data: { session }} = await supabaseAuth.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const supabaseService = getSupabaseService();
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .select('*')
      .order('status')
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });

  } catch (error: any) {
    console.error('Task Dashboard Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch task dashboard' }, 
      { status: 500 }
    );
  }
}

// PATCH endpoint for updating status and order
export async function PATCH(request: Request) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session }} = await supabaseAuth.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, order } = body;

    const supabaseService = getSupabaseService();
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .update({ 
        status,
        order,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });

  } catch (error: any) {
    console.error('Task Update Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to update task' }, 
      { status: 500 }
    );
  }
}

