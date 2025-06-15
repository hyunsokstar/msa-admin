// C:\Users\terec\msa-admin\src\hook\user\useApiForPersonalBookmarks.tsx
// C:\Users\terec\msa-admin\src\hook\user\useApiForPersonalBookmarks.tsx

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    apiForGetPersonalBookmarks,
    apiForCreatePersonalBookmark,
    apiForUpdatePersonalBookmark,
    apiForDeletePersonalBookmark,
    apiForDeleteMultipleBookmarks
} from '@/api/user/apiForBookmarks';
import {
    PersonalBookmarksResponse,
    CreatePersonalBookmarkDto,
    UpdatePersonalBookmarkDto
} from '@/types/typeForBookMark';

// 조회용 훅
export const useApiForPersonalBookmarks = () => {
    return useQuery<PersonalBookmarksResponse, Error>({
        queryKey: ['personalBookmarks'],
        queryFn: apiForGetPersonalBookmarks,
        staleTime: 30000, // 30초
        gcTime: 300000,   // 5분
    });
};

// 생성용 훅
export const useCreatePersonalBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiForCreatePersonalBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalBookmarks'] });
        },
        onError: (error) => {
            console.error('Failed to create bookmark:', error);
        },
    });
};

// 수정용 훅
export const useUpdatePersonalBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePersonalBookmarkDto }) =>
            apiForUpdatePersonalBookmark(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalBookmarks'] });
        },
        onError: (error) => {
            console.error('Failed to update bookmark:', error);
        },
    });
};

// 단일 삭제용 훅
export const useDeletePersonalBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiForDeletePersonalBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalBookmarks'] });
        },
        onError: (error) => {
            console.error('Failed to delete bookmark:', error);
        },
    });
};

// 다중 삭제용 훅
export const useDeleteMultipleBookmarks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiForDeleteMultipleBookmarks,
        onSuccess: (data) => {
            console.log(`${data.deletedCount} bookmarks deleted successfully`);
            queryClient.invalidateQueries({ queryKey: ['personalBookmarks'] });
        },
        onError: (error) => {
            console.error('Failed to delete bookmarks:', error);
        },
    });
};