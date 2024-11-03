// store/useMenuStore.ts
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
    // 현재 메뉴 ID에 따른 사이드 메뉴 업데이트 함수
    updateSideMenus: (menuId: string) => void
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
    // 현재 메뉴 ID에 기반하여 사이드 메뉴 찾기
    updateSideMenus: (menuId) => {
        const { menus } = get();

        // 메뉴 트리에서 현재 메뉴와 그 상위 메뉴들을 찾는 함수
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
            // 찾은 메뉴 경로 중 최상위 메뉴의 전체 하위 구조를 사이드 메뉴로 설정
            const topLevelMenu = menuPath[0];
            set({ sideMenus: [topLevelMenu], currentMenuId: menuId });
        }
    }
}));