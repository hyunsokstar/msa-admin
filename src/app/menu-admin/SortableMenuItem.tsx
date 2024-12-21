import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FolderIcon, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { MenuItemType } from '@/api/apiForMenu';
import { Button } from "@/components/ui/button";
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';
import { DEPTH_COLORS } from './DEPTH_COLORS';
import IDialogButtonForUpdateNaviMenu from '@/components/dialog/IDialogButtonForUpdateNaviMenu';

export interface SortableMenuItemProps {
  menu: MenuItemType;
  depth: number;
  onToggle: (id: number) => void;
  expandedMenuIds: Set<number>;
  onDeleteMenu: (id: number, name: string) => void;
  isAdmin: boolean;
  isDeleting: boolean;
  onSuccess: () => void;
}

export const SortableMenuItem: React.FC<SortableMenuItemProps> = ({
  menu,
  depth,
  onToggle,
  expandedMenuIds,
  onDeleteMenu,
  isAdmin,
  isDeleting,
  onSuccess
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: menu.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    zIndex: isDragging ? 50 : 0,
  };

  const depthColor = DEPTH_COLORS[depth as keyof typeof DEPTH_COLORS] || DEPTH_COLORS[2];
  const isExpanded = expandedMenuIds.has(menu.id);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className={`
        mb-1.5 
        rounded-md 
        bg-white 
        transition-all
        duration-200
        hover:bg-gray-50
        border border-gray-100
        transform-gpu
        ${isDragging ? 'shadow-md border-blue-100 scale-[1.01]' : 'shadow-sm hover:shadow'}
      `}>
        <div className="flex items-center p-2.5">
          <div className="flex-none w-[28px] mr-2">
            {menu.items.length > 0 && (
              <button
                className={`
                  p-1 
                  rounded-md 
                  hover:bg-gray-100 
                  transition-transform 
                  duration-200
                  transform-gpu
                  ${isExpanded ? 'rotate-0' : '-rotate-90'}
                `}
                onClick={() => onToggle(menu.id)}
              >
                <ChevronDown 
                  className="w-3 h-3 transition-colors" 
                  style={{ color: depthColor }}
                />
              </button>
            )}
          </div>

          <div {...listeners} className="flex items-center gap-2 flex-1 cursor-grab drag-handle hover:cursor-grab active:cursor-grabbing">
            <FolderIcon 
              className="w-4 h-4 transition-transform duration-200" 
              style={{ color: depthColor }} 
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: depthColor }}>
                {menu.name}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {menu.path}
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
              
              {/* 업데이트 버튼 */}
              <IDialogButtonForUpdateNaviMenu
                  menu={menu}
                  onSuccess={onSuccess}
                />

              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${isDeleting ? 'opacity-50' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMenu(menu.id, menu.name);
                }}
                disabled={isDeleting}
              >
                <Trash2 className="w-3 h-3 text-gray-400" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className={`
        ml-6 
        transition-all 
        duration-200
        ease-in-out
        transform-gpu
        ${isExpanded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-2 h-0 overflow-hidden'
        }
      `}>
        {isExpanded && menu.items.length > 0 && menu.items.map((subMenu) => (
          <SortableMenuItem
            key={subMenu.id}
            menu={subMenu}
            depth={depth + 1}
            onToggle={onToggle}
            expandedMenuIds={expandedMenuIds}
            onDeleteMenu={onDeleteMenu}
            isAdmin={isAdmin}
            isDeleting={isDeleting}
            onSuccess={onSuccess}
          />
        ))}
      </div>
    </div>
  );
};