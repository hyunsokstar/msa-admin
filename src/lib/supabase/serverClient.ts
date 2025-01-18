// lib/supabase/serverClient.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

class SupabaseServerService {
   private static authInstance: any = null;
   private static serviceInstance: any = null;

   public static getAuthInstance() {
       if (!this.authInstance) {
           this.authInstance = createRouteHandlerClient({ cookies });
       }
       return this.authInstance;
   }

   public static getServiceInstance() {
       if (!this.serviceInstance) {
           const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
           const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
           
           this.serviceInstance = createClient(supabaseUrl, serviceKey, {
               auth: { 
                   persistSession: false,
                   autoRefreshToken: false
               }
           });
       }
       return this.serviceInstance;
   }

   public static reset() {
       this.authInstance = null;
       this.serviceInstance = null;
   }
}

export const getSupabaseAuth = () => {
   return SupabaseServerService.getAuthInstance();
};

export const getSupabaseService = () => {
   return SupabaseServerService.getServiceInstance();
};

export const resetSupabase = () => {
   SupabaseServerService.reset();
};