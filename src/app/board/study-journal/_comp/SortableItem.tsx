"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

interface Props {
    id: string;
    isOver?: boolean;
    isActive?: boolean;
}

export default function SortableItem({ id, isOver, isActive }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            ref={setNodeRef}
            style={style}
            className={`mb-2 relative ${isDragging ? "opacity-50 z-10" : ""}`}
            {...attributes}
            {...listeners}
        >
            <div
                className={`
                    bg-white border rounded-lg p-3 cursor-move 
                    transition-all duration-200
                    ${isOver ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
                    ${isActive ? 'border-blue-500' : ''}
                `}
            >
                {id}
            </div>
            {isOver && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded-full" />
            )}
        </motion.div>
    );
}