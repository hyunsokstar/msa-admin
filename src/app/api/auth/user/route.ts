// app/api/auth/user/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            user: {
                id: session.user.id,
                email: userData.email,
                is_admin: userData.is_admin,
                profile_image_url: userData.profile_image_url,
                full_name: userData.full_name,
                phone_number: userData.phone_number,
                created_at: userData.created_at
            },
            session
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}