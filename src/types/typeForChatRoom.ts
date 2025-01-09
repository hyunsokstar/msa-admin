// src/types/typeForChatRoom.ts
export interface IUser {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  email: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  profile_image_url?: string | null;
}

export interface IChatRoom {
  id: string;
  name: string;
  description: string | null;
  type: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  owner_id: string | null;
  owner?: IUser | null;
  is_private?: boolean;
}

export interface IChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_edited: boolean;
  sender_name?: string;
}

// 챗룸 필터링을 위한 인터페이스
export interface ChatRoomFilter {
  keyword?: string;
  isPrivate?: boolean;
  ownerId?: string;
}

// 챗룸 생성을 위한 DTO
export interface CreateChatRoomDto {
  name: string;
  description?: string;
  type: string;
  is_private: boolean;
  owner_id: string;
}

// 챗룸 응답을 위한 인터페이스
export interface ChatRoomResponse {
  rooms: IChatRoom[];
  totalPrivate: number;
  totalPublic: number;
  totalRooms: number;
}