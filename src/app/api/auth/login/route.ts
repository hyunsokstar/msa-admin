// app/api/auth/login/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
      }

      return NextResponse.json({
        session: data.session,
        isAdmin: userData.is_admin,
        user: data.user
      });
    }

    return NextResponse.json({ error: '사용자 정보가 없습니다.' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}