// src/hooks/useApiForGetMenusData.ts
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
                toast.success('Menus data loaded successfully');
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
    });
};

export default useApiForGetMenusData;