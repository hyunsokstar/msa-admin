// src/api/apiForGetMenusData.ts
import getSupabase from '@/lib/supabaseClient';

// MenuItemType 타입 선언
export type MenuItemType = {
    name: string;
    path: string;
    sort_order: number;
    items: MenuItemType[];
};

export async function apiForGetMenusData(): Promise<MenuItemType[] | null> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('parent_id', { ascending: true })
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('메뉴 데이터를 가져오는 중 오류 발생:', error);
            return null;
        }

        if (!data) {
            console.warn('메뉴 데이터를 찾을 수 없습니다.');
            return null;
        }

        // 전체 경로 생성 함수
        const buildFullPath = (item: any, menuMap: { [key: number]: any }): string => {
            const paths: string[] = [];
            let currentItem = item;

            while (currentItem) {
                if (currentItem.path) {
                    paths.unshift(currentItem.path);
                }
                currentItem = currentItem.parent_id ? menuMap[currentItem.parent_id] : null;
            }

            return paths.join('/');
        };

        // 메뉴 항목을 먼저 맵에 저장
        const menuMap: { [key: number]: any } = {};
        data.forEach((item) => {
            menuMap[item.id] = item;
        });

        // MenuItemType 형태로 변환하고 전체 경로 생성
        const transformToMenuType = (item: any): MenuItemType => ({
            name: item.name,
            path: buildFullPath(item, menuMap),
            sort_order: item.sort_order,
            items: [],
        });

        // 메뉴 맵 생성 (MenuItemType 형태로)
        const menuItemMap: { [key: number]: MenuItemType } = {};
        data.forEach((item) => {
            menuItemMap[item.id] = transformToMenuType(item);
        });

        // 부모-자식 관계 설정
        const rootMenus: MenuItemType[] = [];
        data.forEach((item) => {
            if (item.parent_id) {
                menuItemMap[item.parent_id].items.push(menuItemMap[item.id]);
            } else {
                rootMenus.push(menuItemMap[item.id]);
            }
        });

        return rootMenus;
    } catch (error) {
        console.error('메뉴 데이터를 가져오는 중 예외 발생:', error);
        return null;
    }
}

export default apiForGetMenusData;
