// C:\Users\terec\msa-admin\src\hook\useApiForUpdateRefImageForArchivedTestItem.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateArchivedTestItemRefImage } from '@/api/apiForTestItemsArchive';
import { TestItem } from '@/types/typeForTestTarget';

/**
 * Custom hook to update the reference image of an archived test item using React Query
 * @returns Object containing mutation state and update function
 */
export const useApiForUpdateRefImageForArchivedTestItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ itemId, imageUrl }: {
            itemId: string;
            imageUrl: string;
        }) => {
            const result = await apiForUpdateArchivedTestItemRefImage(itemId, imageUrl);

            if (result.error) {
                throw new Error(result.error);
            }

            if (!result.data) {
                throw new Error('No data returned from server');
            }

            return result.data;
        },
        onSuccess: (updatedItem) => {
            // Log the updated item for debugging
            console.log('Successfully updated archived test item:', updatedItem);

            // Show success toast
            toast.success('아카이브된 테스트 항목의 이미지가 업데이트되었습니다.', {
                position: 'top-right',
                autoClose: 3000,
            });

            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['archivedTestItems'] });

            // Optionally update the cache directly for immediate UI updates
            queryClient.setQueryData(['archivedTestItems'], (oldData: any) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: oldData.data.map((item: TestItem) =>
                        item.id === updatedItem.id ? updatedItem : item
                    ),
                };
            });
        },
        onError: (error) => {
            // Show error toast
            toast.error(
                `이미지 업데이트 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'
                }`,
                {
                    position: 'top-right',
                    autoClose: 5000,
                }
            );
            console.error('Error details:', error);
        },
    });
};