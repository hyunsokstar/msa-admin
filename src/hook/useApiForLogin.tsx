import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError } from '@/types/typeForAuth';
import { apiForLoginUser, apiForLogoutUser } from '@/api/apiForAuth';
import { toast } from 'react-toastify';
import {useUserStore} from '@/store/useUserStore';
import { IUser } from '@/types/typeForUser';

export const useApiForLogin = (): UseMutationResult<AuthApiResponse, AuthApiError, AuthCredentials> => {
    const setAuth = useUserStore((state) => state.setAuth);

    return useMutation({
        mutationFn: apiForLoginUser,
        onSuccess: (data) => {
            console.log("로그인 응답 데이터 data : ", data);

            if (data.user && data.session) {
                const extendedUser: IUser = {
                    ...data.user,
                    is_admin: data.isAdmin ?? false,
                    email: data.user.email ?? null,
                };

                setAuth(extendedUser, data.session);
                toast.success('로그인 성공!');
            }
            return data;
        },
        onError: (error: AuthApiError) => {
            const errorMessage = error.message || '로그인 중 오류가 발생했습니다';
            toast.error(`로그인 실패: ${errorMessage}`);
            throw error;
        },
    });
};
