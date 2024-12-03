// src/types/typeForTaskIssue.ts

export type IssueStatus = 'All' | 'Open' | 'In Progress' | 'Closed';
export type PriorityLevel = 'All' |'High' | 'Medium' | 'Low';
export type SystemCategory = 'All' |'shop' | 'lms' | 'cms' | 'user';
export type IssueType = 'All' |'Bug' | 'Feature' | 'Enhancement';

interface IssueManager {
    email: string;
}

export interface Issue {
    id: number;
    title: string;
    description?: string;
    status: IssueStatus;
    priority: PriorityLevel;
    manager: IssueManager;
    type: IssueType;
    page_url?: string;
    category: SystemCategory;
    created_at: string;
    updated_at: string;
}

export interface CreateIssueDto {
    title: string;
    description?: string;
    priority: PriorityLevel;
    manager: string;
    type: IssueType;
    page_url?: string;
    category: SystemCategory;
}

export interface UpdateIssueDto extends Partial<CreateIssueDto> {
    status?: IssueStatus;
}

export interface IssueFilter {
    status?: IssueStatus;
    priority?: PriorityLevel;
    category?: SystemCategory;
    type?: IssueType;
    keyword?: string;
}
