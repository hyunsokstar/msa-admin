import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

interface SubTasksProps {
  isLoading: boolean;
  subTodos: { id: string; content: string; is_completed: boolean }[] | null;
}

const SubTasks: React.FC<SubTasksProps> = ({ isLoading, subTodos }) => {
  return (
    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Sub Tasks</h3>
        <button className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
          <PlusCircle className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading tasks...</div>
        ) : subTodos && subTodos.length > 0 ? (
          subTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Checkbox checked={todo.is_completed} className="mt-0.5" />
              <span
                className={cn(
                  "text-sm text-gray-700",
                  todo.is_completed && "text-gray-400 line-through"
                )}
              >
                {todo.content}
              </span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No tasks added yet</div>
        )}
      </div>
    </div>
  );
};

export default SubTasks;
