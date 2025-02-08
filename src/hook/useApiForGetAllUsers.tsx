// hooks/useApiForGetAllUsers.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUser, UserFilter } from '@/types/typeForUser';
import { getAllUsers } from '@/api/apiForUser';
import getSupabase from '@/lib/supabase/browserClient';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export const useApiForGetAllUsers = (filter?: UserFilter) => {
    const queryClient = useQueryClient();
    const supabase = getSupabase();

    useEffect(() => {
        const subscription: RealtimeChannel = supabase
            .channel('users_changes')
            // 이벤트 옵션을 '*'로 변경하여 모든 변경 이벤트(INSERT, UPDATE, DELETE 등)를 수신합니다.
            .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload: RealtimePostgresChangesPayload<any>) => {
                console.log('실시간 업데이트:', payload);
                // 캐시된 데이터 업데이트
                queryClient.invalidateQueries({ queryKey: ['users'] });
            })
            .subscribe();

        // Clean up
        return () => {
            subscription?.unsubscribe();
        };
    }, [queryClient, supabase]);

    return useQuery<IUser[], Error>({
        queryKey: ['users', filter],
        queryFn: async () => {
            try {
                const data = await getAllUsers(filter);
                if (!data) {
                    throw new Error('사용자 데이터를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '사용자 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        // refetchInterval 제거 (실시간 구독으로 대체)
    });
};
