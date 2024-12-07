'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';
import { Button } from '@/components/ui/button';
import { FolderIcon } from 'lucide-react';

interface SortableMenuItemProps {
  menu: {
    id: number;
    name: string;
    path: string;
    sort_order: number;
    items: any[];
  };
  depth: number;
  onToggle: (id: number) => void;
  isExpanded: boolean;
  onDeleteMenu: (id: number, name: string) => void;
  isAdmin: boolean;
  isDeleting: boolean;
  onSuccess: () => void;
}

const DEPTH_COLORS = {
  0: 'rgb(239, 68, 68)', // 빨강
  1: 'rgb(249, 115, 22)', // 주황
  2: 'rgb(234, 179, 8)', // 노랑
  3: 'rgb(34, 197, 94)', // 초록
  4: 'rgb(59, 130, 246)', // 파랑
  5: 'rgb(139, 92, 246)', // 보라
};

const SortableMenuItem: React.FC<SortableMenuItemProps> = ({
  menu,
  depth,
  onToggle,
  isExpanded,
  onDeleteMenu,
  isAdmin,
  isDeleting,
  onSuccess,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: menu.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const depthColor = DEPTH_COLORS[depth as keyof typeof DEPTH_COLORS] || DEPTH_COLORS[5];

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="mb-2">
        <div
          className={`rounded-lg bg-white hover:shadow-md transition-all border-l-4 ${
            isDragging ? 'shadow-lg' : 'shadow-sm'
          }`}
          style={{ borderLeftColor: depthColor }}
        >
          <div className="flex items-center gap-2 p-3 hover:bg-gray-50">
            <button
              className="p-1 hover:bg-gray-200 rounded-full"
              onClick={() => onToggle(menu.id)}
            >
              {menu.items.length > 0 ? (
                isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            <div
              {...listeners}
              className="flex items-center gap-2 flex-1 cursor-grab active:cursor-grabbing"
            >
              <FolderIcon className="w-5 h-5" style={{ color: depthColor }} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{menu.name}</div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <code className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {menu.path}
                  </code>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>순서: {menu.sort_order}</span>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-1">
                <DialogButtonForAddMenuForParentMenu
                  parentId={menu.id}
                  parentMenuName={menu.name}
                  onSuccess={onSuccess}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => console.log('Edit menu:', menu.id)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${
                    isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => onDeleteMenu(menu.id, menu.name)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortableMenuItem;
