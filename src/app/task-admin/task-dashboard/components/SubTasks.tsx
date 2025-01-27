// C:\Users\terec\msa-admin\src\app\task-admin\task-dashboard\components\SubTasks.tsx
"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubTaskRow from "./SubTaskRow";
import SubTaskHeader from "./SubTaskHeader";
import { useUpdateSubTodoStatus } from "@/hook/task/useUpdateSubTodoStatus";

interface SubTasksProps {
  taskId: string;
  isLoading: boolean;
  subTodos: { id: string; content: string; is_completed: boolean }[] | null;
}

const SubTasks: React.FC<SubTasksProps> = ({ taskId, isLoading, subTodos }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);
  const updateStatusMutation = useUpdateSubTodoStatus();

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(subTodos?.map((todo) => todo.id) || []));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (selectedItems.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setIsAllSelected(newSelected.size === (subTodos?.length || 0));
  };

  if (isLoading) return <div className="text-sm text-gray-500">Loading tasks...</div>;

  return (
    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
      <SubTaskHeader taskId={taskId} selectedCount={selectedItems.size} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">
              <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
            </TableHead>
            <TableHead className="text-center">Content</TableHead>
            <TableHead className="w-20 text-center">Status</TableHead>
            <TableHead className="w-20 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subTodos && subTodos.length > 0 ? (
            subTodos.map((todo) => (
              <SubTaskRow
                taskId={taskId}
                key={todo.id}
                todo={todo}
                isSelected={selectedItems.has(todo.id)}
                onSelect={() => handleSelectItem(todo.id)}
                updateStatusMutation={updateStatusMutation}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-gray-500">
                No tasks added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubTasks;