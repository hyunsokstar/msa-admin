// src/hooks/useApiForDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchApiSpecs, fetchApiStats, ApiSpec } from '@/api/apiForApiSpec';

export const useApiForDashboard = () => {
    return useQuery({
        queryKey: ['apiSpecs', 'dashboard'],
        queryFn: async () => {
            try {
                const [specs, stats] = await Promise.all([
                    fetchApiSpecs(),
                    fetchApiStats()
                ]);

                if (!specs || !stats) {
                    throw new Error('Failed to fetch API specifications');
                }

                return { specs, stats };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching API data';
                toast.error(`Failed to load API data: ${errorMessage}`);
                throw error;
            }
        }
    });
};


