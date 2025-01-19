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

export default function TaskDashboardPage() {
  const { data: tasksFromServer, isLoading, error } = useApiForGetTaskDashboard();

  // 로컬 상태로 관리할 tasks
  const [tasksLocal, setTasksLocal] = React.useState<TaskDashboard[]>([]);

  // 드래그 중인 "Task"를 저장할 상태
  const [activeTask, setActiveTask] = React.useState<TaskDashboard | null>(null);

  React.useEffect(() => {
    if (tasksFromServer) {
      setTasksLocal(tasksFromServer);
    }
  }, [tasksFromServer]);

  // DnD Sensors 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // tasksLocal을 status별로 그룹화
  const groupedTasks = React.useMemo(() => {
    const groups: Record<string, TaskDashboard[]> = {};
    tasksLocal.forEach(task => {
      if (!groups[task.status]) {
        groups[task.status] = [];
      }
      groups[task.status].push(task);
    });
    return groups;
  }, [tasksLocal]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // 드래그 시작 시점에 해당 아이템(카드) 정보를 activeTask로 저장
    const foundTask = tasksLocal.find(task => task.id === active.id);
    if (foundTask) {
      setActiveTask(foundTask);
    }
  };

  const handleDragOver = (event: DragEndEvent) => {
    // 필요 시 중간 단계 로직
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // Drag 종료 후 Overlay에서 아이템 없애기
    setActiveTask(null);

    if (!over || !active) return;

    // 현재 드래그 중인 task 정보
    const activeTaskData = tasksLocal.find(task => task.id === active.id);
    if (!activeTaskData) return;

    const activeContainer = activeTaskData.status;
    // 마우스를 놓은 위치(타겟)
    const overId = String(over.id);
    const overTask = tasksLocal.find(task => task.id === over.id);
    // 만약 overTask가 없으면, 컬럼 자체를 의미할 수 있음 (즉 컬럼의 빈 공간)
    const overContainer = overTask ? overTask.status : overId;

    // 같은 컬럼 안에서 순서만 바꾸는 경우
    if (activeContainer === overContainer) {
      if (active.id !== over.id) {
        // 같은 status 배열 안에서 reorder
        const oldIndex = groupedTasks[activeContainer].findIndex(
          task => task.id === active.id
        );
        const newIndex = groupedTasks[activeContainer].findIndex(
          task => task.id === over.id
        );

        // arrayMove를 사용하여 로컬 상태 업데이트
        setTasksLocal(prev => {
          const columnTasks = groupedTasks[activeContainer];
          const newColumn = arrayMove(columnTasks, oldIndex, newIndex);
          // 기존 state에서 이 status 아닌 것만 필터
          const filtered = prev.filter(t => t.status !== activeContainer);
          return [...filtered, ...newColumn];
        });

        // TODO: 서버에 순서 변경 API 호출
      }
    } else {
      // 다른 컬럼으로 이동(= status가 변경)
      setTasksLocal(prev => {
        return prev.map(t => {
          if (t.id === activeTaskData.id) {
            return {
              ...t,
              status: overContainer as TaskStatus
            };
          }
          return t;
        });
      });

      // TODO: 서버에 상태 변경 API 호출
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load tasks</AlertDescription>
      </Alert>
    );
  }

  // 원하는 컬럼(상태)의 순서
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
              {/* 
                컬럼에 렌더링할 때,
                만약 현재 드래그 중인 activeTask와 ID가 겹치면
                이 위치에서는 '빈자리'가 보이거나(= 렌더링 안함)
                혹은 희미하게 보이도록 조정 가능
               */}
              {groupedTasks[status]?.map(task => {
                // 만약 현재 드래그 중인 아이템이면
                // 여기서 안그리거나, 스타일만 바꾸는 식으로 처리 가능
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

        {/* DragOverlay를 통한 드래그 중인 카드 표시 */}
        <DragOverlay
          // dropAnimation은 아이템을 놓을 때 짧은 애니메이션 효과
          dropAnimation={{
            duration: 200,
            easing: 'ease'
          }}
        >
          {activeTask ? (
            <TaskCardForDashBoard
              // Overlay에 표시될 카드
              id={activeTask.id}
              title={activeTask.title}
              description={activeTask.description ?? ''}
              // 드래그되는 Overlay 카드 자체를 약간 스타일 바꿔줄 수도 있음
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
