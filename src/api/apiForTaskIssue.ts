import getSupabase from '@/lib/supabaseClient';
import { Issue, CreateIssueDto, UpdateIssueDto, IssueFilter } from '@/types/typeForTaskIssue';

interface ApiForTaskIssue {
    getAllIssues: (filter?: IssueFilter, limit?: number, offset?: number) => Promise<{
        issues: Issue[];
        totalCompleted: number;
        totalIncomplete: number;
        totalIssues: number;
    }>;    
    getIssueById: (id: number) => Promise<Issue>;
    createIssue: (issueData: CreateIssueDto) => Promise<Issue>;
    updateIssue: (id: number, updateData: UpdateIssueDto) => Promise<Issue>;
    deleteIssue: (id: number) => Promise<void>;
    getMyIssues: (userId: string, filter?: IssueFilter, limit?: number, offset?: number) => Promise<{
        issues: Issue[];
        totalCompleted: number;
        totalIncomplete: number;
        totalIssues: number;
    }>;
}

const apiForTaskIssue: ApiForTaskIssue = {
    // getAllIssues: async (filter?: IssueFilter, limit = 10, offset = 0) => {
    //     const supabase = getSupabase();
    //     if (!supabase) throw new Error('Supabase client is not initialized');

    //     // 메인 데이터 쿼리 준비
    //     let mainQuery = supabase
    //         .from('issues')
    //         .select(`
    //             *,
    //             manager_user:users!fk_issues_manager(id, email),
    //             executor_user:users!issues_executor_fkey(id, email)
    //         `, { count: 'exact' });  // count 옵션 추가

    //     // 필터 조건 적용
    //     if (filter) {
    //         if (filter.status && filter.status !== 'All') mainQuery = mainQuery.eq('status', filter.status);
    //         if (filter.priority && filter.priority !== 'All') mainQuery = mainQuery.eq('priority', filter.priority);
    //         if (filter.category1 && filter.category1 !== 'All') mainQuery = mainQuery.eq('category1', filter.category1);
    //         if (filter.type && filter.type !== 'All') mainQuery = mainQuery.eq('type', filter.type);
    //         if (filter.keyword && filter.keyword.trim() !== '') {
    //             mainQuery = mainQuery.ilike('title', `%${filter.keyword}%`);
    //         }
    //         if (filter.executor && filter.executor.trim() !== '') mainQuery = mainQuery.eq('executor', filter.executor);
    //     }

    //     // 페이징 적용
    //     mainQuery = mainQuery
    //         .range(offset, offset + limit - 1)
    //         .order('created_at', { ascending: false });

    //     try {
    //         const { data, error, count } = await mainQuery;
    //         if (error) throw new Error(error.message);

    //         // 완료/미완료 이슈 카운트는 데이터에서 직접 계산
    //         const totalCompleted = data?.filter(issue => issue.status === 'Closed').length || 0;
    //         const totalIncomplete = data?.filter(issue => issue.status !== 'Closed').length || 0;

    //         return {
    //             issues: data || [],
    //             totalCompleted,
    //             totalIncomplete,
    //             totalIssues: count || 0  // count 값 사용
    //         };
    //     } catch (error) {
    //         console.error('Error fetching issues:', error);
    //         throw error;
    //     }
    // },

    getAllIssues: async (filter?: IssueFilter, limit = 10, offset = 0) => {
        try {
            // URL 파라미터 구성
            const params = new URLSearchParams({
                limit: limit.toString(),
                offset: offset.toString()
            });
            
            if (filter) {
                params.append('filter', JSON.stringify(filter));
            }

            // API 요청
            const response = await fetch(`/api/issues?${params}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch issues');
            }

            const data = await response.json();
            
            return {
                issues: data.issues,
                totalCompleted: data.totalCompleted,
                totalIncomplete: data.totalIncomplete,
                totalIssues: data.totalIssues
            };

        } catch (error) {
            console.error('Error fetching issues:', error);
            throw error;
        }
    },

    getIssueById: async (id: number): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) throw new Error('Supabase client is not initialized');

        const { data, error } = await supabase
            .from('issues')
            .select(`
                *,
                manager_user:users!fk_issues_manager(id, email),
                executor_user:users!issues_executor_fkey(id, email)
            `)
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        return data as Issue;
    },

    createIssue: async (issueData: CreateIssueDto): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) throw new Error('Supabase client is not initialized');

        const { data, error } = await supabase
            .from('issues')
            .insert([issueData])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as Issue;
    },

    updateIssue: async (id: number, updateData: UpdateIssueDto): Promise<Issue> => {
        const supabase = getSupabase();
        if (!supabase) throw new Error('Supabase client is not initialized');

        const { data, error } = await supabase
            .from('issues')
            .update({ ...updateData, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as Issue;
    },

    deleteIssue: async (id: number): Promise<void> => {
        const supabase = getSupabase();
        if (!supabase) throw new Error('Supabase client is not initialized');

        const { error } = await supabase
            .from('issues')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    },

    getMyIssues: async (userId: string, filter?: IssueFilter, limit = 10, offset = 0) => {
        const supabase = getSupabase();
        if (!supabase) throw new Error('Supabase client is not initialized');

        let query = supabase
            .from('issues')
            .select(`
                *,
                manager_user:users!fk_issues_manager(id, email),
                executor_user:users!issues_executor_fkey(id, email)
            `, { count: 'exact' })
            .eq('executor', userId);

        // 필터 적용
        if (filter) {
            if (filter.status && filter.status !== 'All') query = query.eq('status', filter.status);
            if (filter.priority && filter.priority !== 'All') query = query.eq('priority', filter.priority);
            if (filter.category1 && filter.category1 !== 'All') query = query.eq('category1', filter.category1);
            if (filter.type && filter.type !== 'All') query = query.eq('type', filter.type);
            if (filter.keyword && filter.keyword.trim() !== '') {
                query = query.ilike('title', `%${filter.keyword}%`);
            }
        }

        // 페이징 적용
        query = query
            .range(offset, offset + limit - 1)
            .order('created_at', { ascending: false });

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        const totalCompleted = data?.filter(issue => issue.status === 'Closed').length || 0;
        const totalIncomplete = (data?.length || 0) - totalCompleted;

        return {
            issues: data || [],
            totalCompleted,
            totalIncomplete,
            totalIssues: count || 0
        };
    }

};

export default apiForTaskIssue;