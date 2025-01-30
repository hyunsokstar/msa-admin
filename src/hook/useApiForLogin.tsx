import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IUser } from '@/types/typeForUser';

interface LoginCredentials {
    email: string;
    password: string;
}

export const useApiForLogin = () => {
    const supabase = createClientComponentClient();
    const setAuth = useUserStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async ({ email, password }: LoginCredentials) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // 사용자 추가 정보 가져오기
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (userError) throw userError;

            // IUser 타입에 맞게 데이터 매핑
            const userWithCustomData: IUser = {
                id: data.user.id,
                email: data.user.email,
                full_name: userData.full_name || '',
                profile_image_url: userData.profile_image_url || null,
                phone_number: userData.phone_number || null,
                created_at: userData.created_at || new Date().toISOString(),
                updated_at: userData.updated_at || new Date().toISOString(),
                is_admin: userData.is_admin || false,
                organization_id: userData.organization_id || null,
                status: userData.status || 'offline'
            };

            // 상태 업데이트
            setAuth(userWithCustomData, data.session);

            return data;
        },
        onError: (error) => {
            console.error('Login error:', error);
            throw error;
        }
    });
};