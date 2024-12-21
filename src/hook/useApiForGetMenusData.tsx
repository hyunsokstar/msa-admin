// // src/hooks/useApiForGetMenusData.ts
// import { useQuery } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { useMenuStore } from '@/store/useMenuStore';
// import apiForGetMenusData, { MenuItemType } from '@/api/apiForMenu';

// export const useApiForGetMenusData = () => {
//     const { setMenus, setLoading, setError } = useMenuStore();

//     return useQuery({
//         queryKey: ['menusData'],
//         queryFn: async (): Promise<MenuItemType[]> => {
//             setLoading(true);
//             try {
//                 const data = await apiForGetMenusData();
//                 if (!data) {
//                     throw new Error('No data found');
//                 }
//                 setMenus(data);
//                 setError(null);
//                 // toast.success('Menus data loaded successfully');
//                 return data;
//             } catch (error) {
//                 const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching menu data';
//                 setError(error instanceof Error ? error : new Error(errorMessage));
//                 toast.error(`Failed to load menus data: ${errorMessage}`);
//                 throw error;
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });
// };

// export default useApiForGetMenusData;

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useMenuStore } from '@/store/useMenuStore';
import apiForGetMenusData, { MenuItemType } from '@/api/apiForMenu';

export const useApiForGetMenusData = () => {
    const { setMenus, setLoading, setError } = useMenuStore();

    return useQuery({
        queryKey: ['menusData'],
        queryFn: async (): Promise<MenuItemType[]> => {
            setLoading(true);
            try {
                const data = await apiForGetMenusData();
                if (!data) {
                    throw new Error('No data found');
                }
                setMenus(data);
                setError(null);
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching menu data';
                setError(error instanceof Error ? error : new Error(errorMessage));
                toast.error(`Failed to load menus data: ${errorMessage}`);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        // 캐시 관련 설정
        staleTime: 0, // 데이터를 항상 stale로 간주
        refetchOnMount: 'always', // 컴포넌트 마운트마다 새로 가져오기
        refetchOnWindowFocus: true, // 윈도우 포커스시 새로 가져오기
        retry: 2, // 실패시 2번 재시도
    });
};

export default useApiForGetMenusData;