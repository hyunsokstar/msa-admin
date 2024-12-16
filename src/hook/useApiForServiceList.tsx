import { fetchServiceApiSpecs } from '@/api/apiForApiSpec';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


// src/hooks/useApiForServiceList.tsx
export const useApiForServiceList = (serviceName: string) => {
    return useQuery({
        queryKey: ['apiSpecs', 'service', serviceName],
        queryFn: async () => {
            try {
                const data = await fetchServiceApiSpecs(serviceName);
                if (!data) {
                    throw new Error(`No API specifications found for ${serviceName}`);
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching service data';
                toast.error(`Failed to load ${serviceName} APIs: ${errorMessage}`);
                throw error;
            }
        },
        enabled: !!serviceName
    });
};