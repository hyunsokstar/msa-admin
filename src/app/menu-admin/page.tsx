"use client";

import React, { useState, useEffect } from 'react';
import { MenuItemType } from '@/api/apiForMenu';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';
import { useQueryClient } from '@tanstack/react-query';
import { useApiForDeleteMenu } from '@/hook/useApiForDeleteMenu';
import { useUserStore } from '@/store/useUserStore';
import { Alert, AlertDescription } from "@/components/ui/alert";
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

import { getMenuDepth } from './DEPTH_COLORS';
import { CollapseControls } from './CollapseControls';
import { DragOverlayContent } from './DragOverlayContent';
import { SortableMenuItem } from './SortableMenuItem';
import { countVisibleMenus, countTotalMenus } from './MenuUtil';
import useApiForUpdateMenuOrder from '@/hook/useApiForUpdateMenuOrder';



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
  const { mutate: updateMenuOrder } = useApiForUpdateMenuOrder();

  

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



useEffect(() => {
  if (menus) {
    setItems(menus);
    const total = countTotalMenus(menus);
    const visible = countVisibleMenus(menus, expandedMenuIds, activeLevel);
    setTotalMenuCount(total);        // 전체 메뉴 개수로 변경
    setExpandedCount(visible);       // 보이는 메뉴 개수
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
            // 위치가 실제로 변경된 경우에만 업데이트 진행
            if (oldIndex !== newIndex) {
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

                // DB 업데이트
                updateMenuOrder({
                movingMenuId: movingMenu.id,
                targetMenuId: targetMenu.id,
                newOrder: newIndex + 1,
                targetOrder: oldIndex + 1
                });
            }
            
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
            const currentIndex = items.indexOf(movingItem);
            const targetIndex = items.indexOf(targetItem);

            // 위치가 실제로 변경된 경우에만 업데이트 진행
            if (currentIndex !== targetIndex) {
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

                // 하위 메뉴 이동 시에도 DB 업데이트
                updateMenuOrder({
                movingMenuId: movingItem.id,
                targetMenuId: targetItem.id,
                newOrder: targetIndex + 1,
                targetOrder: currentIndex + 1
                });
            }
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