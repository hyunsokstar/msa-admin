// src\api\apiForCodeTransFormWithPostGresDb.ts
import getSupabase from '@/lib/supabaseClient';
import { CodeTransformFormat, TransformStyle } from '@/types/typeForTransform';

export const apiForCreateCodeTransformFormat = async (
  data: Omit<CodeTransformFormat, 'id' | 'created_at'>
): Promise<CodeTransformFormat> => {
  const supabase = getSupabase();
  
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data: result, error } = await supabase
    .from('transform_styles')
    .insert([data])
    .select()
    .single();
    
  if (error) throw error;
  if (!result) throw new Error('Failed to create transform format');
  
  return result;
};

export const apiForGetTransformStyles = async (): Promise<TransformStyle[]> => {
  const supabase = getSupabase();
  
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('transform_styles')
    .select('*')
    .order('id');
    
  if (error) throw error;
  return data || [];
};

export const apiForApplyTransform = (
  style: TransformStyle, 
  params: { [key: string]: string }
): string => {
  let result = style.trans_format;
  
  // 먼저 일반 변수들을 치환
  Object.entries(params).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    result = result.replace(regex, value);
  });
  
  // JavaScript 표현식 평가
  result = result.replace(/\$\{([^}]+)\}/g, (match, expr) => {
    try {
      // params 객체를 컨텍스트로 사용하여 표현식 평가
      const evalFunc = new Function(...Object.keys(params), `return ${expr}`);
      return evalFunc(...Object.values(params));
    } catch (error) {
      console.error('Expression evaluation error:', error);
      return match; // 평가 실패 시 원본 유지
    }
  });
  
  return result;
};

// 코드 포매터 수정
export const apiForUpdateTransformStyle = async (
  id: number,
  data: Omit<CodeTransformFormat, 'id' | 'created_at'>
): Promise<TransformStyle> => {
  const supabase = getSupabase();
  
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data: result, error } = await supabase
    .from('transform_styles')
    .update(data)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  if (!result) throw new Error('Failed to update transform style');
  
  return result;
};