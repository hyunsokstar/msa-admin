import { create } from 'zustand'
import { MenuItemType } from '@/api/apiForMenu'

interface MenuState {
    menus: MenuItemType[]
    currentMenuId: string | null
    sideMenus: MenuItemType[]
    isLoading: boolean
    error: Error | null
    setMenus: (menus: MenuItemType[]) => void
    setCurrentMenuId: (menuId: string | null) => void
    setSideMenus: (menus: MenuItemType[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: Error | null) => void
    updateSideMenus: (menuId: string) => void
    // 드래그 앤 드롭을 위한 새로운 함수들
    updateMenuOrder: (parentId: string | null, items: MenuItemType[]) => void
    reorderMenus: (sourceId: number, destinationId: number, parentId: string | null) => void
}

export const useMenuStore = create<MenuState>((set, get) => ({
    menus: [],
    currentMenuId: null,
    sideMenus: [],
    isLoading: false,
    error: null,
    setMenus: (menus) => set({ menus }),
    setCurrentMenuId: (menuId) => set({ currentMenuId: menuId }),
    setSideMenus: (menus) => set({ sideMenus: menus }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    updateSideMenus: (menuId) => {
        const { menus } = get();

        const findMenuPath = (
            items: MenuItemType[],
            targetId: string,
            path: MenuItemType[] = []
        ): MenuItemType[] | null => {
            for (const item of items) {
                if (item.id.toString() === targetId) {
                    return [...path, item];
                }
                if (item.items?.length) {
                    const found = findMenuPath(item.items, targetId, [...path, item]);
                    if (found) return found;
                }
            }
            return null;
        };

        const menuPath = findMenuPath(menus, menuId);
        if (menuPath) {
            const topLevelMenu = menuPath[0];
            set({ sideMenus: [topLevelMenu], currentMenuId: menuId });
        }
    },

    // 특정 부모 메뉴 아래의 항목들 순서 업데이트
    updateMenuOrder: (parentId: string | null, items: MenuItemType[]) => {
        const { menus, sideMenus } = get();

        // 재귀적으로 메뉴 트리를 순회하면서 해당 부모 ID를 찾아 업데이트
        const updateMenuItems = (menuList: MenuItemType[]): MenuItemType[] => {
            return menuList.map(menu => {
                if (menu.id.toString() === parentId) {
                    return { ...menu, items: items };
                }
                if (menu.items?.length) {
                    return { ...menu, items: updateMenuItems(menu.items) };
                }
                return menu;
            });
        };

        // 최상위 레벨 메뉴 업데이트인 경우
        if (!parentId) {
            set({ menus: items });
            // 사이드 메뉴가 최상위 메뉴인 경우 함께 업데이트
            if (sideMenus.length === 1 && sideMenus[0].items) {
                set({ sideMenus: [{ ...sideMenus[0], items }] });
            }
        } else {
            const updatedMenus = updateMenuItems(menus);
            set({ menus: updatedMenus });

            // 사이드 메뉴도 함께 업데이트
            const updatedSideMenus = updateMenuItems(sideMenus);
            set({ sideMenus: updatedSideMenus });
        }
    },

    // 드래그 앤 드롭으로 메뉴 순서 변경
    reorderMenus: (sourceId: number, destinationId: number, parentId: string | null) => {
        const { menus, updateMenuOrder } = get();

        // 부모 메뉴 아래의 아이템들 찾기
        const findParentItems = (items: MenuItemType[], pid: string | null): MenuItemType[] | null => {
            if (!pid) return items;

            for (const item of items) {
                if (item.id.toString() === pid) {
                    return item.items || [];
                }
                if (item.items?.length) {
                    const found = findParentItems(item.items, pid);
                    if (found) return found;
                }
            }
            return null;
        };

        const items = findParentItems(menus, parentId);
        if (!items) return;

        // 순서 변경
        const sourceIndex = items.findIndex(item => item.id === sourceId);
        const destinationIndex = items.findIndex(item => item.id === destinationId);

        if (sourceIndex === -1 || destinationIndex === -1) return;

        const newItems = [...items];
        const [removed] = newItems.splice(sourceIndex, 1);
        newItems.splice(destinationIndex, 0, removed);

        // 변경된 순서로 업데이트
        updateMenuOrder(parentId, newItems);
    },
}));