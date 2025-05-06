// C:\Users\terec\msa-admin\src\hook\useApiForCommentsForTestItem.ts

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    apiForGetCommentListForTestItem,
    Comment
} from '@/api/apiForCommentListForTestItem';

export const useApiForCommentsForTestItem = (testItemId: string) => {
    return useQuery<Comment[], Error>({
        queryKey: ['commentsForTestItem', testItemId],
        queryFn: async () => {
            const res = await apiForGetCommentListForTestItem(testItemId);

            if (res.error) {
                toast.error(`댓글 조회 실패: ${res.error}`);
                throw new Error(res.error);
            }

            return res.data || [];
        },
        enabled: !!testItemId,
    });
};
