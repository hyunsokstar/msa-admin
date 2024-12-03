// 파일 경로: /src/api/apiForApiConverter.ts
import getSupabase from '@/lib/supabaseClient';
import { ApiNameType } from "@/types/typeForApiConverter";

/**
 * api_names 테이블에서 API 목록을 가져오는 함수
 * @returns API 목록 배열 또는 null
 */
export async function apiForGetApiNames(): Promise<ApiNameType[] | null> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('api_names')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('API 이름 데이터를 가져오는 중 오류 발생:', error);
            return null;
        }

        if (!data) {
            console.warn('API 이름 데이터를 찾을 수 없습니다.');
            return null;
        }

        return data;
    } catch (error) {
        console.error('API 이름 데이터를 가져오는 중 예외 발생:', error);
        return null;
    }
}

/**
 * api_names 테이블의 is_completed 상태를 업데이트하는 함수
 * @param id 업데이트할 API의 ID
 * @param isCompleted 완료 상태 (true/false)
 * @returns 성공 여부
 */
export async function apiForUpdateIsCompletedForApiNames(id: number, isCompleted: boolean): Promise<boolean> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return false;
    }

    console.log("id : ", id)
    console.log("is_completed check : ", isCompleted)

    try {
        const { error } = await supabase
            .from('api_names')
            .update({ is_completed: isCompleted })
            .eq('id', id);

        if (error) {
            console.error('API 이름 완료 상태 업데이트 중 오류 발생:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('API 이름 완료 상태 업데이트 중 예외 발생:', error);
        return false;
    }
}

/**
 * api_names 테이블에 새로운 API를 추가하는 함수
 * @param apiName 생성할 API 데이터
 * @returns 생성된 API 데이터 또는 null
 */
export async function apiForCreateApiName(apiName: Omit<ApiNameType, 'id'>): Promise<ApiNameType | null> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('api_names')
            .insert(apiName)
            .select()
            .single();

        if (error) {
            console.error('API 이름 추가 중 오류 발생:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('API 이름 추가 중 예외 발생:', error);
        return null;
    }
}

export default apiForGetApiNames;
