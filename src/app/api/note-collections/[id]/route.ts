// app/api/note-collections/[id]/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PUT(
  req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();

    const { data, error } = await supabase
      .from('note_collections')
      .update({ name: body.name })
      .eq('id', params.id)
      .select(`
        *,
        writer:users(id, full_name, profile_image_url)
      `)
      .single();

    if (error) {
      console.error('Error updating note collection:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase
      .from('note_collections')
      .delete()
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error deleting note collection:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}