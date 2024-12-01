// src/hooks/useApiForSignUp.ts
import { useMutation } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError } from '@/types/typeForAuth';
import { apiForSignUpUser } from '@/api/apiForAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { z } from 'zod';

// 유효성 검사 스키마 정의
const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// 타입 정의
export type SignUpFormData = z.infer<typeof signUpSchema>;

// 유효성 검사 에러 타입 명시적 정의
export type ValidationErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const useSignUp = () => {
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const signUpMutation = useMutation({
        mutationFn: async (credentials: AuthCredentials) => {
            const result = await apiForSignUpUser(credentials);
            return result;
        },
        onSuccess: () => {
            toast.success('Sign up successful! Please check your email for verification.');
            // router.push('/auth/verify-email');
        },
        onError: (error: AuthApiError) => {
            toast.error(error.message);
        },
    });

    const validateForm = (data: SignUpFormData) => {
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
