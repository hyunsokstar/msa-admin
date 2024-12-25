// C:\Users\terec\msa-admin\src\api\apiForApiSpec.ts

import getSupabase from '@/lib/supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';

// API 스펙 타입 정의
export interface ApiSpec {
  id: string;
  title: string;
  method: string;
  endpoint: string;
  description?: string;
  parameters?: any;
  request_body_schema?: any;
  response_schema?: any;
  service_name?: string;
  category1?: string;
  category2?: string;
  created_at?: string;
  updated_at?: string;
  auth_required?: boolean;
  request_type: string;
  response_type: string;
}

// 모든 API 스펙 데이터 조회
export async function fetchApiSpecs(): Promise<ApiSpec[] | null> {
  const supabase = getSupabase() as SupabaseClient;
  
  const { data, error } = await supabase
    .from('api_specs')
    .select('*')
    .order('service_name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching API specs:', error);
    return null;
  }

  return data;
}

// 서비스별로 그룹화된 API 스펙 데이터 조회
export async function fetchGroupedApiSpecs(): Promise<Record<string, ApiSpec[]> | null> {
  const data = await fetchApiSpecs();
  
  if (!data) return null;

  const groupedData = data.reduce((acc, api) => {
    const serviceName = api.service_name || 'UNCATEGORIZED';
    if (!acc[serviceName]) {
      acc[serviceName] = [];
    }
    acc[serviceName].push(api);
    return acc;
  }, {} as Record<string, ApiSpec[]>);

  return groupedData;
}

// 특정 서비스의 API 스펙만 조회
export async function fetchServiceApiSpecs(serviceName: string): Promise<ApiSpec[] | null> {
  const supabase = getSupabase() as SupabaseClient;
  
  const { data, error } = await supabase
    .from('api_specs')
    .select('*')
    .eq('service_name', serviceName)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${serviceName} API specs:`, error);
    return null;
  }

  return data;
}

// API 서비스별 통계 조회
export async function fetchApiStats(): Promise<Record<string, number> | null> {
  const supabase = getSupabase() as SupabaseClient;
  
  const { data, error } = await supabase
    .from('api_specs')
    .select('service_name')
    .not('service_name', 'is', null);

  if (error) {
    console.error('Error fetching API stats:', error);
    return null;
  }

  const stats = data.reduce((acc, api) => {
    const serviceName = api.service_name as string;
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return stats;
}

// API 스펙 추가
export async function addApiSpec(apiSpec: Partial<ApiSpec>): Promise<ApiSpec[] | null> {
  console.log('1. Starting addApiSpec with data:', apiSpec);
  
  const supabase = getSupabase() as SupabaseClient;
  console.log('2. Supabase client created:', !!supabase);
  
  try {
    const { data, error } = await supabase
      .from('api_specs')
      .insert([apiSpec])
      .select();
    
    console.log('3. Supabase response:', { data, error });

    if (error) {
      console.error('4. Error adding API spec:', error);
      return null;
    }

    console.log('5. Successfully added API spec:', data);
    return data;
  } catch (e) {
    console.error('6. Exception in addApiSpec:', e);
    throw e;
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

