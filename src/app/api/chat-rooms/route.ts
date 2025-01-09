// app/api/chat-rooms/route.ts
import { createClient } from '@supabase/supabase-js';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ChatRoomFilter, CreateChatRoomDto } from '@/types/typeForChatRoom';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function GET(request: Request) {
  try {
    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const filterParam = searchParams.get('filter');
    const filter: ChatRoomFilter | undefined = filterParam ? JSON.parse(filterParam) : undefined;

    // 메인 쿼리 준비
    let mainQuery = supabase
      .from('rooms')
      .select(`
        *,
        owner:users!owner_id (
          id,
          full_name,
          email,
          profile_image_url
        )
      `, { count: 'exact' });

    // 필터 조건 적용
    if (filter) {
      if (filter.isPrivate !== undefined) {
        mainQuery = mainQuery.eq('is_private', filter.isPrivate);
      }
      if (filter.ownerId) {
        mainQuery = mainQuery.eq('owner_id', filter.ownerId);
      }
      if (filter.keyword && filter.keyword.trim() !== '') {
        mainQuery = mainQuery.or(`name.ilike.%${filter.keyword}%,description.ilike.%${filter.keyword}%`);
      }
    }

    // 페이징과 정렬 적용
    mainQuery = mainQuery
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    const { data, error, count } = await mainQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 공개/비공개 채팅방 수 계산
    const totalPrivate = data?.filter(room => room.is_private).length || 0;
    const totalPublic = data?.filter(room => !room.is_private).length || 0;

    return NextResponse.json({
      rooms: data || [],
      totalPrivate,
      totalPublic,
      totalRooms: count || 0
    });

  } catch (error) {
    console.error('Error in chat rooms API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const roomData: CreateChatRoomDto = await request.json();

    const { data, error } = await supabase
      .from('rooms')
      .insert([roomData])
      .select(`
        *,
        owner:users!owner_id (
          id,
          full_name,
          email,
          profile_image_url
        )
      `)
      .single();

    if (error) {
      console.error('Error creating chat room:', error.message);
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