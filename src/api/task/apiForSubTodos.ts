// C:\Users\terec\msa-admin\src\api\task\apiForSubTodos.ts
// apiForUpdateSubTodoStatus

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