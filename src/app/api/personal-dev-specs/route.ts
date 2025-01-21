// app/api/personal-dev-specs/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 트리 구조로 데이터를 가져오는 쿼리
    const { data, error } = await supabase
      .from('personal_dev_specs')
      .select(`
        id,
        name,
        parent_id,
        status,
        sort_order,
        is_active,
        created_by
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching personal dev specs:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data
    }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}