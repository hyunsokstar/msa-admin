// C:\Users\terec\msa-admin\src\api\task\apiForSubTodos.ts

export const apiForUpdateSubTodoImage = async (id: string, taskResultImage: string) => {
    const response = await fetch(`/api/sub-todos/${id}/image`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_result_image: taskResultImage }),
    });

    if (!response.ok) throw new Error('Failed to update sub todo image');
    return response.json();
};

export interface CreateSubTodoDto {
    task_id: string;
    content: string;
}

export const apiForCreateSubTodo = async (data: CreateSubTodoDto) => {
    const response = await fetch('/api/sub-todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to create sub todo');
    return response.json();
};

export const apiForUpdateSubTodoStatus = async (id: string, isCompleted: boolean) => {
    const response = await fetch(`/api/sub-todos/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: isCompleted }),
    });

    if (!response.ok) throw new Error('Failed to update sub todo status');
    return response.json();
};

// api/task/apiForSubTodos.ts
export const apiForDeleteSubTodo = async (subtodoId: string) => {
    const response = await fetch(`/api/sub-todos/${subtodoId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '서브 할일 삭제 실패');
    }

    return response.json();
};

// api/task/apiForSubTodos.ts
export const apiForUpdateSubTodo = async (id: string, content: string) => {
    const response = await fetch(`/api/sub-todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error('Failed to update sub todo');
    return response.json();
};

export const apiForUpdateSubTodoAll = async (id: string, data: UpdateSubTodoAllDto) => {
    const response = await fetch(`/api/sub-todos/${id}/all`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to update sub todo');
    return response.json();
};