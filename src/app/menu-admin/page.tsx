"use client";

import { MenuItemType } from '@/api/apiForMenu';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import React, { useState, useEffect } from 'react';
import { FolderIcon, ChevronRight, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';
import { useQueryClient } from '@tanstack/react-query';
import { useApiForDeleteMenu } from '@/hook/useApiForDeleteMenu';
import { useUserStore } from '@/store/useUserStore';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DEPTH_COLORS = {
  0: '#1a1a1a',  // 진한 회색
  1: '#404040',  // 중간 회색
  2: '#666666',  // 연한 회색
};

interface CollapseControlsProps {
  onCollapseAll: () => void;
  onExpandAll: () => void;
  onCollapseToLevel: (level: number) => void;
  currentExpandedCount: number;
  totalCount: number;
  activeLevel: number;
}

const CollapseControls: React.FC<CollapseControlsProps> = ({ 
  onCollapseAll, 
  onExpandAll, 
  onCollapseToLevel,
  currentExpandedCount,
  totalCount,
  activeLevel 
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 p-2 bg-gray-50 rounded-lg border border-gray-100">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCollapseAll}
        className="text-xs font-medium"
      >
        접기
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onExpandAll}
        className="text-xs font-medium"
      >
        펼치기
      </Button>
      <div className="h-4 w-px bg-gray-200 mx-2" />
      <div className="flex gap-1">
        {[1, 2].map((level) => (
          <Button
            key={level}
            variant={activeLevel === level ? "default" : "ghost"}
            size="sm"
            onClick={() => onCollapseToLevel(level)}
            className={`text-xs font-medium ${
              activeLevel === level 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "text-gray-600"
            }`}
          >
            {`${level}단계`}
          </Button>
        ))}
      </div>
      <div className="ml-auto text-xs text-gray-500">
        {currentExpandedCount} / {totalCount}
      </div>
    </div>
  );
};

interface SortableMenuItemProps {
  menu: MenuItemType;
  depth: number;
  onToggle: (id: number) => void;
  expandedMenuIds: Set<number>;
  onDeleteMenu: (id: number, name: string) => void;
  isAdmin: boolean;
  isDeleting: boolean;
  onSuccess: () => void;
}

const DragOverlayContent = ({ menu, depth }: { menu: MenuItemType; depth: number }) => {
  const depthColor = DEPTH_COLORS[depth as keyof typeof DEPTH_COLORS] || DEPTH_COLORS[2];

  return (
    <div 
      className={`
        mb-1.5 
        rounded-md 
        bg-white 
        shadow-lg
        border border-blue-200
        scale-[1.01]
        opacity-95
        transition-transform
        duration-150
      `}
    >
      <div className="flex items-center p-2.5">
        <div className="flex-none w-[28px] mr-2">
          {menu.items.length > 0 && (
            <ChevronRight className="w-3 h-3" style={{ color: depthColor }} />
          )}
        </div>

        <div className="flex items-center gap-2 flex-1">
          <FolderIcon 
            className="w-4 h-4" 
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
      </div>
    </div>
  );
};

