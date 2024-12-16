// src/api/apiForFreeBoard.ts

import { createClient } from '@supabase/supabase-js';
import { ICreateFreeBoardDto, IRequestDtoForApiForGetFreeBoardList, IResponseDtoForApiForGetFreeBoardList } from '../types/typeForFreeBoard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const apiForGetFreeBoardList = async ({
  page,
  limit
}: IRequestDtoForApiForGetFreeBoardList): Promise<IResponseDtoForApiForGetFreeBoardList> => {
  // Calculate offset
  const offset = (page - 1) * limit;

  // Get total count
  const { count: totalCount } = await supabase
    .from('free_board')
    .select('*', { count: 'exact', head: true });

  // Get paginated data
  const { data: items, error } = await supabase
    .from('free_board')
    .select('*')
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return {
    items: items || [],
    totalCount: totalCount || 0,
    currentPage: page,
    totalPages: Math.ceil((totalCount || 0) / limit)
  };
};

// src/api/apiForFreeBoard.ts

export const apiForCreateFreeBoard = async (data: ICreateFreeBoardDto) => {
  // Get current authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) throw new Error(authError.message);
  if (!user) throw new Error('User not authenticated');

  const { data: result, error } = await supabase
    .from('free_board')
    .insert({
      title: data.title,
      content: data.content,
      writer_id: user.id,  // Add writer_id from authenticated user
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result;
};