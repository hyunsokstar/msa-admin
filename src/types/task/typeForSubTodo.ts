// C:\Users\terec\msa-admin\src\types\task\typeForSubTodo.ts
// types/task/typeForSubTodo.ts

export interface SubTodo {
    id: string;
    content: string;
    is_completed: boolean;
    task_result_image: string | null;
    ref_task_note: string | null;
}

export interface UpdateSubTodoAllDto {
    content: string;
    task_result_image: string | null;
    ref_task_note: string | null;
}

export interface UpdateSubTodoContentDto {
    content: string;
}

export interface UpdateSubTodoStatusDto {
    is_completed: boolean;
}

export interface CreateSubTodoDto {
    task_id: string;
    content: string;
}