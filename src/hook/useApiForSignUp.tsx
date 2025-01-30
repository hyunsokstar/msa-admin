// src/hooks/useApiForSignUp.ts
import { useMutation } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError, SignUpFormData, ValidationErrors, signUpSchema } from '@/types/typeForAuth';
import { apiForSignUpUser } from '@/api/apiForAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { z } from 'zod';

export const useSignUp = () => {
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const signUpMutation = useMutation<
        AuthApiResponse,
        AuthApiError,
        AuthCredentials
    >({
        mutationFn: async (credentials: AuthCredentials) => {
            const result = await apiForSignUpUser(credentials);
            return result;
        },
        onSuccess: () => {
            toast.success('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
            // router.push('/auth/verify-email');
        },
        onError: (error: AuthApiError) => {
            let errorMessage = '회원가입 중 오류가 발생했습니다.';

            // Supabase 에러 메시지 처리
            if (error.message) {
                switch (error.message) {
                    case 'User already registered':
                        errorMessage = '이미 등록된 이메일 주소입니다.';
                        break;
                    case 'Password should be at least 6 characters':
                        errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
                        break;
                    default:
                        errorMessage = error.message;
                }
            }

            toast.error(errorMessage);
        },
    });

    const validateForm = (data: SignUpFormData): boolean => {
        try {
            signUpSchema.parse(data);
            setValidationErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.errors.reduce((acc, err) => ({
                    ...acc,
                    [err.path[0]]: err.message
                }), {} as ValidationErrors);
                setValidationErrors(errors);
            }
            return false;
        }
    };

    return {
        signUp: signUpMutation.mutateAsync,
        isLoading: signUpMutation.isPending,
        validationErrors,
        validateForm,
    };
};