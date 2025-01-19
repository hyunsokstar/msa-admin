import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TaskColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  count: number;
  color: string;
  textColor: string;
  tasks: any[];
}

export function TaskColumnForDashBoard({
  id,
  title,
  children,
  icon,
  count,
  color,
  textColor,
  tasks
}: TaskColumnProps) {
  // useDroppable로 컬럼 영역을 droppable로 설정
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`${color} p-4 rounded-lg`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className={`text-lg font-semibold capitalize ${textColor}`}>
          {title}
        </h2>
        <span className="ml-auto bg-white px-2 py-1 rounded-full text-sm font-medium shadow-sm">
          {count}
        </span>
      </div>

      {/* 이 컬럼에 속한 Task들을 SortableContext로 감싸줌 */}
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {children}
        </div>
      </SortableContext>
    </div>
  );
}
