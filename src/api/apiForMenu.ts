// src/api/apiForGetMenusData.ts
import getSupabase from '@/lib/supabaseClient';

// MenuItemType 타입 선언
export type MenuItemType = {
    key: string | number;
    name: string;
    path?: string;
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
            .order('order', { ascending: true });

        if (error) {
            console.error('메뉴 데이터를 가져오는 중 오류 발생:', error);
            return null;
        }

        if (!data) {
            console.warn('메뉴 데이터를 찾을 수 없습니다.');
            return null;
        }

        // 트리 구조로 변환하기 위해 부모-자식 관계로 데이터를 가공
        const menuMap: { [key: number]: MenuItemType } = {};
        const rootMenus: MenuItemType[] = [];

        // 메뉴 항목을 먼저 맵에 저장하여 참조하기 쉽게 만든다
        data.forEach((item) => {
            menuMap[item.id] = {
                key: item.id,
                name: item.name,
                path: item.path,
                items: [],
            };
        });

        // 각 항목을 순회하며 부모-자식 관계를 형성한다
        data.forEach((item) => {
            if (item.parent_id) {
                menuMap[item.parent_id]?.items.push(menuMap[item.id]);
            } else {
                rootMenus.push(menuMap[item.id]);
            }
        });

        return rootMenus;
    } catch (error) {
        console.error('메뉴 데이터를 가져오는 중 예외 발생:', error);
        return null;
    }
}

export default apiForGetMenusData;
