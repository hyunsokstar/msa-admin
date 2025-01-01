"use client";

import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
    private static clientInstance: SupabaseClient | null = null;
    private static serverInstance: SupabaseClient | null = null;
    
    private static createClientInstance(): SupabaseClient {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
        }
        
        return createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                storageKey: 'app-supabase-auth',
            },
            db: {
                schema: 'public'
            }
        });
    }
    
    private static createServerInstance(): SupabaseClient {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        
        return createClient(supabaseUrl, supabaseServiceKey, {
            auth: { 
                persistSession: false,
                autoRefreshToken: false
            },
            db: {
                schema: 'public'
            }
        });
    }

    public static getInstance(): SupabaseClient {
        if (typeof window === 'undefined') {
            // 서버 사이드
            if (!this.serverInstance) {
                this.serverInstance = this.createServerInstance();
            }
            return this.serverInstance;
        }
        
        // 클라이언트 사이드
        if (!this.clientInstance) {
            this.clientInstance = this.createClientInstance();
        }
        return this.clientInstance;
    }

    // 인스턴스 초기화 메서드 추가
    public static resetInstance(): void {
        this.clientInstance = null;
        this.serverInstance = null;
    }
}

export const getSupabaseClient = () => {
    return SupabaseService.getInstance();
};

// 인스턴스 초기화 함수도 export
export const resetSupabaseClient = () => {
    SupabaseService.resetInstance();
};

export default getSupabaseClient;