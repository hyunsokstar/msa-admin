// src/api/apiForUserList.ts
import { IOrganization } from '@/types/typeForOrganization';

export const getOrganizationsWithUsers = async (): Promise<IOrganization[]> => {
    try {
        const response = await fetch('/api/organizations');
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.error('Failed to fetch organizations:', error);
        throw new Error(`Failed to fetch organizations: ${error.message}`);
    }
};