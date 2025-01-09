// src/app/api/organizations/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
       const supabase = createRouteHandlerClient({ cookies });

       // 조직 데이터 조회
       const { data: organizations, error: orgError } = await supabase
           .from('organizations')
           .select('*')
           .order('path');

       if (orgError) {
           console.error('Error fetching organizations:', orgError.message);
           throw orgError;
       }

       // 사용자-조직 매핑 데이터 조회
       const { data: orgMembers, error: memberError } = await supabase
           .from('organization_members')
           .select(`
               organization_id,
               users (
                   id,
                   email,
                   full_name,
                   profile_image_url
               )
           `);

       if (memberError) {
           console.error('Error fetching organization members:', memberError.message);
           throw memberError;
       }

       // 조직별 멤버 매핑
       const organizationsWithMembers = organizations.map(org => ({
           ...org,
           members: orgMembers
               .filter(member => member.organization_id === org.id)
               .map(member => member.users)
       }));

       return NextResponse.json({
           data: organizationsWithMembers
       }, { status: 200 });

   } catch (error: any) {
       console.error('Server error:', error);
       return NextResponse.json(
           { error: 'Internal server error' },
           { status: 500 }
       );
   }
}