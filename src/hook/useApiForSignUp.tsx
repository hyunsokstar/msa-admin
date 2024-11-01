// src/hooks/useApiForSignUp.ts (Custom Hook)
import { useMutation } from '@tanstack/react-query';
import { AuthCredentials, AuthApiResponse, AuthApiError } from '@/types/typeForAuth';
import { apiForSignUpUser } from '@/api/apiForAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { z } from 'zod';

const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUp = () => {
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});

    const signUpMutation = useMutation({
        mutationFn: async (credentials: AuthCredentials) => {
            const result = await apiForSignUpUser(credentials);
            return result;
        },
        onSuccess: () => {
            toast.success('Sign up successful! Please check your email for verification.');
            router.push('/auth/verify-email');
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
                const errors = Object.fromEntries(
                    error.errors.map((err) => [err.path[0], err.message])
                );
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