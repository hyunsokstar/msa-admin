// C:\Users\terec\msa-admin\src\app\menu-admin\MenuUtil.ts
import { MenuItemType } from '@/api/apiForMenu';

// 보이는 메뉴 아이템 개수를 계산하는 함수
export const countVisibleMenus = (
  items: MenuItemType[], 
  expandedMenuIds: Set<number>, 
  activeLevel: number, 
  level: number = 1
): number => {
  let count = 0;
  items.forEach(item => {
    if (level <= activeLevel) {
      count++;
      if (item.items.length > 0 && expandedMenuIds.has(item.id)) {
        count += countVisibleMenus(item.items, expandedMenuIds, activeLevel, level + 1);
      }
    }
  });
  return count;
};

// 전체 메뉴 아이템 개수를 계산하는 함수
export const countTotalMenus = (items: MenuItemType[]): number => {
  let count = 0;
  items.forEach(item => {
    count++; // 현재 아이템 카운트
    if (item.items.length > 0) {
      count += countTotalMenus(item.items); // 재귀적으로 하위 아이템 카운트
    }
  });
  return count;
};