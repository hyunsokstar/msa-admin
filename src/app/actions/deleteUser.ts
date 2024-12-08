// app/actions/deleteUser.ts
'use server'

import { createClient } from '@supabase/supabase-js';

// service role key를 사용한 admin 클라이언트 생성
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // anon key가 아닌 service role key 사용
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function deleteUserAction(userId: string) {
  try {
    // auth.users 삭제 (트리거로 public.users도 자동 삭제됨)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
}