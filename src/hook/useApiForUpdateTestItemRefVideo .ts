// src/hooks/useApiForUpdateTestItemRefVideo.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateTestItemRefVideo } from '@/api/apiForTestItems';
import { TestItem } from '@/types/typeForTestTarget';

/**
 * Custom hook to update a test item's reference video using React Query
 * @returns Object containing mutation state and update function
 */
export const useApiForUpdateTestItemRefVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ itemId, videoUrl }: { 
            itemId: string, 
            videoUrl: string
        }) => {
            const result = await apiForUpdateTestItemRefVideo(itemId, videoUrl);
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            if (!result.data) {
                throw new Error('No data returned from server');
            }
            
            return result.data;
        },
        onSuccess: (updatedItem) => {
            console.log('Successfully updated video:', updatedItem);
            
            toast.success("동영상이 업데이트되었습니다", {
                position: "top-right",
                autoClose: 3000
            });
            
            // 더 일반적인 무효화 접근법 (ID 문제 해결)
            queryClient.invalidateQueries({ 
                queryKey: ['testItems']
            });
            
            queryClient.invalidateQueries({ 
                queryKey: ['testTarget']
            });
        },
        onError: (error) => {
            toast.error(`동영상 업데이트 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`, {
                position: "top-right",
                autoClose: 5000
            });
            console.error('Error details:', error);
        }
    });
};