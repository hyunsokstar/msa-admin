// src/app/api/users/route.ts
import { getSupabaseAuth } from '@/lib/supabase/serverClient';
import { NextRequest, NextResponse } from 'next/server';
import { IUser, UserFilter } from '@/types/typeForUser';

export async function GET(request: NextRequest) {
    try {
        const supabase = getSupabaseAuth();
        const { searchParams } = new URL(request.url);
        
        // URL 파라미터에서 필터 정보 추출
        const filter: UserFilter = {
            email: searchParams.get('email') || undefined,
            name: searchParams.get('name') || undefined,
            phone: searchParams.get('phone') || undefined,
            isAdmin: searchParams.get('isAdmin') === 'true' ? true : 
                    searchParams.get('isAdmin') === 'false' ? false : undefined,
            organizationId: searchParams.get('organizationId') || undefined
        };

        let query = supabase
            .from('users')
            .select(`
                *,
                organizations (
                    id,
                    name,
                    parent_id
                )
            `);

        // 필터 적용
        if (filter.email) {
            query = query.ilike('email', `%${filter.email}%`);
        }
        if (filter.name) {
            query = query.ilike('full_name', `%${filter.name}%`);
        }
        if (filter.phone) {
            query = query.ilike('phone_number', `%${filter.phone}%`);
        }
        if (filter.isAdmin !== undefined) {
            query = query.eq('is_admin', filter.isAdmin);
        }
        if (filter.organizationId) {
            query = query.eq('organization_id', filter.organizationId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ data }, { status: 200 });

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}