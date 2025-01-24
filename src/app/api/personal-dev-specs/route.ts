// app/api/personal-dev-specs/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   try {
//     const supabase = createRouteHandlerClient({ cookies });

//     // 트리 구조로 데이터를 가져오는 쿼리
//     const { data, error } = await supabase
//       .from('personal_dev_specs')
//       .select(`
//         id,
//         name,
//         parent_id,
//         status,
//         sort_order,
//         is_active,
//         is_folder,
//         created_by
//       `)
//       .order('sort_order', { ascending: true });

//     if (error) {
//       console.error('Error fetching personal dev specs:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({
//       data
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Server error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
 try {
   const supabase = createRouteHandlerClient({ cookies });
   
   // 로그인한 유저 가져오기
   const { data: { user }, error: userError } = await supabase.auth.getUser();
   if (userError || !user) throw new Error('User not authenticated');

   const { data, error } = await supabase
     .from('personal_dev_specs')
     .select(`
       id,
       name,
       parent_id,
       status,
       sort_order,
       is_active,
       is_folder,
       created_by
     `)
     .eq('created_by', user.id) // 로그인한 유저가 생성한 항목만 필터링
     .order('sort_order', { ascending: true });

   if (error) {
     console.error('Error fetching personal dev specs:', error.message);
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

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('personal_dev_specs')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in POST /api/personal-dev-specs:', error);
    return NextResponse.json(
      { error: 'Failed to create personal dev spec' },
      { status: 500 }
    );
  }
}