// app/api/api-specs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { ApiSpec } from '@/types/typeForApiSpec';

type ApiResponse<T> = {
  data?: T;
  error?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<ApiSpec[]>>> {
  try {
    const supabase = getSupabaseService();

    const { data, error } = await supabase
      .from('api_specs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ApiSpec>>> {
  try {
    const supabase = getSupabaseService();
    const apiSpec: Partial<ApiSpec> = await request.json();

    const { data, error } = await supabase
      .from('api_specs')
      .insert([apiSpec])
      .select()
      .single();

    if (error) {
      console.error('Error adding API spec:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}