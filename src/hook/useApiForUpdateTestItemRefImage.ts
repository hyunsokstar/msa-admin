// src/hooks/useApiForUpdateTestItemRefImage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateTestItemRefImage } from '@/api/apiForTestItems';
import { TestItem } from '@/types/typeForTestTarget';

/**
 * Custom hook to update a test item's reference image using React Query
 * @returns Object containing mutation state and update function
 */
export const useApiForUpdateTestItemRefImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ itemId, imageUrl, targetId }: { 
            itemId: string, 
            imageUrl: string,
            targetId: string 
        }) => {
            const result = await apiForUpdateTestItemRefImage(itemId, imageUrl);
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            // If data is missing, throw an error
            if (!result.data) {
                throw new Error('No data returned from server');
            }
            
            // Return both the updated item and the targetId for onSuccess
            return {
                updatedItem: result.data,
                targetId: targetId
            };
        },
        onSuccess: (data) => {
            // Extract the targetId from the returned data
            const { targetId, updatedItem } = data;
            
            // Log the updated item for debugging
            console.log('Successfully updated item:', updatedItem);
            
            // Show success toast
            toast.success("이미지가 업데이트되었습니다", {
                position: "top-right",
                autoClose: 3000
            });
            
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['testItems'] });
            queryClient.invalidateQueries({ queryKey: ['testTarget'] });
            
            // Optionally, you can also update the cache directly for immediate UI updates
            // This is helpful if your API is slow or you want to avoid a refetch
            queryClient.setQueryData(['testItems', targetId], (oldData: any) => {
                if (!oldData || !oldData.data) return oldData;
                
                // Update the specific item in the data array
                return {
                    ...oldData,
                    data: oldData.data.map((item: TestItem) => 
                        item.id === updatedItem.id ? updatedItem : item
                    )
                };
            });
        },
        onError: (error) => {
            // Show error toast
            toast.error(`이미지 업데이트 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`, {
                position: "top-right",
                autoClose: 5000
            });
            console.error('Error details:', error);
        }
    });
};
