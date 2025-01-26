// components/TabMenu/SubTaskActions.tsx
import React from 'react';
import { Pencil, Trash2 } from "lucide-react";

interface SubTaskActionsProps {
    todoId: string;
}

const SubTaskActions: React.FC<SubTaskActionsProps> = ({ todoId }) => {
    return (
        <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
                <Pencil className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
                <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
        </div>
    );
};

export default SubTaskActions;