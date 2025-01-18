// src/app/api/organizations/route.ts
import { getSupabaseAuth } from '@/lib/supabase/serverClient';
import { NextRequest, NextResponse } from 'next/server';
import { IOrganization } from '@/types/typeForOrganization';
import { IUser } from '@/types/typeForUser';

export async function GET(request: NextRequest) {
  try {
      const supabase = getSupabaseAuth();

      const { data: organizations, error } = await supabase
          .from('organizations')
          .select(`
              *,
              users (
                  id,
                  email,
                  full_name,
                  profile_image_url,
                  phone_number,
                  is_admin,
                  created_at
              )
          `)
          .order('path');

      if (error) {
          console.error('Error fetching organizations:', error.message);
          throw error;
      }

      // 응답 데이터를 IOrganization 타입에 맞게 구조화
      const organizationsWithMembers: IOrganization[] = organizations.map((org: any) => ({
          id: org.id,
          name: org.name,
          parent_id: org.parent_id,
          depth: org.depth,
          path: org.path,
          members: (org.users || []) as IUser[]
      }));

      return NextResponse.json({
          data: organizationsWithMembers
      }, { status: 200 });

  } catch (error: any) {
      console.error('Server error:', error);
      return NextResponse.json(
          { 
              error: 'Internal server error', 
              details: error.message 
          },
          { status: 500 }
      );
  }
}