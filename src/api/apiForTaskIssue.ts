import getSupabase from '@/lib/supabaseClient';
import { Issue, CreateIssueDto, UpdateIssueDto, IssueFilter } from '@/types/typeForTaskIssue';

interface ApiForTaskIssue {
    getAllIssues: (filter?: IssueFilter) => Promise<Issue[]>;
    getIssueById: (id: number) => Promise<Issue>;
    createIssue: (issueData: CreateIssueDto) => Promise<Issue>;
    updateIssue: (id: number, updateData: UpdateIssueDto) => Promise<Issue>;
    deleteIssue: (id: number) => Promise<void>;
}

const apiForTaskIssue: ApiForTaskIssue = {

    getAllIssues: async (filter?: IssueFilter): Promise<Issue[]> => {
        const supabase = getSupabase();
        if (!supabase) {
        throw new Error('Supabase client is not initialized');
        }

        let query = supabase.from('issues').select('*, manager:users(email)');

        // 필터가 있다면 해당 조건들을 적용
        if (filter) {
        if (filter.status && filter.status !== 'All') query = query.eq('status', filter.status);
        if (filter.priority && filter.priority !== 'All') query = query.eq('priority', filter.priority);
        if (filter.category1 && filter.category1 !== 'All') query = query.eq('category1', filter.category1);
        if (filter.type && filter.type !== 'All') query = query.eq('type', filter.type);
        if (filter.keyword && filter.keyword.trim() !== '') {
            query = query.ilike('title', `%${filter.keyword}%`);
        }
        }        

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data as Issue[];
    },

    getIssueById: async (id: number): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('issues')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Issue;
    },

    createIssue: async (issueData: CreateIssueDto): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('issues')
            .insert([issueData])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Issue;
    },

    updateIssue: async (id: number, updateData: UpdateIssueDto): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { data, error } = await supabase
            .from('issues')
            .update({ ...updateData, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Issue;
    },

    deleteIssue: async (id: number): Promise<void> => {
        console.log("이슈 삭세 id check : ", id);
        

        const supabase = getSupabase();
        if (!supabase) {
            throw new Error('Supabase client is not initialized');
        }

        const { error } = await supabase
            .from('issues')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
    }
};

export default apiForTaskIssue;
