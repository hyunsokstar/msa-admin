// src/api/apiForChat.ts
import getSupabase from '@/lib/supabase/browserClient';
import { IChatRoom, IChatMessage } from '@/types/typeForChatRoom';

// 기존 채팅방 목록 API
export async function apiForChatRoomList(): Promise<IChatRoom[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    console.error('Supabase 클라이언트가 초기화되지 않았습니다.');
    return null;
  }

  try {
    // rooms 테이블과 users 테이블을 join하여 방장 정보도 함께 가져옴
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        owner:users!owner_id (
          id,
          full_name,
          email,
          profile_image_url
        )
      `);

    if (error) {
      console.error('채팅방 목록을 가져오는 데 실패했습니다:', error);
      return null;
    }

    return data as IChatRoom[];
  } catch (error) {
    console.error('채팅방 목록을 가져오는 도중 오류가 발생했습니다:', error);
    return null;
  }
}

// 채팅방 상세 정보 조회
export async function apiForChatRoomDetail(roomId: string): Promise<IChatRoom | null> {
  const supabase = getSupabase();

  if (!supabase) {
    console.error('Supabase 클라이언트가 초기화되지 않았습니다.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        owner:users!owner_id (
          id,
          full_name,
          email,
          is_admin
        )
      `)
      .eq('id', roomId)
      .single();

    if (error) {
      console.error('채팅방 정보를 가져오는 데 실패했습니다:', error);
      return null;
    }

    return data as IChatRoom;
  } catch (error) {
    console.error('채팅방 정보를 가져오는 도중 오류가 발생했습니다:', error);
    return null;
  }
}

// 채팅방 메시지 목록 조회
export async function apiForChatMessages(roomId: string): Promise<IChatMessage[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    console.error('Supabase 클라이언트가 초기화되지 않았습니다.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles:sender_id (
          name
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('메시지 목록을 가져오는 데 실패했습니다:', error);
      return null;
    }

    return data.map(message => ({
      ...message,
      sender_name: message.profiles?.name
    })) as IChatMessage[];
  } catch (error) {
    console.error('메시지 목록을 가져오는 도중 오류가 발생했습니다:', error);
    return null;
  }
}

// 메시지 전송
export async function apiForSendMessage(roomId: string, content: string): Promise<IChatMessage | null> {
  const supabase = getSupabase();

  if (!supabase) {
    console.error('Supabase 클라이언트가 초기화되지 않았습니다.');
    return null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('사용자 인증이 필요합니다.');

    const { data, error } = await supabase
      .from('messages')
      .insert({
        room_id: roomId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error('메시지 전송에 실패했습니다:', error);
      return null;
    }

    return data as IChatMessage;
  } catch (error) {
    console.error('메시지 전송 중 오류가 발생했습니다:', error);
    return null;
  }
}