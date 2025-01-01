// app/api/menus/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: menuData, error } = await supabase
      .from('menus')
      .select(`
        id,
        name,
        path,
        parent_id,
        sort_order
      `)
      .order('parent_id', { ascending: true })
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: menuData });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}