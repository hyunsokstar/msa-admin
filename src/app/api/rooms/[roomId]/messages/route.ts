"use client";

// app/api/rooms/[roomId]/messages/route.ts
import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabaseClient';

// GET 메시지 목록 조회
export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase 클라이언트 초기화 실패' },
        { status: 500 }
      );
    }

    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // 메시지 목록 조회
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!sender_id (
          full_name,
          email
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: '메시지 목록 조회 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('메시지 조회 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST 메시지 전송
export async function POST(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    const { content, message_type = 'text' } = await req.json();
    
    if (!content) {
      return NextResponse.json(
        { error: '메시지 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase 클라이언트 초기화 실패' },
        { status: 500 }
      );
    }

    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // 채팅방 존재 여부 확인
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id')
      .eq('id', roomId)
      .single();

    if (roomError || !room) {
      return NextResponse.json(
        { error: '존재하지 않는 채팅방입니다.' },
        { status: 404 }
      );
    }

    // 메시지 저장
    const { data, error } = await supabase
      .from('messages')
      .insert({
        room_id: roomId,
        sender_id: user.id,
        content,
        message_type
      })
      .select(`
        *,
        sender:users!sender_id (
          full_name,
          email
        )
      `)
      .single();

    if (error) {
      return NextResponse.json(
        { error: '메시지 저장 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('메시지 처리 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}