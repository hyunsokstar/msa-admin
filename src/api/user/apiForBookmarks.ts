// C:\Users\terec\msa-admin\src\api\user\apiForBookmarks.ts
import { PersonalBookmark } from "@/types/typeForUser";

export const apiForGetPersonalBookmarks = async () => {
    try {
        const response = await fetch('/api/personal-bookmarks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch personal bookmarks');
        }

        const responseData: PersonalBookmark = await response.json();
        console.log('Bookmarks response data:', responseData);

        return responseData;

    } catch (error) {
        console.error('Error in apiForGetPersonalBookmarks:', error);
        throw error;
    }
};

export const apiForCreatePersonalBookmark = async (data: Omit<PersonalBookmark, 'id' | 'created_at' | 'user_id'>) => {
    try {
        const response = await fetch('/api/personal-bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create bookmark');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForCreatePersonalBookmark:', error);
        throw error;
    }
};

export const apiForUpdatePersonalBookmark = async (id: string, data: Partial<PersonalBookmark>) => {
    try {
        const response = await fetch(`/api/personal-bookmarks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update bookmark');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForUpdatePersonalBookmark:', error);
        throw error;
    }
};

export const apiForDeletePersonalBookmark = async (id: string) => {
    try {
        const response = await fetch(`/api/personal-bookmarks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete bookmark');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForDeletePersonalBookmark:', error);
        throw error;
    }
};

export const apiForDeleteMultipleBookmarks = async (ids: string[]) => {
    try {
        const response = await fetch('/api/personal-bookmarks/bulk-delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete bookmarks');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForDeleteMultipleBookmarks:', error);
        throw error;
    }
};

