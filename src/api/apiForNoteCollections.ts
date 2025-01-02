// C:\Users\terec\msa-admin\src\api\apiForNoteCollections.ts
import getSupabase from '@/lib/supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';

export const apiForGetNoteCollections = async () => {
  try {
    const response = await fetch('/api/note-collections', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch note collections');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error in apiForGetNoteCollections:', error);
    throw error;
  }
};
