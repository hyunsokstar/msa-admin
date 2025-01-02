import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Create Supabase server client
    const response = NextResponse.next();
    const supabase = createPagesServerClient({ req: request as any, res: response as any });

    // 2. Fetch note collections
    const { data, error } = await supabase
      .from('note_collections')
      .select('*')
      .order('created_at', { ascending: false });

    // 3. Handle errors
    if (error) {
      console.error('Error fetching note collections:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Return fetched data
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
