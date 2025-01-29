// hooks/task/useTaskChattings.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TaskChat } from '@/types/task/typeForTaskDetail';
import getSupabaseClient from '@/lib/supabase/browserClient';

export function useTaskChattings(taskId: string | undefined) {
    const queryClient = useQueryClient();
    const supabase = getSupabaseClient();

    useEffect(() => {
        if (!taskId) return;

        // Supabase realtime subscription
        const channel = supabase
            .channel(`task_chattings:${taskId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'task_chattings',
                    filter: `task_id=eq.${taskId}`
                },
                (payload) => {
                    // Invalidate and refetch when there's a change
                    queryClient.invalidateQueries({
                        queryKey: ['taskDetail', taskId]
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [taskId, queryClient, supabase]);
}