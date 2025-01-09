// src/hooks/useApiForOrganizationAndUsers.ts
import { getOrganizationsWithUsers } from '@/api/apiForOrganizations';
import { useQuery } from '@tanstack/react-query';

export const useApiForOrganizationAndUsers = () => {
    return useQuery({
        queryKey: ['organizationsWithUsers'],
        queryFn: () => getOrganizationsWithUsers(),
        staleTime: 5000,
        placeholderData: (previousData) => previousData
    });
};