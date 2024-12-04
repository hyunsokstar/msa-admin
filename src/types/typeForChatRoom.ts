// C:\Users\terec\msa-admin\src\types\typeForChatRoom.ts
export interface IUser {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  email: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
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
}

export interface IChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_edited: boolean;
  sender_name?: string; // 송신자 이름
}