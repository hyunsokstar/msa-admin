// app/api/note-collections/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// app/api/note-collections/route.ts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const offset = (page - 1) * pageSize;

    const supabase = createRouteHandlerClient({ cookies });

    // 한번의 쿼리로 모든 데이터를 가져옵니다
    const { data, error, count } = await supabase
      .from('note_collections')
      .select(`
        *,
        writer:users(id, full_name, profile_image_url),
        notes(count)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching note collections:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // notes 배열의 count를 note_count로 변환
    const formattedData = data.map(item => ({
      ...item,
      note_count: item.notes?.[0]?.count || 0,
      notes: undefined // notes 필드 제거
    }));

    return NextResponse.json({
      data: formattedData,
      pagination: {
        currentPage: page,
        pageSize,
        total: count,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const page = parseInt(searchParams.get('page') || '1');
//     const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
//     const offset = (page - 1) * pageSize;

//     const supabase = createRouteHandlerClient({ cookies });

//     const { data, error, count } = await supabase
//       .from('note_collections')
//       .select(`
//         *,
//         writer:users(id, full_name, profile_image_url)
//       `, { count: 'exact' })
//       .order('created_at', { ascending: false })
//       .range(offset, offset + pageSize - 1);

//     if (error) {
//       console.error('Error fetching note collections:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({
//       data,
//       pagination: {
//         currentPage: page,
//         pageSize,
//         total: count,
//         totalPages: Math.ceil((count || 0) / pageSize)
//       }
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Server error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
 try {
   const supabase = createRouteHandlerClient({ cookies });
   const body = await request.json();

   const { data, error } = await supabase
     .from('note_collections')
     .insert([
       {
         name: body.name,
         writer: body.writer
       }
     ])
     .select(`
       *,
       writer:users(id, full_name, profile_image_url)
     `)
     .single();

   if (error) {
     console.error('Error creating note collection:', error.message);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({ data }, { status: 201 });

 } catch (error) {
   console.error('Server error:', error);
   return NextResponse.json(
     { error: 'Internal server error' },
     { status: 500 }
   );
 }
}

