// src/hooks/useApiForSignUp.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError } from '@/types/typeForAuth';
import { apiForSignUpUser } from '@/api/apiForAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface UseApiForSignUpOptions {
    onSuccessRedirect?: string;
    requiresEmailConfirmation?: boolean;
}

export const useApiForSignUp = (
    options: UseApiForSignUpOptions = {}
): UseMutationResult<AuthApiResponse, AuthApiError, AuthCredentials> => {
    const router = useRouter();
    const {
        onSuccessRedirect = '/login',
        requiresEmailConfirmation = true
    } = options;

    return useMutation({
        mutationFn: apiForSignUpUser,
        onSuccess: (data) => {
            if (requiresEmailConfirmation) {
                toast.success('Sign-up successful! Please check your email to confirm your account.');
            } else {
                toast.success('Sign-up successful!');
                router.push(onSuccessRedirect);
            }
            return data;
        },
        onError: (error: AuthApiError) => {
            let errorMessage = 'An error occurred during sign-up';

            // Supabase 특정 에러 처리
            if (error.message === 'User already registered') {
                errorMessage = 'This email is already registered. Please try logging in.';
            } else if (error.message.includes('Password')) {
                errorMessage = 'Password must be at least 6 characters long.';
            } else {
                errorMessage = error.message;
            }

            toast.error(`Sign-up failed: ${errorMessage}`);
            throw error;
        },
    });
};

// 사용하기 쉬운 래퍼 훅
export const useApiForAuth = () => {
    const signUpMutation = useApiForSignUp();

    const handleSignUp = async (credentials: AuthCredentials) => {
        try {
            await signUpMutation.mutateAsync(credentials);
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    return {
        signUp: handleSignUp,
        isLoading: signUpMutation.isPending,
        isError: signUpMutation.isError,
        error: signUpMutation.error,
        isSuccess: signUpMutation.isSuccess,
    };
};