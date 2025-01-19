"use client"

import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApiForGetTaskDashboard } from '@/hook/task/useApiForGetTaskDashboard';
import { TaskDashboard, TaskStatus } from '@/types/task/typeForTaskDashboard';
import { TaskColumnForDashBoard } from './components/TaskColumnForDashBoard';
import { TaskCardForDashBoard } from './components/TaskCardForDashBoard';
import {
  getStatusColor,
  getStatusIcon,
  getStatusTextColor
} from './utils/statusUtils';
import { useApiForUpdateTaskStatus } from '@/hook/task/useApiForUpdateTaskStatus';
import { toast } from 'react-toastify';

export default function TaskDashboardPage() {
  const { data: tasksFromServer, isLoading, error } = useApiForGetTaskDashboard();
  const updateTaskStatus = useApiForUpdateTaskStatus();

  const [tasksLocal, setTasksLocal] = React.useState<TaskDashboard[]>([]);
  const [activeTask, setActiveTask] = React.useState<TaskDashboard | null>(null);

  React.useEffect(() => {
    if (tasksFromServer) {
      setTasksLocal(tasksFromServer);
    }
  }, [tasksFromServer]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const groupedTasks = React.useMemo(() => {
    const groups: Record<string, TaskDashboard[]> = {};
    tasksLocal.forEach(task => {
      if (!groups[task.status]) {
        groups[task.status] = [];
      }
      groups[task.status].push(task);
    });
    Object.keys(groups).forEach(status => {
      groups[status].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    });
    return groups;
  }, [tasksLocal]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const foundTask = tasksLocal.find(task => task.id === active.id);
    if (foundTask) {
      setActiveTask(foundTask);
    }
  };

  const handleDragOver = (event: DragEndEvent) => {
    // 필요 시 중간 단계 로직
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || !active) return;

    const activeTaskData = tasksLocal.find(task => task.id === active.id);
    if (!activeTaskData) return;

    const activeContainer = activeTaskData.status;
    const overId = String(over.id);
    const overTask = tasksLocal.find(task => task.id === over.id);
    const overContainer = overTask ? overTask.status : overId;

    try {
      if (activeContainer === overContainer) {
        if (active.id !== over.id) {
          const oldIndex = groupedTasks[activeContainer].findIndex(
            task => task.id === active.id
          );
          const newIndex = groupedTasks[activeContainer].findIndex(
            task => task.id === over.id
          );

          setTasksLocal(prev => {
            const columnTasks = groupedTasks[activeContainer];
            const newColumn = arrayMove(columnTasks, oldIndex, newIndex);
            
            const updatedColumn = newColumn.map((task, index) => ({
              ...task,
              order: index
            }));
            
            const filtered = prev.filter(t => t.status !== activeContainer);
            return [...filtered, ...updatedColumn].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          });

          await updateTaskStatus.mutateAsync({
            id: activeTaskData.id,
            status: activeContainer,
            order: newIndex
          });
          toast.success('작업 순서가 변경되었습니다.');
        }
      } else {
        const newColumnTasks = groupedTasks[overContainer] || [];
        const newOrder = newColumnTasks.length;

        setTasksLocal(prev => {
          const updatedTasks = prev.map(t => {
            if (t.id === activeTaskData.id) {
              return {
                ...t,
                status: overContainer as TaskStatus,
                order: newOrder
              };
            }
            return t;
          });

          return updatedTasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        });

        await updateTaskStatus.mutateAsync({
          id: activeTaskData.id,
          status: overContainer as TaskStatus,
          order: newOrder
        });
        toast.success(`작업 상태가 ${overContainer}로 변경되었습니다.`);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('작업 상태 변경에 실패했습니다.');
      // 실패시 원래 상태로 복구하는 로직 추가 가능
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error('작업 목록을 불러오는데 실패했습니다.');
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load tasks</AlertDescription>
      </Alert>
    );
  }

  const statusOrder = ['ready', 'progress', 'test', 'complete'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-4">
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
              {groupedTasks[status]?.map(task => {
                const isDragging = task.id === activeTask?.id;
                return (
                  <TaskCardForDashBoard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description ?? ''}
                    isDragging={isDragging}
                  />
                );
              })}
            </TaskColumnForDashBoard>
          ))}
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: 'ease'
          }}
        >
          {activeTask ? (
            <TaskCardForDashBoard
              id={activeTask.id}
              title={activeTask.title}
              description={activeTask.description ?? ''}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}