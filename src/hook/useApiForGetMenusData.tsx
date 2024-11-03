// src/hooks/useApiForGetMenusData.ts
import apiForGetMenusData, { MenuItemType } from '@/api/apiForMenu';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useApiForGetMenusData = () => {
    return useQuery({
        queryKey: ['menusData'],
        queryFn: async (): Promise<MenuItemType[]> => {
            try {
                const data = await apiForGetMenusData();
                if (!data) {
                    throw new Error('No data found');
                }
                toast.success('Menus data loaded successfully');
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching menu data';
                toast.error(`Failed to load menus data: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export default useApiForGetMenusData;
