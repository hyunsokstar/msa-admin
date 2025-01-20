// app/api/task-dashboard/[id]/route.ts
import { getSupabaseAuth, getSupabaseService } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseAuth = getSupabaseAuth();
    const { data: { session } } = await supabaseAuth.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Update task body:', body);

    const supabaseService = getSupabaseService();
    const { data, error } = await supabaseService
      .from('task_dashboard')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id
      })
      .eq('id', params.id)
      .select('*, created_by(*), updated_by(*)')
      .single();

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Task Update Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}