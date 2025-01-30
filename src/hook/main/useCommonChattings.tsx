// hooks/main/useCommonChattings.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import getSupabaseClient from '@/lib/supabase/browserClient';

export function useCommonChattings() {
    const queryClient = useQueryClient();
    const supabase = getSupabaseClient();

    useEffect(() => {
        const channel = supabase
            .channel('public:common_chattings')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'common_chattings',
                },
                (payload) => {
                    // 변경 사항에 따라 즉시 쿼리 무효화
                    queryClient.invalidateQueries({
                        queryKey: ['commonChattings']
                    });
                }
            )
            .subscribe((status) => {
                if (status !== 'SUBSCRIBED') {
                    console.warn('Realtime subscription failed:', status);
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, [queryClient, supabase]);
}