// C:\Users\terec\msa-admin\src\api\apiForApiSpec.ts

import getSupabase from '@/lib/supabase/browserClient';
import { ApiSpec } from '@/types/typeForApiSpec';
import { SupabaseClient } from '@supabase/supabase-js';

// API 스펙 추가
export async function addApiSpec(apiSpec: Partial<ApiSpec>): Promise<ApiSpec[] | null> {
  try {
    const response = await fetch('/api/api-specs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiSpec),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding API spec:', error);
    return null;
  }
}

export async function fetchApiSpecs(): Promise<ApiSpec[] | null> {
  try {
    const response = await fetch('/api/api-specs');
    if (!response.ok) {
      throw new Error('Failed to fetch API specs');
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API specs:', error);
    return null;
  }
}

// API 스펙 수정
export async function updateApiSpec(id: string, updates: Partial<ApiSpec>): Promise<ApiSpec[] | null> {
  const supabase = getSupabase() as SupabaseClient;
  
  const { data, error } = await supabase
    .from('api_specs')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating API spec:', error);
    return null;
  }

  return data;
}

// API 스펙 삭제
export async function deleteApiSpec(id: string): Promise<boolean> {
  const supabase = getSupabase() as SupabaseClient;
  
  const { error } = await supabase
    .from('api_specs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting API spec:', error);
    return false;
  }

  return true;
}

