// app/api/menus/create/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const { name, path, parent_id, sort_order } = await request.json();
    
    const supabase = createRouteHandlerClient({ cookies });

    // 해당 부모 메뉴의 하위 메뉴들 중 최대 sort_order 가져오기
    const { data: maxSortData } = await supabase
      .from('menus')
      .select('sort_order')
      .eq('parent_id', parent_id || 0)
      .order('sort_order', { ascending: false })
      .limit(1);

    const newSortOrder = sort_order || (maxSortData && maxSortData.length > 0
      ? maxSortData[0].sort_order + 1
      : 1);

    const { data, error } = await supabase
      .from('menus')
      .insert({
        name,
        path,
        parent_id,
        sort_order: newSortOrder
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Menu creation error:', error);
    return NextResponse.json(
      { error: '메뉴 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}