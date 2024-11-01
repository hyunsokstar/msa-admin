// src/hooks/useApiForAuth.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError } from '@/types/typeForAuth';
import { apiForLoginUser } from '@/api/apiForAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface UseApiForLoginOptions {
    onSuccessRedirect?: string;
}

export const useApiForLogin = (
    options: UseApiForLoginOptions = {}
): UseMutationResult<AuthApiResponse, AuthApiError, AuthCredentials> => {
    const router = useRouter();
    const { onSuccessRedirect = '/dashboard' } = options;

    return useMutation({
        mutationFn: apiForLoginUser,
        onSuccess: (data) => {
            toast.success('Login successful! Redirecting to dashboard...');
            router.push(onSuccessRedirect);

            // 추가적인 성공 처리 (예: 전역 상태 업데이트)
            return data;
        },
        onError: (error: AuthApiError) => {
            const errorMessage = error.message || 'An error occurred during login';
            toast.error(`Login failed: ${errorMessage}`);

            // 추가적인 에러 처리
            throw error;
        },
    });
};
