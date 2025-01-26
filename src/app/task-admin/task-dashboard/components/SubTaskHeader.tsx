// components/TabMenu/SubTaskHeader.tsx
import React from 'react';
import { PlusCircle, Trash2 } from "lucide-react";

interface SubTaskHeaderProps {
    selectedCount: number;
}

const SubTaskHeader: React.FC<SubTaskHeaderProps> = ({ selectedCount }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Sub Tasks</h3>
            <div className="flex items-center gap-2">
                <button
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700"
                    disabled={selectedCount === 0}
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
                <button className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                    <PlusCircle className="w-4 h-4" />
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default SubTaskHeader;