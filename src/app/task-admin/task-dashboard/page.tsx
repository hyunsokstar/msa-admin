"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useApiForGetTaskDashboard } from "@/hook/task/useApiForGetTaskDashboard";
import { TaskDashboard, TaskStatus } from "@/types/task/typeForTaskDashboard";
import { TaskColumnForDashBoard } from "./components/TaskColumnForDashBoard";
import {
  getStatusColor,
  getStatusIcon,
  getStatusTextColor,
} from "./utils/statusUtils";
import { toast } from "react-toastify";
import IDialogButtonForCreateTaskDashBoard from "./components/IDialogButtonForCreateTaskDashBoard";
import { useApiForDragAndDropTask } from "@/hook/task/useApiForDragAndDropTask";
import { TaskCardForDashBoard } from "./components/TaskCardForDashBoard";
import ArchivedTaskList from "./components/ArchivedTaskList";

const statusOrder = ["ready", "progress", "test", "complete"] as const;

export default function TaskDashboardPage() {
  const [tasksLocal, setTasksLocal] = React.useState<TaskDashboard[]>([]);
  const [activeTask, setActiveTask] = React.useState<TaskDashboard | null>(null);
  const dragAndDropTask = useApiForDragAndDropTask();

  const { data: tasksFromServer, isLoading, error } = useApiForGetTaskDashboard();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    if (tasksFromServer) {
      setTasksLocal(tasksFromServer);
    }
  }, [tasksFromServer]);

  const groupedTasks = React.useMemo(() => {
    const groups: Record<TaskStatus, TaskDashboard[]> = {
      ready: [],
      progress: [],
      test: [],
      complete: []
    };

    const activeTasks = tasksLocal.filter(task => !task.is_archived);

    activeTasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });

    Object.keys(groups).forEach((status) => {
      groups[status as TaskStatus].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    });

    return groups;
  }, [tasksLocal]);

  const archivedTasks = React.useMemo(() => {
    return tasksLocal.filter(task => task.is_archived);
  }, [tasksLocal]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const foundTask = tasksLocal.find((task) => task.id === active.id);
    if (foundTask) {
      setActiveTask(foundTask);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || !active) return;

    const activeTaskData = tasksLocal.find((task) => task.id === active.id);
    if (!activeTaskData) return;

    const activeContainer = activeTaskData.status;
    const overId = String(over.id);
    const overTask = tasksLocal.find((task) => task.id === over.id);
    const overContainer = overTask ? overTask.status : overId as TaskStatus;

    try {
      if (activeContainer === overContainer) {
        if (active.id !== over.id) {
          const oldIndex = groupedTasks[activeContainer].findIndex(
            (task) => task.id === active.id
          );
          const newIndex = groupedTasks[activeContainer].findIndex(
            (task) => task.id === over.id
          );

          setTasksLocal((prev) => {
            const columnTasks = groupedTasks[activeContainer];
            const newColumn = arrayMove(columnTasks, oldIndex, newIndex);

            const updatedColumn = newColumn.map((task, index) => ({
              ...task,
              order: index,
            }));

            return prev.map(task =>
              task.status === activeContainer
                ? updatedColumn.find(t => t.id === task.id) || task
                : task
            );
          });

          await dragAndDropTask.mutateAsync({
            id: activeTaskData.id,
            status: activeContainer,
            order: newIndex,
          });
          toast.success("작업 순서가 변경되었습니다.");
        }
      } else {
        const newColumnTasks = groupedTasks[overContainer];
        const newOrder = newColumnTasks.length;

        setTasksLocal((prev) =>
          prev.map((t) =>
            t.id === activeTaskData.id
              ? { ...t, status: overContainer, order: newOrder }
              : t
          )
        );

        await dragAndDropTask.mutateAsync({
          id: activeTaskData.id,
          status: overContainer,
          order: newOrder,
        });
        toast.success(`작업 상태가 ${overContainer}로 변경되었습니다.`);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("작업 상태 변경에 실패했습니다.");
      setTasksLocal(tasksFromServer || []);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>작업 목록을 불러오는데 실패했습니다.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <IDialogButtonForCreateTaskDashBoard />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusOrder.map((status) => (
            <TaskColumnForDashBoard
              key={status}
              id={status}
              title={status}
              icon={getStatusIcon(status)}
              count={groupedTasks[status]?.length || 0}
              color={getStatusColor(status)}
              textColor={getStatusTextColor(status)}
              tasks={groupedTasks[status] || []}
            >
              {groupedTasks[status]?.map((task) => (
                <TaskCardForDashBoard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description ?? ""}
                  screen_url={task.screen_url}
                  figma_url={task.figma_url}
                  created_by={task.created_by_user}
                  isDragging={task.id === activeTask?.id}
                />
              ))}
            </TaskColumnForDashBoard>
          ))}
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: "ease",
          }}
        >
          {activeTask && (
            <TaskCardForDashBoard
              id={activeTask.id}
              title={activeTask.title}
              description={activeTask.description ?? ""}
              screen_url={activeTask.screen_url}
              figma_url={activeTask.figma_url}
              created_by={activeTask.created_by_user}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>

      <ArchivedTaskList archivedTasks={archivedTasks} />
    </div>
  );
}