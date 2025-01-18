// src/api/apiForUserList.ts
import { deleteUserAction } from '@/app/actions/deleteUser';
import getSupabase from '@/lib/supabase/browserClient';
import { IOrganization } from '@/types/typeForOrganization';
import { IUser, CreateUserDto, UpdateUserDto, UserFilter, UserSelectInfo } from '@/types/typeForUser';

export const getAllUsers = async (filter?: UserFilter): Promise<IUser[]> => {
    try {
        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (filter) {
            Object.entries(filter).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await fetch(`/api/users?${params.toString()}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.error('Failed to fetch users:', error);
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};

interface ApiForUserList {
    // getAllUsers: (filter?: UserFilter) => Promise<IUser[]>;
    getUserById: (id: string) => Promise<IUser>;
    createUser: (userData: CreateUserDto) => Promise<IUser>;
    updateUser: (id: string, updateData: UpdateUserDto) => Promise<IUser>;
    deleteUser: (id: string) => Promise<void>;
    getOnlineUsers: () => Promise<IUser[]>;
    getUsersInfoForSelectBox: () => Promise<UserSelectInfo[]>;

}

const apiForUserList: ApiForUserList = {

    getUserById: async (id: string): Promise<IUser> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as IUser;
    },

    createUser: async (userData: CreateUserDto): Promise<IUser> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as IUser;
    },

    updateUser: async (id: string, updateData: UpdateUserDto): Promise<IUser> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('users')
            .update({ ...updateData, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as IUser;
    },

    deleteUser: async (id: string): Promise<void> => {
    try {
        // Server Action 호출
        await deleteUserAction(id);
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
    }
    },

    getOnlineUsers: async (): Promise<IUser[]> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('is_online', true)
            .order('email');

        if (error) {
            throw new Error(error.message);
        }

        return data as IUser[];
    },

    // apiForUsersInfoForSelectBox
    getUsersInfoForSelectBox: async (): Promise<UserSelectInfo[]> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('users')
            .select('id, email, profile_image_url')
            .order('email');

        if (error) {
            throw new Error(error.message);
        }

        return data as unknown as UserSelectInfo[];
    }


};

export default apiForUserList;