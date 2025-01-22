// // hook/useApiForLogin.tsx
// import { useMutation } from '@tanstack/react-query';
// import { useUserStore } from '@/store/useUserStore';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// interface LoginCredentials {
//     email: string;
//     password: string;
// }

// export const useApiForLogin = () => {
//     const supabase = createClientComponentClient();
//     const setAuth = useUserStore((state) => state.setAuth);

//     return useMutation({
//         mutationFn: async ({ email, password }: LoginCredentials) => {
//             const { data, error } = await supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });

//             if (error) throw error;

//             // 사용자 추가 정보 가져오기
//             const { data: userData, error: userError } = await supabase
//                 .from('users')
//                 .select('*')
//                 .eq('id', data.user.id)
//                 .single();

//             if (userError) throw userError;

//             // 상태 업데이트
//             setAuth(
//                 {
//                     ...data.user,
//                     email: data.user.email || null,
//                     is_admin: userData.is_admin,
//                     profile_image_url: userData.profile_image_url,
//                     full_name: userData.full_name,
//                     phone_number: userData.phone_number
//                 },
//                 data.session
//             );

//             return data;
//         },
//         onError: (error) => {
//             console.error('Login error:', error);
//             throw error;
//         }
//     });
// };

// hook/useApiForLogin.tsx
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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

            setAuth(
                {
                    ...data.user,
                    email: data.user.email || null,
                    is_admin: userData.is_admin,
                    profile_image_url: userData.profile_image_url,
                    full_name: userData.full_name,
                    phone_number: userData.phone_number
                },
                data.session
            );

            return data;
        }
    });
};