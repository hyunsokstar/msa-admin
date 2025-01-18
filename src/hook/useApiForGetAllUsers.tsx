// src/hooks/useApiForUserList.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IUser, CreateUserDto, UpdateUserDto, UserFilter } from '@/types/typeForUser';
import apiForUserList, { getAllUsers } from '@/api/apiForUser';

export const useApiForGetAllUsers = (filter?: UserFilter) => {
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
                const errorMessage = error instanceof Error ? error.message : '사용자 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export const useApiForGetUser = (id: string) => {
    return useQuery<IUser, Error>({
        queryKey: ['user', id],
        queryFn: async () => {
            try {
                const data = await apiForUserList.getUserById(id);
                if (!data) {
                    throw new Error('사용자를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '사용자 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export const useApiForCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: CreateUserDto) => apiForUserList.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('사용자가 생성되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(`사용자 생성 실패: ${error.message}`);
        },
    });
};

export const useApiForUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updateData }: { id: string; updateData: UpdateUserDto }) =>
            apiForUserList.updateUser(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('사용자 정보가 업데이트되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(`사용자 정보 업데이트 실패: ${error.message}`);
        },
    });
};

export const useApiForDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiForUserList.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('사용자가 삭제되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(`사용자 삭제 실패: ${error.message}`);
        },
    });
};

export const useApiForGetOnlineUsers = () => {
    return useQuery<IUser[], Error>({
        queryKey: ['onlineUsers'],
        queryFn: async () => {
            try {
                const data = await apiForUserList.getOnlineUsers();
                if (!data) {
                    throw new Error('온라인 사용자 데이터를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '온라인 사용자 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        refetchInterval: 10000, // 10초마다 자동 갱신
    });
};