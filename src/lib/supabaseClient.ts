"use client";

// utils/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
    private static instance: SupabaseClient | null = null;
    
    public static getInstance(): SupabaseClient {
        if (!SupabaseService.instance) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
            }
            
            SupabaseService.instance = createClient(supabaseUrl, supabaseKey, {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    storageKey: 'app-supabase-auth',
                },
            });
        }
        
        return SupabaseService.instance;
    }
}

export const getSupabaseClient = () => {
    if (typeof window === 'undefined') {
        // 서버 사이드에서는 서비스 롤 키를 사용하는 클라이언트 반환
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                auth: { persistSession: false }
            }
        );
    }
    return SupabaseService.getInstance();
};

export default getSupabaseClient;