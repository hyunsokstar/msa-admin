// src/api/apiForUserList.ts
import getSupabase from '@/lib/supabaseClient';
import { User, CreateUserDto, UpdateUserDto, UserFilter } from '@/types/typeForUser';

interface ApiForUserList {
    getAllUsers: (filter?: UserFilter) => Promise<User[]>;
    getUserById: (id: string) => Promise<User>;
    createUser: (userData: CreateUserDto) => Promise<User>;
    updateUser: (id: string, updateData: UpdateUserDto) => Promise<User>;
    deleteUser: (id: string) => Promise<void>;
    getOnlineUsers: () => Promise<User[]>;
}

const apiForUserList: ApiForUserList = {
    getAllUsers: async (filter?: UserFilter): Promise<User[]> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        let query = supabase.from('users').select('*');

        if (filter) {
            if (filter.email) {
                query = query.ilike('email', `%${filter.email}%`);
            }
            if (filter.isAdmin !== undefined) {
                query = query.eq('is_admin', filter.isAdmin);
            }
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data as User[];
    },

    getUserById: async (id: string): Promise<User> => {
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

        return data as User;
    },

    createUser: async (userData: CreateUserDto): Promise<User> => {
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

        return data as User;
    },

    updateUser: async (id: string, updateData: UpdateUserDto): Promise<User> => {
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

        return data as User;
    },

    deleteUser: async (id: string): Promise<void> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
    },

    getOnlineUsers: async (): Promise<User[]> => {
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

        return data as User[];
    }
};

export default apiForUserList;