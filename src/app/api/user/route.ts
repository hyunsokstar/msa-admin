// app/api/auth/user/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // createRouteHandlerClient 직접 사용
    const supabase = createRouteHandlerClient({ 
      cookies,
    });

    // 세션 체크
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ user: null });
    }

    // 사용자 정보 조회
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        email: session.user.email,
        userId: session.user.id,
        is_admin: userData.is_admin,
        profile_image_url: userData.profile_image_url,
        full_name: userData.full_name
      }
    });

  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: '사용자 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}