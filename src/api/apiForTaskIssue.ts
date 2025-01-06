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
    createIssue : async (issueData: CreateIssueDto): Promise<Issue> => {
    try {
        const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create issue');
        }

        const { data } = await response.json();
        return data as Issue;
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(`Failed to create issue: ${error.message}`);
        }
        throw new Error('Failed to create issue');
    }
    },

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

    updateIssue: async (
    id: number,
    updateData: UpdateIssueDto
    ): Promise<Issue> => {
    const response = await fetch(`/api/issues/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    });

    console.log("response : ", response);
    

    if (!response.ok) {
        const errorBody = await response.json();
        console.error("Failed to update issue:", errorBody.error);
        throw new Error(errorBody.error || "Failed to update issue");
    }

    const { data } = await response.json();
    return data as Issue;
    },

    deleteIssue: async (id: number): Promise<void> => {
        try {
        const response = await fetch(`/api/issues/${id}?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete issue');
        }
        } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete issue: ${error.message}`);
        }
        throw new Error('Failed to delete issue');
        }
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