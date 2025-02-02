"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubTaskRow from "./SubTaskRow";
import SubTaskHeader from "./SubTaskHeader";
import { useUpdateSubTodoStatus } from "@/hook/task/useUpdateSubTodoStatus";
import { Notebook, Link } from "lucide-react";

interface SubTasksProps {
  taskId: string;
  isLoading: boolean;
  subTodos: {
    id: string;
    content: string;
    is_completed: boolean;
    task_result_image: string | null;
    ref_task_note: string | null;
  }[] | null;
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
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg p-4 shadow-sm">
      <div className="mb-4">
        <SubTaskHeader taskId={taskId} selectedCount={selectedItems.size} />
      </div>
      <div className="flex-1 overflow-hidden">
        <Table className="table-fixed">
          <TableHeader className="sticky top-0 bg-white">
            <TableRow>

              <TableHead className="w-12 text-center p-0">
                <div className="flex justify-center items-center h-full min-h-[40px]">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                </div>
              </TableHead>

              <TableHead className="text-center">Content</TableHead>
              <TableHead className="w-16 text-center">참고 이미지</TableHead>
              <TableHead className="w-16 text-center">참고 노트</TableHead>
              <TableHead className="w-24 text-center">액션</TableHead>
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
                <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                  No tasks added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubTasks;