const SortableMenuItem: React.FC<SortableMenuItemProps> = ({
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
    transition,
    isDragging,
  } = useSortable({ 
    id: menu.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
    position: 'relative' as const,
    zIndex: isDragging ? 50 : 0,
  };

  const depthColor = DEPTH_COLORS[depth as keyof typeof DEPTH_COLORS] || DEPTH_COLORS[2];
  const isExpanded = expandedMenuIds.has(menu.id);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div 
        className={`
          mb-1.5 
          rounded-md 
          bg-white 
          transition-all
          duration-200
          hover:bg-gray-50
          border border-gray-100
          transform-gpu
          ${isDragging 
            ? 'shadow-md border-blue-100 scale-[1.01]' 
            : 'shadow-sm hover:shadow'
          }
        `}
      >
        <div className="flex items-center p-2.5">
          <div className="flex-none w-[28px] mr-2">
            {menu.items.length > 0 ? (
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
            ) : null}
          </div>

          <div {...listeners} className="flex items-center gap-2 flex-1 cursor-move drag-handle">
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
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
              >
                <Pencil className="w-3 h-3 text-gray-400" />
              </Button>
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
      
      <div 
        className={`
          ml-6 
          transition-all 
          duration-200
          ease-in-out
          transform-gpu
          ${isExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 h-0 overflow-hidden'
          }
        `}
      >
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

const getMenuDepth = (path: string): number => {
  return path.split('/').filter(Boolean).length;
};

const MenuAdmin = () => {
  const { data: menus, isLoading, isError } = useApiForGetMenusData();
  const { deleteMenu, isDeleting } = useApiForDeleteMenu();
  const queryClient = useQueryClient();
  const [expandedMenuIds, setExpandedMenuIds] = useState<Set<number>>(new Set());
  const { user } = useUserStore();
  const isAdmin = user?.is_admin ?? false;
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [totalMenuCount, setTotalMenuCount] = useState(0);
  const [expandedCount, setExpandedCount] = useState(0);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItemType | null>(null);
  const [activeDepth, setActiveDepth] = useState<number>(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 0,
        tolerance: 0,
      },
    })
  );

  const findItem = (items: MenuItemType[], id: number, depth: number = 0): [MenuItemType | null, number] => {
    for (const item of items) {
      if (item.id === id) {
        return [item, depth];
      }
      if (item.items.length > 0) {
        const [found, foundDepth] = findItem(item.items, id, depth + 1);
        if (found) {
          return [found, foundDepth];
        }
      }
    }
    return [null, depth];
  };

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as number;
    const [item, depth] = findItem(items, id);
    if (item) {
      setActiveId(id);
      setActiveItem(item);
      setActiveDepth(depth);
      document.body.style.cursor = 'grabbing';
    }
  };

  const countVisibleMenus = (items: MenuItemType[], level: number = 1): number => {
    let count = 0;
    items.forEach(item => {
      if (level <= activeLevel) {
        count++;
        if (item.items.length > 0 && expandedMenuIds.has(item.id)) {
          count += countVisibleMenus(item.items, level + 1);
        }
      }
    });
    return count;
  };

  useEffect(() => {
    if (menus) {
      setItems(menus);
      const visibleCount = countVisibleMenus(menus);
      setTotalMenuCount(visibleCount);
      setExpandedCount(visibleCount);
    }
  }, [menus, expandedMenuIds, activeLevel]);

  const handleCollapseAll = () => {
    setExpandedMenuIds(new Set());
    setActiveLevel(1);
  };

  const handleExpandAll = () => {
    if (menus) {
      setActiveLevel(2);
      const allIds = new Set<number>();
      const addIds = (items: MenuItemType[]) => {
        items.forEach(item => {
          if (getMenuDepth(item.path) <= 2) {
            allIds.add(item.id);
            if (item.items.length > 0) {
              addIds(item.items);
            }
          }
        });
      };
      addIds(menus);
      setExpandedMenuIds(allIds);
    }
  };

  const handleCollapseToLevel = (targetLevel: number) => {
    if (menus) {
      setActiveLevel(targetLevel);
      const newIds = new Set<number>();
      const addIds = (items: MenuItemType[], currentLevel: number) => {
        items.forEach(item => {
          if (currentLevel < targetLevel) {
            newIds.add(item.id);
            if (item.items.length > 0) {
              addIds(item.items, currentLevel + 1);
            }
          }
        });
      };
      addIds(menus, 1);
      setExpandedMenuIds(newIds);
    }
  };

  const toggleExpand = (menuId: number) => {
    setExpandedMenuIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);
    document.body.style.cursor = '';

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const findItemAndUpdate = (items: MenuItemType[], activeId: number, overId: number): MenuItemType[] => {
          const oldIndex = items.findIndex((item) => item.id === activeId);
          const newIndex = items.findIndex((item) => item.id === overId);
          
          if (oldIndex !== -1 && newIndex !== -1) {
            const movingMenu = items[oldIndex];
            const targetMenu = items[newIndex];
            
            console.log('메뉴 이동:', {
              이동메뉴: {
                id: movingMenu.id,
                이름: movingMenu.name,
                이전위치: oldIndex + 1,
                새위치: newIndex + 1,
                경로: movingMenu.path
              },
              대상메뉴: {
                id: targetMenu.id,
                이름: targetMenu.name,
                경로: targetMenu.path
              },
              depth: getMenuDepth(movingMenu.path)
            });
            
            return arrayMove(items, oldIndex, newIndex);
          }
          
          const newItems = items.map(item => ({
            ...item,
            items: findItemAndUpdate(item.items, activeId, overId)
          }));

          const findMovingItem = (items: MenuItemType[]): MenuItemType | undefined => {
            for (const item of items) {
              if (item.id === activeId) return item;
              const found = findMovingItem(item.items);
              if (found) return found;
            }
            return undefined;
          };

          const findTargetItem = (items: MenuItemType[]): MenuItemType | undefined => {
            for (const item of items) {
              if (item.id === overId) return item;
              const found = findTargetItem(item.items);
              if (found) return found;
            }
            return undefined;
          };

          const movingItem = findMovingItem(items);
          const targetItem = findTargetItem(items);

          if (movingItem && targetItem) {
            console.log('하위 메뉴 이동:', {
              이동메뉴: {
                id: movingItem.id,
                이름: movingItem.name,
                경로: movingItem.path
              },
              대상메뉴: {
                id: targetItem.id,
                이름: targetItem.name,
                경로: targetItem.path
              },
              depth: getMenuDepth(movingItem.path)
            });
          }
          
          return newItems;
        };
        
        return findItemAndUpdate(prevItems, active.id as number, over.id as number);
      });
    }
  };

  const renderMenuItems = (menuItems: MenuItemType[], depth = 0) => {
    if (depth >= activeLevel) return null;

    return (
      <SortableContext items={menuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className={`${depth > 0 ? 'ml-6' : ''} transition-transform duration-200`}>
          {menuItems.map((menu) => (
            <SortableMenuItem
              key={menu.id}
              menu={menu}
              depth={depth}
              onToggle={toggleExpand}
              expandedMenuIds={expandedMenuIds}
              onDeleteMenu={handleDeleteMenu}
              isAdmin={isAdmin}
              isDeleting={isDeleting}
              onSuccess={handleMenuSuccess}
            />
          ))}
        </div>
      </SortableContext>
    );
  };

  const handleMenuSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['menus'] });
  };

  const handleDeleteMenu = async (menuId: number, menuName: string) => {
    if (!isAdmin) return;
    
    try {
      await deleteMenu(
        { menuId, menuName },
        {
          onSuccess: () => {
            console.log('삭제 성공:', { menuId, menuName });
            queryClient.invalidateQueries({ queryKey: ['menus'] });
          },
          onError: (error) => {
            console.error('삭제 실패:', error);
          }
        }
      );
    } catch (error) {
      console.error('삭제 중 예외 발생:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6 mt-14">
        <Alert variant="destructive">
          <AlertDescription>
            메뉴 관리 페이지는 관리자만 접근할 수 있습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">메뉴 관리</h1>
        {isAdmin && (
          <DialogButtonForAddMenuForParentMenu
            parentId={null}
            parentMenuName=""
            onSuccess={handleMenuSuccess}
          />
        )}
      </div>

      <CollapseControls
        onCollapseAll={handleCollapseAll}
        onExpandAll={handleExpandAll}
        onCollapseToLevel={handleCollapseToLevel}
        currentExpandedCount={expandedCount}
        totalCount={totalMenuCount}
        activeLevel={activeLevel}
      />

      {isLoading && (
        <div className="text-center py-8 text-gray-500 text-sm">
          메뉴 불러오는 중...
        </div>
      )}
      {isError && (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg text-sm">
          메뉴를 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveId(null);
          setActiveItem(null);
          document.body.style.cursor = '';
        }}
      >
        <div className="mt-4">
          {items && renderMenuItems(items)}
        </div>

        <DragOverlay>
          {activeItem && (
            <DragOverlayContent menu={activeItem} depth={activeDepth} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default MenuAdmin;