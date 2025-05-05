// src/api/apiForTestItems.ts
import { TestItem } from '@/types/typeForTestTarget';

// Define response types
type ApiResponse<T> = {
    data?: T;
    error?: string;
};

/**
 * Updates the reference image for a specific test item
 * @param itemId - The ID of the test item to update
 * @param imageUrl - The URL of the new reference image
 * @returns A promise that resolves to the updated test item or an error
 */
export const apiForUpdateTestItemRefImage = async (
    itemId: string, 
    imageUrl: string
): Promise<ApiResponse<TestItem>> => {
    try {
        const response = await fetch(`/api/test-items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ref_image: imageUrl
            }),
        });

        // Log the response details for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Try to get the text response first to see what's coming back
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        let result: ApiResponse<TestItem>;
        // Only try to parse as JSON if there's actual content
        if (responseText) {
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw new Error(`Failed to parse response as JSON: ${responseText.substring(0, 100)}...`);
            }
        } else {
            throw new Error('Empty response received from server');
        }

        if (!response.ok) {
            // If the server response was not ok, throw an error with the server's message
            throw new Error(result?.error || `Error: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('Error updating test item image:', error);
        return {
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
};

/**
 * Updates the reference video for a specific test item
 * @param itemId - The ID of the test item to update
 * @param videoUrl - The URL of the new reference video
 * @returns A promise that resolves to the updated test item or an error
 */
export const apiForUpdateTestItemRefVideo = async (
    itemId: string, 
    videoUrl: string
): Promise<ApiResponse<TestItem>> => {
    try {
        const response = await fetch(`/api/test-items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ref_video: videoUrl
            }),
        });

        // Log the response details for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Try to get the text response first to see what's coming back
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        let result: ApiResponse<TestItem>;
        // Only try to parse as JSON if there's actual content
        if (responseText) {
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw new Error(`Failed to parse response as JSON: ${responseText.substring(0, 100)}...`);
            }
        } else {
            throw new Error('Empty response received from server');
        }

        if (!response.ok) {
            // If the server response was not ok, throw an error with the server's message
            throw new Error(result?.error || `Error: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('Error updating test item video:', error);
        return {
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
};