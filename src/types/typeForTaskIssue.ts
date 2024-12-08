// types/typeForTaskIssue.ts
export type IssueStatus = 'All' | 'Open' | 'In Progress' | 'Closed';
export type PriorityLevel = 'All' | 'High' | 'Medium' | 'Low';
export type SystemCategory = 'All' | 'shop' | 'lms' | 'cms' | 'user';
export type IssueType = 'All' | 'Bug' | 'Feature' | 'Enhancement';

interface UserInfo {
    id: string;
    email: string;
}

export interface Issue {
    id: number;
    title: string;
    description?: string;
    status: IssueStatus;
    priority: PriorityLevel;
    manager: string; // UUID
    type: IssueType;
    page_url?: string;
    category1: SystemCategory;
    category2: string;
    ref_img_url1?: string;
    ref_img_url2?: string;
    ref_img_url3?: string;
    created_at: string;
    updated_at: string;
    due_date: string | null;
    executor: string | null; // UUID
    manager_user: UserInfo;
    executor_user: UserInfo | null;
}

export interface CreateIssueDto {
    title: string;
    description?: string;
    priority: PriorityLevel;
    manager: string;
    executor?: string;
    type: IssueType;
    page_url?: string;
    category1: string;
    category2?: string;
    ref_img_url1?: string;
    ref_img_url2?: string;
    ref_img_url3?: string;
    due_date?: string;
}

export interface UpdateIssueDto extends Partial<CreateIssueDto> {
    status?: IssueStatus;
}

export interface IssueFilter {
    status?: IssueStatus;
    priority?: PriorityLevel;
    category1?: SystemCategory;
    category2?: string;
    type?: IssueType;
    keyword?: string;
    executor?: string;
}