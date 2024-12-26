// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// class SupabaseService {
//     private static instance: SupabaseClient | null = null;
    
//     public static getInstance(): SupabaseClient {
//         if (!SupabaseService.instance) {
//             const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//             const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            
//             if (!supabaseUrl || !supabaseKey) {
//                 throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
//             }
            
//             SupabaseService.instance = createClient(supabaseUrl, supabaseKey, {
//                 auth: {
//                     persistSession: true,
//                     autoRefreshToken: true,
//                     storageKey: 'app-supabase-auth',
//                     storage: typeof window !== 'undefined' ? window.localStorage : undefined
//                 },
//                 global: {
//                     headers: {
//                         'x-application-name': 'your-app-name'
//                     }
//                 }
//             });
//         }
        
//         return SupabaseService.instance;
//     }
// }

// export function getSupabase(): SupabaseClient {
//     return SupabaseService.getInstance();
// }

// export default getSupabase;
import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
    private static instance: SupabaseClient | null = null;
    
    public static getInstance(): SupabaseClient {
        if (typeof window === 'undefined') return {} as SupabaseClient; // SSR 체크

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
                    storage: window.localStorage
                },
                global: {
                    headers: {
                        'x-application-name': 'your-app-name'
                    }
                }
            });
        }
        
        return SupabaseService.instance;
    }
}

export const getSupabase = () => {
    if (typeof window === 'undefined') return null;
    return SupabaseService.getInstance();
};

export default getSupabase;