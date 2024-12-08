import { useState, useEffect } from 'react';
import { MenuItemType } from '@/api/apiForMenu';

export const useMenuTree = (menus: MenuItemType[] | undefined, activeLevel: number) => {
  const [expandedMenuIds, setExpandedMenuIds] = useState<Set<number>>(new Set());
  const [totalMenuCount, setTotalMenuCount] = useState(0);
  const [expandedCount, setExpandedCount] = useState(0);

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
      const visibleCount = countVisibleMenus(menus);
      setTotalMenuCount(visibleCount);
      setExpandedCount(visibleCount);
    }
  }, [menus, expandedMenuIds, activeLevel]);

  return {
    expandedMenuIds,
    setExpandedMenuIds,
    totalMenuCount,
    expandedCount,
  };
};