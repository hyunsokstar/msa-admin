"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    DragEndEvent,
    DragStartEvent,
    DragOverEvent,
    useSensor,
    useSensors,
    PointerSensor,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

const SortableItem = dynamic(() => import('./_comp/SortableItem'), {
    ssr: false,
});

const initialStudyTasks = [
    "Spring Boot MSA로 게시판 만들기",
    "Framer Motion 기본 학습",
    "TypeScript 개념 정리",
    "NestJS로 콜센터 상담원 관리 프로젝트 만들어 보기",
    "Rust 기본 학습",
];

const initialFramerMotionTasks = [
    "애니메이션 기본 이해",
    "Variants 사용법 익히기",
    "Keyframes 적용해 보기",
    "Gesture 기반 애니메이션 만들기",
    "드래그 애니메이션 구현",
];

interface TodoListProps {
    items: string[];
    title: string;
    listId: string;
    activeId: string | null;
    overId: string | null;
}

const TodoList = ({ items, title, listId, activeId, overId }: TodoListProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `container-${listId}`,
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-white shadow-lg rounded-lg p-4 w-80 min-h-[300px] transition-colors duration-200
                ${isOver && items.length === 0 ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}`}
        >
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <AnimatePresence>
                    {items.map((item) => (
                        <SortableItem
                            key={item}
                            id={item}
                            isOver={overId === item}
                            isActive={activeId === item}
                        />
                    ))}
                </AnimatePresence>
            </SortableContext>
            {items.length === 0 && (
                <div className="h-32 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                    드래그하여 항목 추가
                </div>
            )}
        </div>
    );
};

const StudyJournal = () => {
    const [mounted, setMounted] = useState(false);
    const [studyTasks, setStudyTasks] = useState<string[]>([]);
    const [framerMotionTasks, setFramerMotionTasks] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    useEffect(() => {
        setStudyTasks(initialStudyTasks);
        setFramerMotionTasks(initialFramerMotionTasks);
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex justify-center gap-6 p-6">Loading...</div>;
    }

    const findContainer = (id: string) => {
        if (studyTasks.includes(id)) return "study";
        if (framerMotionTasks.includes(id)) return "framer";
        if (completedTasks.includes(id)) return "completed";
        return null;
    };

    const handleDragStart = (event: DragStartEvent) => {
        console.log("드래그가 시작되면 호출됩니다.");
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;
        setOverId(over ? over.id as string : null);
    };

    // Helper functions for container management
    const getContainerItems = (container: string) => {
        switch (container) {
            case "study": return studyTasks;
            case "framer": return framerMotionTasks;
            case "completed": return completedTasks;
            default: return [];
        }
    };

    const updateContainer = (container: string, items: string[]) => {
        switch (container) {
            case "study":
                setStudyTasks(items);
                break;
            case "framer":
                setFramerMotionTasks(items);
                break;
            case "completed":
                setCompletedTasks(items);
                break;
        }
    };

    const removeFromContainer = (container: string, itemId: string) => {
        switch (container) {
            case "study":
                setStudyTasks(prev => prev.filter(item => item !== itemId));
                break;
            case "framer":
                setFramerMotionTasks(prev => prev.filter(item => item !== itemId));
                break;
            case "completed":
                setCompletedTasks(prev => prev.filter(item => item !== itemId));
                break;
        }
    };

    const addToContainer = (container: string, itemId: string) => {
        switch (container) {
            case "study":
                setStudyTasks(prev => [...prev, itemId]);
                break;
            case "framer":
                setFramerMotionTasks(prev => [...prev, itemId]);
                break;
            case "completed":
                setCompletedTasks(prev => [...prev, itemId]);
                break;
        }
    };

    const addToContainerAtPosition = (container: string, itemId: string, targetId: string) => {
        const addAtPosition = (prev: string[]) => {
            const index = prev.indexOf(targetId);
            return [
                ...prev.slice(0, index + 1),
                itemId,
                ...prev.slice(index + 1)
            ];
        };

        switch (container) {
            case "study":
                setStudyTasks(addAtPosition);
                break;
            case "framer":
                setFramerMotionTasks(addAtPosition);
                break;
            case "completed":
                setCompletedTasks(addAtPosition);
                break;
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            setOverId(null);
            return;
        }

        const sourceId = active.id as string;
        const overId = over.id as string;
        const sourceContainer = findContainer(sourceId);

        // 컨테이너에 직접 드래그하는 경우
        if (overId.startsWith('container-')) {
            const targetListId = overId.replace('container-', '');

            // 같은 컨테이너로 이동하는 경우
            if (sourceContainer === targetListId) {
                setActiveId(null);
                setOverId(null);
                return;
            }

            // 다른 컨테이너로 이동하는 경우
            if (sourceContainer) {
                removeFromContainer(sourceContainer, sourceId);
                addToContainer(targetListId, sourceId);
            }
        } else {
            const destinationContainer = findContainer(overId);

            if (!sourceContainer || !destinationContainer) {
                setActiveId(null);
                setOverId(null);
                return;
            }

            if (sourceContainer === destinationContainer) {
                // 같은 컨테이너 내 이동
                const items = getContainerItems(sourceContainer);
                const oldIndex = items.indexOf(sourceId);
                const newIndex = items.indexOf(overId);

                if (oldIndex !== newIndex) {
                    const newItems = arrayMove(items, oldIndex, newIndex);
                    updateContainer(sourceContainer, newItems);
                }
            } else {
                // 다른 컨테이너로 이동
                removeFromContainer(sourceContainer, sourceId);
                addToContainerAtPosition(destinationContainer, sourceId, overId);
            }
        }

        setActiveId(null);
        setOverId(null);
    };

    return (
        <div className="flex justify-center gap-6 p-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <TodoList
                    title="📚 Study Todo List"
                    items={studyTasks}
                    listId="study"
                    activeId={activeId}
                    overId={overId}
                />
                <TodoList
                    title="🎨 Framer Motion Practice"
                    items={framerMotionTasks}
                    listId="framer"
                    activeId={activeId}
                    overId={overId}
                />
                <TodoList
                    title="✅ Completed List"
                    items={completedTasks}
                    listId="completed"
                    activeId={activeId}
                    overId={overId}
                />

                <DragOverlay>
                    {activeId ? (
                        <div className="bg-white shadow-md rounded p-3 border-2 border-blue-400">
                            {activeId}
                        </div>
                    ) : null}
                </DragOverlay>
                
            </DndContext>
        </div>
    );
};

export default StudyJournal;