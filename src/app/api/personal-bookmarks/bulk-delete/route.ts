// ===== 3. 벌크 삭제 라우트 파일 =====
// C:\Users\terec\msa-admin\src\app\api\personal-bookmarks\bulk-delete\route.ts

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// DELETE - 다중 즐겨찾기 삭제
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Invalid or empty ids array' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('user_bookmarks')
            .delete()
            .in('id', ids)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.error('Error bulk deleting bookmarks:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            message: `${data.length} bookmarks deleted successfully`,
            deletedCount: data.length,
            data
        }, { status: 200 });

    } catch (error) {
        console.error('Server error in DELETE /api/personal-bookmarks/bulk-delete:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ===== 4. 수정된 API 함수 =====
// C:\Users\terec\msa-admin\src\api\user\apiForBookmarks.ts

import {
    PersonalBookmark,
    PersonalBookmarksResponse,
    CreatePersonalBookmarkDto,
    UpdatePersonalBookmarkDto
} from "@/types/typeForBookMark";

export const apiForGetPersonalBookmarks = async (): Promise<PersonalBookmarksResponse> => {
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

        const responseData: PersonalBookmarksResponse = await response.json();
        console.log('Bookmarks response data:', responseData);

        return responseData;

    } catch (error) {
        console.error('Error in apiForGetPersonalBookmarks:', error);
        throw error;
    }
};

export const apiForCreatePersonalBookmark = async (data: CreatePersonalBookmarkDto) => {
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

export const apiForUpdatePersonalBookmark = async (id: string, data: UpdatePersonalBookmarkDto) => {
    try {
        const response = await fetch(`/api/personal-bookmarks/${id}`, { // ← 올바른 URL
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
        const response = await fetch(`/api/personal-bookmarks/${id}`, { // ← 올바른 URL
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
        const response = await fetch('/api/personal-bookmarks/bulk-delete', { // ← 올바른 URL
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