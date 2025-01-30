import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import getSupabaseClient from '@/lib/supabase/browserClient';

export function useCommonChattings() {
    const queryClient = useQueryClient();
    const supabase = getSupabaseClient();

    useEffect(() => {
        // Supabase realtime subscription
        const channel = supabase
            .channel('common_chattings_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'common_chattings'
                },
                (payload) => {
                    // Invalidate and refetch when there's a change
                    queryClient.invalidateQueries({
                        queryKey: ['commonChattings']
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient, supabase]);
}