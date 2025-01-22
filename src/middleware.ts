// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });

//     try {
//         // 세션 새로고침
//         const {
//             data: { session },
//         } = await supabase.auth.getSession();

//         // 프로필 페이지 접근 보호
//         if (req.nextUrl.pathname.startsWith('/profile')) {
//             if (!session) {
//                 // 인증되지 않은 사용자는 홈페이지로 리다이렉트
//                 return NextResponse.redirect(new URL('/', req.url));
//             }
//         }

//         // 필요한 경우 토큰 갱신
//         if (session) {
//             const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
//             if (refreshedSession) {
//                 // 세션이 성공적으로 갱신됨
//                 return res;
//             }
//         }
//     } catch (e) {
//         console.error('Auth middleware error:', e);
//     }

//     return res;
// }

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    try {
        // 세션 새로고침
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // 프로필 페이지 접근 보호
        if (req.nextUrl.pathname.startsWith('/profile')) {
            if (!session) {
                // 인증되지 않은 사용자는 홈페이지로 리다이렉트
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        // 필요한 경우 토큰 갱신
        if (session) {
            const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
            if (refreshedSession) {
                // 세션이 성공적으로 갱신됨
                return res;
            }
        }
    } catch (e) {
        console.error('Auth middleware error:', e);
    }

    return res;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};