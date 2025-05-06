// C:\Users\terec\msa-admin\src\app\api\test-items\[id]\comments\route.ts
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseService();
    const testItemId = params.id;

    const { data, error } = await supabase
        .from('comments_for_test_items')
        .select(`
        id,
        test_item_id,
        author_id,
        comment,
        created_at,
        updated_at,
        ref_image,
        ref_video,
        author:users(id, full_name, profile_image_url)
      `)
        .eq('test_item_id', testItemId)
        .order('created_at', { ascending: true });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return Response.json({ data });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseService();
    const testItemId = params.id;

    try {
        const body = await req.json();
        const { author_id, comment, ref_image, ref_video } = body;

        if (!author_id || !comment) {
            return new Response(JSON.stringify({ error: 'author_id와 comment는 필수입니다.' }), {
                status: 400,
            });
        }

        const { data, error } = await supabase
            .from('comments_for_test_items')
            .insert([
                {
                    test_item_id: testItemId,
                    author_id,
                    comment,
                    ref_image: ref_image || null,
                    ref_video: ref_video || null,
                },
            ])
            .select()
            .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return Response.json({ data });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || '서버 오류' }), { status: 500 });
    }
}
